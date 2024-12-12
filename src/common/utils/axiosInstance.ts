import useAuthStore from "@/common/stores/authStore";
import alertToast from "@/common/utils/alertToast";
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://spoticks.shop:8080/", // 서버 url
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
    const errorMessage = err.response?.data.message;
    if (
      errorMessage === "JWT Token expired" &&
      !originalRequest._retry &&
      !originalRequest.url.includes("/auth/reissue")
    ) {
      originalRequest._retry = true;
      try {
        const userName = useAuthStore.getState().userName;
        const { accessToken } = useAuthStore.getState();
        const axiosRefreshInstance = axios.create({
          baseURL: "http://spoticks.shop:8080/",
          timeout: 3000,
          headers: { "Content-Type": "application/json", Authorization: `Bearer ${accessToken}` },
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
