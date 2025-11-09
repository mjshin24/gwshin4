import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getFirestore, collection, addDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyB6i7mLNyoSXamL3URFzmp2UDZgVdol77g",
  authDomain: "gwsh4-c5faa.firebaseapp.com",
  projectId: "gwsh4-c5faa",
  storageBucket: "gwsh4-c5faa.firebasestorage.app",
  messagingSenderId: "630755920968",
  appId: "1:630755920968:web:bc886798acc7611e0e1c7d",
  measurementId: "G-QDH7XXRRZP"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

document.getElementById("petition-form").addEventListener("submit", async (e) => {
  e.preventDefault();
  const title = document.getElementById("title").value.trim();
  const content = document.getElementById("content").value.trim();

  if (!title || !content) return alert("모든 항목을 입력하세요");

  await addDoc(collection(db, "petitions"), {
  title,
  content,
  createdAt: serverTimestamp(),
  status: "대기",
  signatures: 0
});


  alert("청원이 등록되었습니다");
  window.location.href = "index.html";
});

