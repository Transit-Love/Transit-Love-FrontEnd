import apiClient from "./client";

export interface User {
  id: number;
  email: string;
  name: string;
  picture: string;
  provider: string;
  role?: string; // 'ADMIN' | 'USER'
}

const authService = {
  // 구글 로그인 시작
  loginWithGoogle: () => {
    const API_BASE_URL =
      import.meta.env.VITE_API_URL || "http://localhost:8080";
    const authUrl = `${API_BASE_URL}/oauth2/authorize/google`;

    console.log("🔐 Google OAuth2 시작:", authUrl);
    console.log("📌 쿠키 전송 활성화됨 (withCredentials: true)");
    console.log("🍪 현재 쿠키:", document.cookie);

    // 쿠키 확인을 위한 테스트 요청
    fetch(authUrl, {
      method: "GET",
      credentials: "include", // 쿠키 포함
      mode: "cors",
    })
      .then((response) => {
        console.log("✅ OAuth2 authorize 응답:", response);
        console.log("🍪 응답 후 쿠키:", document.cookie);

        // Set-Cookie 헤더는 보안상 JS에서 직접 읽을 수 없지만,
        // 브라우저가 자동으로 저장함
        console.log("👉 이제 Google 로그인 페이지로 리다이렉트됩니다");
      })
      .catch((err) => {
        console.error("❌ OAuth2 authorize 요청 실패:", err);
      });

    // 실제 리다이렉트 (약간의 딜레이 후)
    setTimeout(() => {
      window.location.href = authUrl;
    }, 100);
  },

  // 현재 사용자 정보 조회
  getCurrentUser: async (): Promise<User> => {
    try {
      const response = await apiClient.get<User>("/api/auth/me");
      return response.data;
    } catch (error) {
      console.error("Failed to get current user:", error);
      throw error;
    }
  },

  // 로그아웃
  logout: () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("userRole");
    window.location.href = "/login";
  },

  // 토큰 저장
  setToken: (token: string) => {
    localStorage.setItem("accessToken", token);
  },

  // 토큰 가져오기
  getToken: (): string | null => {
    return localStorage.getItem("accessToken");
  },

  // 로그인 여부 확인
  isAuthenticated: (): boolean => {
    return !!localStorage.getItem("accessToken");
  },

  // Role 저장
  setRole: (role: string) => {
    localStorage.setItem("userRole", role);
  },

  // Role 가져오기
  getRole: (): string | null => {
    return localStorage.getItem("userRole");
  },

  // Admin 여부 확인
  isAdmin: (): boolean => {
    return localStorage.getItem("userRole") === "ADMIN";
  },

  // 마지막 선택 옵션 조회
  getFinalChoiceOptions: async () => {
    try {
      const response = await apiClient.get("/api/chat/final-choice/options");
      return response.data;
    } catch (error) {
      console.error("Failed to get final choice options:", error);
      throw error;
    }
  },

  // 마지막 선택 실행
  makeFinalChoice: async (selectedProfileId: number) => {
    try {
      const response = await apiClient.post("/api/chat/final-choice", {
        selectedProfileId,
      });
      return response.data;
    } catch (error) {
      console.error("Failed to make final choice:", error);
      throw error;
    }
  },
};

export default authService;
