import apiClient from './client';

export interface User {
  id: number;
  email: string;
  name: string;
  picture: string;
  provider: string;
}

const authService = {
  // 구글 로그인 시작
  loginWithGoogle: () => {
    const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080';
    window.location.href = `${API_BASE_URL}/oauth2/authorize/google`;
  },

  // 현재 사용자 정보 조회
  getCurrentUser: async (): Promise<User> => {
    try {
      const response = await apiClient.get<User>('/api/auth/me');
      return response.data;
    } catch (error) {
      console.error('Failed to get current user:', error);
      throw error;
    }
  },

  // 로그아웃
  logout: () => {
    localStorage.removeItem('accessToken');
    window.location.href = '/login';
  },

  // 토큰 저장
  setToken: (token: string) => {
    localStorage.setItem('accessToken', token);
  },

  // 토큰 가져오기
  getToken: (): string | null => {
    return localStorage.getItem('accessToken');
  },

  // 로그인 여부 확인
  isAuthenticated: (): boolean => {
    return !!localStorage.getItem('accessToken');
  },
};

export default authService;
