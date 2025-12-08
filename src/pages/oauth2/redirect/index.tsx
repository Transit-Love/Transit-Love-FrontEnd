import React, { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import * as S from "./style";
import Loading from "../../../components/Loading";
import authService from "../../../api/authService";
import profileService from "../../../api/profileService";

const OAuth2Redirect: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleOAuth2Redirect = async () => {
      try {
        const urlParams = new URLSearchParams(location.search);

        // 디버깅: 받은 모든 파라미터 로깅
        console.log("OAuth Redirect URL:", window.location.href);
        console.log("URL Search:", location.search);
        console.log("URL Params:", Object.fromEntries(urlParams.entries()));

        // 다양한 토큰 파라미터 이름 시도 (백엔드 구현에 따라 다를 수 있음)
        const token =
          urlParams.get("token") ||
          urlParams.get("access_token") ||
          urlParams.get("accessToken");
        const error = urlParams.get("error");
        const errorDescription = urlParams.get("error_description");

        if (error) {
          // 에러 처리
          console.error("OAuth2 로그인 실패:", {
            error,
            errorDescription,
            fullUrl: window.location.href,
          });

          let errorMessage = "로그인에 실패했습니다.";

          if (
            error === "authorization_request_not_found" ||
            error === "[authorization_request_not_found]"
          ) {
            errorMessage =
              "로그인 세션을 찾을 수 없습니다.\n\n" +
              "가능한 원인:\n" +
              "1. 백엔드의 리다이렉트 URI 설정 확인 필요\n" +
              "   - Google Cloud Console에서 승인된 리디렉션 URI: http://localhost:8080/login/oauth2/code/google\n" +
              "   - 백엔드 application.yml의 redirect-uri 설정 확인\n\n" +
              "2. 백엔드 CORS 설정 확인:\n" +
              "   - withCredentials 허용\n" +
              "   - 쿠키 전송 허용 (SameSite 설정)\n\n" +
              "3. 로컬스토리지/쿠키 확인\n\n" +
              "다시 로그인을 시도해주세요.";
          } else if (errorDescription) {
            errorMessage = `로그인 실패: ${errorDescription}`;
          } else {
            errorMessage = `로그인 실패: ${error}`;
          }

          alert(errorMessage);
          navigate("/login");
          return;
        }

        if (token) {
          console.log("토큰 받음:", token.substring(0, 20) + "...");

          // 토큰 저장
          authService.setToken(token);

          // 저장된 토큰으로 현재 사용자 확인
          try {
            const currentUser = await authService.getCurrentUser();
            console.log("토큰으로 확인된 사용자:", currentUser);
            
            // role 정보 저장
            if (currentUser.role) {
              authService.setRole(currentUser.role);
              console.log("사용자 역할 저장:", currentUser.role);
              
              // Admin은 바로 홈으로 이동 (카운트다운, 매칭 성공 페이지 건너뛰기)
              if (currentUser.role === "ADMIN") {
                console.log("Admin 사용자 - 바로 홈으로 이동");
                navigate("/admin/participants");
                return;
              }
            }
          } catch (err) {
            console.error("사용자 정보 확인 실패:", err);
          }

          // User만 프로필 확인 후 카운트다운으로
          try {
            // 프로필 존재 여부 확인
            console.log("프로필 조회 시도...");
            const profile = await profileService.getMyProfile();

            if (profile && profile.id) {
              console.log("프로필 존재, 카운트다운 페이지로 이동");
              navigate("/countdown");
            } else {
              console.log("프로필 없음, 설정 페이지로 이동");
              navigate("/profile/setting");
            }
          } catch (error: any) {
            console.error("프로필 조회 중 에러:", error);

            // 404 에러 (프로필 없음)면 설정 페이지로
            if (error.response?.status === 404) {
              console.log("404 에러 - 프로필 없음, 설정 페이지로 이동");
              navigate("/profile/setting");
            } else if (error.response?.status === 401) {
              // 인증 실패 - 토큰이 유효하지 않음
              console.error("토큰 인증 실패");
              alert("로그인 인증에 실패했습니다. 다시 로그인해주세요.");
              authService.logout();
            } else {
              console.log("기타 에러 - 설정 페이지로 이동");
              // 다른 에러는 일단 설정 페이지로
              navigate("/profile/setting");
            }
          }
        } else {
          // 토큰도 에러도 없는 경우
          console.error("토큰과 에러 파라미터가 모두 없음");
          console.error(
            "받은 파라미터:",
            Object.fromEntries(urlParams.entries())
          );
          alert(
            "로그인 정보를 받지 못했습니다.\n백엔드가 올바른 형식으로 토큰을 반환하는지 확인해주세요.\n\n" +
              "백엔드 리다이렉트 URL 형식: http://localhost:5173/oauth2/redirect?token=YOUR_TOKEN"
          );
          navigate("/login");
        }
      } catch (error) {
        console.error("OAuth 리다이렉트 처리 중 예외:", error);
        alert("로그인 처리 중 오류가 발생했습니다.");
        navigate("/login");
      }
    };

    handleOAuth2Redirect();
  }, [location, navigate]);

  return (
    <S.Container>
      <Loading message="로그인 처리 중..." />
    </S.Container>
  );
};

export default OAuth2Redirect;
