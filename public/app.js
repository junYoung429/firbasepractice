// public/app.js (Firebase 설정 파일)

// Firebase SDK 모듈 가져오기 (import 사용)
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-app.js";
import { getFirestore, collection, doc, getDocs, setDoc, addDoc } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-firestore.js";

// Firebase 설정
const firebaseConfig = {
  apiKey: "AIzaSyA2VOtn6QltQpfq2GsGbTq1bBy5XoE0D5Q",
  authDomain: "gggg-2607d.firebaseapp.com",
  projectId: "gggg-2607d",
  storageBucket: "gggg-2607d.firebasestorage.app",
  messagingSenderId: "995989915812",
  appId: "1:995989915812:web:ea7bcf2935cf0d39973e31",
  measurementId: "G-P8W7MRLBTM"
};

// Firebase 앱 초기화
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Firestore 데이터 가져오기 함수
async function getProducts() {
  const querySnapshot = await getDocs(collection(db, "product"));
  querySnapshot.forEach((doc) => {
    console.log(doc.data());

    var templete = ` <div class="product">
      <div class="thumbnail" style="background-image: url('https://placehold.co/400')"></div>
      <div class="flex-grow-1 p-4">
        <h5 class="title">${doc.data().제목}</h5>
        <p class="date">2030년 1월 8일</p>
        <p class="price">${doc.data().가격}</p>
        <p class="float-end">0</p>
      </div>
    </div>`;
    $('.container').append(templete)
  });
}

// Firestore 데이터 가져오기 실행
getProducts();
