import { initializeApp } from "https://www.gstatic.com/firebasejs/12.13.0/firebase-app.js";

//프로젝트 정보
const firebaseConfig = {
  apiKey: "AIzaSyBUxA624IWmlKm8lNFzNmrlyE82i4B_DSw",
  authDomain: "board-e0eeb.firebaseapp.com",
  projectId: "board-e0eeb",
  storageBucket: "board-e0eeb.firebasestorage.app",
  messagingSenderId: "329428625465",
  appId: "1:329428625465:web:6b6cd714d5b4b6847805e8",
};
//데이터베이스 연동
import {
  getFirestore,
  collection,
  addDoc,
  serverTimestamp,
} from "https://www.gstatic.com/firebasejs/12.13.0/firebase-firestore.js";

const app = initializeApp(firebaseConfig);
const db = getFirestore(app); //firestore 연결

// html요소 가지고 오기, form, 버튼, 메시지(msg, feedback)
let form = document.querySelector("#requestForm");
let btn = document.querySelector("#submitBtn");
let msg = document.querySelector("#feedback");

requestForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  console.log("제출");

  let name = document.querySelector("#name").value;
  let message = document.querySelector("#message").value;
  //   console.log(name, message);

  //유효성검사

  if (!name || !message) {
    msg.textContent = "모든 항목을 입력해주세요";
    msg.classList.remove("ok");
    msg.classList.add("err");
    return;
  }

  try {
    await addDoc(collection(db, "consultations"), {
      name: name,
      message: message,
      createdAt: serverTimestamp(), // 서버 시간 기록
    });

    msg.textContent = "신청이 정상적으로 접수되었습니다.  감사합니다.";

    msg.classList.remove("err");
    msg.classList.add("ok");
    // 저장이 완료되었으니 입력창 비워주기
    form.reset();
  } catch {
    msg.textContent = "저장 중 문제가 발생했습니다.  다시 시도해주세요";
  }
});
