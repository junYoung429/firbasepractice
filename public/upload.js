// public/app.js (Firebase 설정 파일)

// (1) 필요한 Firebase 모듈 import
import { ref, uploadBytes, getDownloadURL } 
  from "https://www.gstatic.com/firebasejs/11.2.0/firebase-storage.js";
import { collection, addDoc } 
  from "https://www.gstatic.com/firebasejs/11.2.0/firebase-firestore.js";

// (2) app.js에서 export한 객체들
import { db, storage } from "./app.js";



// ✅ 파일 업로드 및 Firestore 저장
document.getElementById("send").addEventListener("click", async function() {
  const file = document.querySelector("#image").files[0]; // 파일 선택
  if (!file) {
    alert("파일을 선택하세요!");
    return;
  }

  const storageRef = ref(storage, "images/" + file.name); // 저장할 경로 설정

  try {
    // ✅ 1. 파일을 Firebase Storage에 업로드
    const snapshot = await uploadBytes(storageRef, file);
    console.log("파일 업로드 완료:", snapshot.metadata.fullPath);

    // ✅ 2. 업로드된 파일의 다운로드 URL 가져오기
    const downloadURL = await getDownloadURL(storageRef);
    console.log("파일 다운로드 URL:", downloadURL);

    // ✅ 3. Firestore에 데이터 저장 (이미지 URL 포함)
    const docRef = await addDoc(collection(db, "product"), {
      제목: document.getElementById("title").value,
      가격: document.getElementById("price").value,
      내용: document.getElementById("content").value,
      날짜: new Date(),  // Firestore Timestamp 저장
      이미지: downloadURL,  // Firebase Storage에서 가져온 이미지 URL
      uid: JSON.parse(localStorage.getItem('user')).uid
      이름: JSON.parse(localStorage.getItem('user')).displayName

    });

    console.log("Firestore에 데이터 저장 완료:", docRef.id);

    // ✅ 4. index.html로 이동
  } catch (error) {
    console.error("오류 발생:", error);
    alert("파일 업로드에 실패했습니다.");
  }
});