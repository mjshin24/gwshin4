import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { 
  getFirestore, collection, getDocs, updateDoc, doc, query, where 
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

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

async function loadPending() {
  const list = document.getElementById("admin-list");
  const q = query(collection(db, "petitions"), where("status", "==", "대기"));
  const snapshot = await getDocs(q);

  if (snapshot.empty) {
    list.innerHTML = "<p>대기 중인 청원이 없습니다.</p>";
    return;
  }

  snapshot.forEach(docSnap => {
    const data = docSnap.data();
    const div = document.createElement("div");
    div.innerHTML = `
      <h3>${data.title}</h3>
      <p>${data.content}</p>
      <button data-id="${docSnap.id}" data-action="approve">승인</button>
      <button data-id="${docSnap.id}" data-action="reject">거절</button>
    `;
    list.appendChild(div);
  });

  list.addEventListener("click", async (e) => {
    if (e.target.tagName !== "BUTTON") return;
    const id = e.target.dataset.id;
    const action = e.target.dataset.action;
    const newStatus = action === "approve" ? "공개" : "거절";
    await updateDoc(doc(db, "petitions", id), { status: newStatus });
    alert(`청원이 '${newStatus}'되었습니다.`);
    location.reload();
  });
}

loadPending();
