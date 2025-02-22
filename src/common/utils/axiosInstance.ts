import useAuthStore from "@/common/stores/authStore";
import alertToast from "@/common/utils/alertToast";
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://api.spoticks.shop/", // 서버 url
  timeout: 3000, // 3000ms가 지나도 응답이 없으면 요청을 취소
  headers: { "Content-Type": "application/json" }, // 클라에서 보내는 데이터의 형식
  withCredentials: true, // 요청에 credential 정보를 담아서 보낼 지
});

axiosInstance.interceptors.request.use((config) => {
  const { accessToken } = useAuthStore.getState();
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

axiosInstance.interceptors.response.use(
  (res) => res,
  async (err) => {
    // 네트워크 에러로 응답 자체가 오지 않을 때
    if (!err.response?.data) {
      return Promise.reject(err);
    }
    const originalRequest = err.config;
    const {
      data: { message },
    } = err.response;
    // 토큰이 만료되었을 경우 or 프로필, 관리자, 예약 등의 페이지(요청에 토큰이 필요한 페이지)에서의 요청
    if (
      (message === "JWT Token expired" || message === "JWT Token is empty") &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;
      try {
        const userName = useAuthStore.getState().userName;
        const response = await axios.post(
          `https://api.spoticks.shop/auth/reissue/${userName}`,
          {},
          {
            withCredentials: true,
          },
        );
        const { token } = response.data;
        useAuthStore.getState().login(token);
        originalRequest.headers.Authorization = `Bearer ${token}`;
        return axiosInstance(originalRequest);
      } catch (err) {
        useAuthStore.getState().logout();
        alertToast("다시 로그인 해주세요!", "error");
      }
    }
    return Promise.reject(err);
  },
);
export default axiosInstance;
