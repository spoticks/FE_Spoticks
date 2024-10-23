import axios from "axios";

const instance = axios.create({
  baseURL: "http://spoticks.shop:8080/", // 서버 url
  timeout: 3000, // 3000ms가 지나도 응답이 없으면 요청을 취소
  headers: { "Content-Type": "application/json" }, // 클라에서 보내는 데이터의 형식
});
