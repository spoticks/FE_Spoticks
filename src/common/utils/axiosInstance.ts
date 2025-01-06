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
    const originalRequest = err.config;
    const {
      status,
      data: { message },
    } = err.response;
    // 404는 일시적인 코드.
    if ((message === "JWT Token expired" || status === 404) && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const userName = useAuthStore.getState().userName;
        const axiosRefreshInstance = axios.create({
          baseURL: "https://api.spoticks.shop/",
          timeout: 3000,
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        });
        const response = await axiosRefreshInstance.post(`/auth/reissue/${userName}`);
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
