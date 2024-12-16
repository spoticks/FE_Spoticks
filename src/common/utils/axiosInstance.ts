import useAuthStore from "@/common/stores/authStore";
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

export default axiosInstance;
