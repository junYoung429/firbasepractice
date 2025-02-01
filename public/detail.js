import { doc, getDoc } 
  from "https://www.gstatic.com/firebasejs/11.2.0/firebase-firestore.js";

import { db } from "./app.js";  


// Firestore에서 특정 상품 정보 가져오기 (함수형으로 개선)
async function getProductDetail() {
    const 쿼리스트링 = new URLSearchParams(window.location.search);
    const docId = 쿼리스트링.get('id');
  
    if (!docId) {
      console.error("URL에 'id' 파라미터가 없습니다.");
      return;
    }
  
    try {
      const docRef = doc(db, "product", docId);
      const result = await getDoc(docRef);
  
      if (result.exists()) {
        const data = result.data();
        console.log("Firestore 데이터:", data);
  
        // Firestore 데이터를 HTML에 적용
        const detailHTML = `<div class="container">
                    <div class="detail-pic my-4" style="background-image: url('${result.data().이미지}');"></div>
                    <div>
                    <h5>올린사람 : 모름</h5>
                    <hr>
                    <h5 class="title">${result.data().제목}</h5>
                    <p class="date">${result.data().날짜}</p>
                    <p class="price">${result.data().가격}</p>
                    </div>
                </div>`
  
        // 기존 `.container` 내용 제거 후 추가
        $('.container').append(detailHTML)
  
      } else {
        console.error("해당 문서가 존재하지 않습니다.");
      }
    } catch (error) {
      console.error("Firestore 문서 가져오기 오류:", error);
    }
  }


getProductDetail();
