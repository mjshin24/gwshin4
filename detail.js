import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { 
  getFirestore, doc, getDoc, updateDoc, increment 
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

const firebaseConfig = { /* 복붙 */ };
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const params = new URLSearchParams(location.search);
const id = params.get("id");

async function loadDetail() {
  const docRef = doc(db, "petitions", id);
  const snap = await getDoc(docRef);
  if (!snap.exists()) {
    document.body.innerHTML = "<p>존재하지 않는 청원입니다.</p>";
    return;
  }
  const data = snap.data();
  document.getElementById("title").innerText = data.title;
  document.getElementById("content").innerText = data.content;
  document.getElementById("sign-count").innerText = `현재 서명 수: ${data.signatures ?? 0}명`;

  document.getElementById("sign-btn").addEventListener("click", async () => {
    await updateDoc(docRef, { signatures: increment(1) });
    alert("서명 완료!");
    location.reload();
  });
}

loadDetail();
