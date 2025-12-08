/**
 * API 에러 응답 타입
 */
export interface ApiErrorResponse {
  response?: {
    status: number;
    data?: unknown;
  };
}

/**
 * 에러가 API 에러인지 확인하는 타입 가드
 */
export const isApiError = (error: unknown): error is ApiErrorResponse => {
  return typeof error === "object" && error !== null && "response" in error;
};
