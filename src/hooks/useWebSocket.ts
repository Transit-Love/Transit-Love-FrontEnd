import { useEffect, useRef, useState, useCallback } from "react";
import { Client, type IMessage } from "@stomp/stompjs";
import SockJS from "sockjs-client";
import type {
  ChatMessageResponse,
  ChatMessageRequest,
  MessageType,
} from "../types/chat";

interface UseWebSocketProps {
  matchId: number; // matchId 또는 chatRoomId 모두 사용 가능
  enabled?: boolean; // WebSocket 연결 활성화 여부 (기본: true)
  onMessageReceived: (message: ChatMessageResponse) => void;
  onConnected?: () => void;
  onDisconnected?: () => void;
  onError?: (error: unknown) => void;
}

interface UseWebSocketReturn {
  isConnected: boolean;
  sendMessage: (content: string, type?: MessageType) => void;
  markAsRead: () => void;
  disconnect: () => void;
}

const WS_BASE_URL = import.meta.env.VITE_WS_URL || "http://localhost:8080";

/**
 * WebSocket 연결 및 채팅 메시지 송수신을 위한 커스텀 훅
 */
export const useWebSocket = ({
  matchId,
  enabled = true, // 기본값 true
  onMessageReceived,
  onConnected,
  onDisconnected,
  onError,
}: UseWebSocketProps): UseWebSocketReturn => {
  const clientRef = useRef<Client | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const reconnectAttempts = useRef(0);
  const maxReconnectAttempts = 3;
  const shouldReconnect = useRef(true);

  // 콜백 함수들을 ref로 저장하여 의존성 문제 해결
  const onMessageReceivedRef = useRef(onMessageReceived);
  const onConnectedRef = useRef(onConnected);
  const onDisconnectedRef = useRef(onDisconnected);
  const onErrorRef = useRef(onError);

  useEffect(() => {
    onMessageReceivedRef.current = onMessageReceived;
    onConnectedRef.current = onConnected;
    onDisconnectedRef.current = onDisconnected;
    onErrorRef.current = onError;
  }, [onMessageReceived, onConnected, onDisconnected, onError]);

  // WebSocket 연결
  useEffect(() => {
    // enabled가 false이거나 matchId가 없으면 연결하지 않음
    if (!enabled || !matchId) {
      console.log("⏸️ WebSocket 연결 비활성화 또는 matchId 없음");
      return;
    }

    const token = localStorage.getItem("accessToken");

    if (!token) {
      console.warn("액세스 토큰이 없습니다. WebSocket 연결을 건너뜁니다.");
      onErrorRef.current?.(new Error("No access token"));
      return;
    }

    // 재연결 가능 상태로 리셋
    shouldReconnect.current = true;
    reconnectAttempts.current = 0;

    // STOMP 클라이언트 생성
    const client = new Client({
      webSocketFactory: () => new SockJS(`${WS_BASE_URL}/ws`),
      connectHeaders: {
        Authorization: `Bearer ${token}`,
      },
      debug: (str) => {
        // STOMP 디버그 로그 최소화
        if (
          str.includes("error") ||
          str.includes("Error") ||
          str.includes("closed")
        ) {
          console.log("[STOMP]", str);
        }
      },
      reconnectDelay: 5000,
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000,
      beforeConnect: () => {
        // 재연결 시도 횟수 체크
        if (reconnectAttempts.current >= maxReconnectAttempts) {
          console.error(
            `❌ 최대 재연결 시도 횟수(${maxReconnectAttempts})를 초과했습니다.`
          );
          shouldReconnect.current = false;
          return Promise.reject(new Error("Max reconnect attempts reached"));
        }
        if (!shouldReconnect.current) {
          return Promise.reject(new Error("Reconnection disabled"));
        }
        reconnectAttempts.current++;
        return Promise.resolve();
      },
      onConnect: () => {
        console.log("✅ WebSocket 연결 성공");
        setIsConnected(true);
        reconnectAttempts.current = 0; // 연결 성공 시 재연결 카운터 리셋

        // 채팅방 구독
        client.subscribe(`/topic/chat/${matchId}`, (message: IMessage) => {
          try {
            const chatMessage: ChatMessageResponse = JSON.parse(message.body);
            console.log("📩 메시지 수신:", chatMessage);
            onMessageReceivedRef.current(chatMessage);
          } catch (error) {
            console.error("메시지 파싱 오류:", error);
          }
        });

        onConnectedRef.current?.();
      },
      onDisconnect: () => {
        console.log("❌ WebSocket 연결 해제");
        setIsConnected(false);
        onDisconnectedRef.current?.();
      },
      onStompError: (frame) => {
        console.error("❌ STOMP 오류:", frame.headers?.message || frame);

        // 401 또는 403 에러 시 재연결 중단
        if (
          frame.headers?.message?.includes("401") ||
          frame.headers?.message?.includes("403")
        ) {
          console.error("🔒 인증 오류 감지 - 재연결 중단");
          shouldReconnect.current = false;
          client.deactivate();
          onErrorRef.current?.(new Error("Authentication failed"));
        } else {
          onErrorRef.current?.(frame);
        }
      },
      onWebSocketError: () => {
        // 최대 재연결 시도 횟수 초과 시에만 로그 출력
        if (reconnectAttempts.current >= maxReconnectAttempts) {
          console.error("❌ WebSocket 연결 실패: 최대 재연결 시도 초과");
          shouldReconnect.current = false;
          client.deactivate();
          onErrorRef.current?.(new Error("Max reconnect attempts reached"));
        }
        // 그 외의 경우 조용히 재연결 시도
      },
    });

    clientRef.current = client;
    client.activate();

    // 컴포넌트 언마운트 시 연결 해제
    return () => {
      shouldReconnect.current = false; // 재연결 중단
      if (client.active) {
        client.deactivate();
      }
    };
  }, [matchId, enabled]); // 콜백 함수들을 의존성에서 제거

  // 메시지 전송
  const sendMessage = useCallback(
    (content: string, type: MessageType = "TEXT") => {
      if (!clientRef.current || !clientRef.current.connected) {
        console.error("WebSocket이 연결되지 않았습니다.");
        return;
      }

      const messageRequest: ChatMessageRequest = {
        matchId,
        content,
        type,
      };

      clientRef.current.publish({
        destination: "/app/chat.send",
        body: JSON.stringify(messageRequest),
      });

      console.log("📤 메시지 전송:", messageRequest);
    },
    [matchId]
  );

  // 읽음 처리
  const markAsRead = useCallback(() => {
    if (!clientRef.current || !clientRef.current.connected) {
      console.error("WebSocket이 연결되지 않았습니다.");
      return;
    }

    clientRef.current.publish({
      destination: "/app/chat.read",
      body: JSON.stringify({ matchId }),
    });

    console.log("✅ 읽음 처리:", matchId);
  }, [matchId]);

  // 연결 해제
  const disconnect = useCallback(() => {
    if (clientRef.current && clientRef.current.active) {
      clientRef.current.deactivate();
    }
  }, []);

  return {
    isConnected,
    sendMessage,
    markAsRead,
    disconnect,
  };
};
