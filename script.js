// index용 script.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getFirestore, collection, getDocs, query, where, orderBy } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

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

document.addEventListener("DOMContentLoaded", async () => {
  const listEl = document.getElementById("petition-list");
  const q = query(
    collection(db, "petitions"),
    where("status", "==", "공개"),
    orderBy("createdAt", "desc")
  );
  const snapshot = await getDocs(q);
  snapshot.forEach(doc => {
    const data = doc.data();
    const div = document.createElement("div");
    div.classList.add("petition");
    div.innerHTML = `
      <h3><a href="detail.html?id=${doc.id}">${data.title}</a></h3>
      <p>${data.content}</p>
      <small>서명: ${data.signatures ?? 0}명</small>
    `;
    listEl.appendChild(div);
  });
});

