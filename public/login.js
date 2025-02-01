/* public/login.js */

// Firebase Auth 관련 함수 import
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, updateProfile, getAuth, onAuthStateChanged } 
  from "https://www.gstatic.com/firebasejs/11.2.0/firebase-auth.js";

// 우리가 직접 만든 app.js에서 export한 auth 불러오기
import { auth } from "./app.js";

var 뺀거 = localStorage.getItem('user');

if (뺀거) {
    let userData = JSON.parse(뺀거);
    $('#userName').html(userData.displayName);
}

// 로그인 상태 변경 감지 (v11 방식)
onAuthStateChanged(auth, (user) => {
    if (user) {
        console.log("로그인 상태 감지됨:", user);
        // user의 object 자료형이므로 JSON 으로
        //localStorage.setItem('user', JSON.stringify(user));    
    } else {
      console.log("로그아웃 상태");
    }
});


// [회원가입 버튼] 클릭
$('#register').click(() => {
  const email = $('#email-new').val();
  const password = $('#pw-new').val();
  var 이름 = $('#name-new').val();

  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      console.log("회원가입 성공:", userCredential);
      
    //  `updateProfile()`을 `await` 또는 `.then()`을 사용하여 완료 후 진행

      return updateProfile(user, { displayName: 이름 }).then(() => {
        return user.reload(); // 최신 데이터 강제 로드
      });
    })
    .catch((error) => {
      console.error("회원가입 에러:", error);
    });
});

// [로그인 버튼] 클릭
$('#login').click(() => {
  const email = $('#email').val();
  const password = $('#pw').val();

  signInWithEmailAndPassword(auth, email, password)
    .then( (userCredential) => {
      console.log("로그인 성공:", userCredential.user);
      
      localStorage.setItem('user', JSON.stringify(userCredential.user));

      // UI 반영
      if (userCredential.user.displayName) {
        $('#userName').text(userCredential.user.displayName);
      }

    })
    .catch((error) => {
      console.error("로그인 에러:", error);
    });
});

// [로그아웃 버튼] 클릭
$('#logout').click(() => {
  signOut(auth)
    .then(() => {
      console.log("로그아웃 성공");
      localStorage.removeItem('user')
    })
    .catch((error) => {
      console.error("로그아웃 에러:", error);
    });
});
