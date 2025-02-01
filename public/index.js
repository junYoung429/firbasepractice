// public/app.js (Firebase 설정 파일)

// Firebase SDK 모듈 가져오기 (import 사용)
import { collection, getDocs } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-firestore.js";

// (2) 우리가 직접 export한 객체들 가져오기
import { db } from "./app.js";


// Firestore 데이터 가져오기 함수
async function getProducts() {
  const querySnapshot = await getDocs(collection(db, "product"));
  querySnapshot.forEach((doc) => {
    console.log(doc.data());

    var templete = ` <div class="product">
      <div class="thumbnail" style="background-image: url('${doc.data().이미지}')"></div>
      <div class="flex-grow-1 p-4">
        <h5 class="title"><a href="/detail.html?id=${doc.id}"> ${doc.data().제목} </a></h5>
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


