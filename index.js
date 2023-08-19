// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-analytics.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut
} from "https://www.gstatic.com/firebasejs/10.0.0/firebase-auth.js";

import {
  getFirestore,
  collection, addDoc
} from "https://www.gstatic.com/firebasejs/10.0.0/firebase-firestore.js";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyALhDrKDnUMVfR5lNo5qJnZVhq5s0lPXQ0",
  authDomain: "fire-base-1164c.firebaseapp.com",
  projectId: "fire-base-1164c",
  storageBucket: "fire-base-1164c.appspot.com",
  messagingSenderId: "1019444692872",
  appId: "1:1019444692872:web:b0096eb7cef059c5ac5c3d",
  measurementId: "G-GV8YCZJBXE"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const analytics = getAnalytics(app);
const auth = getAuth(app);


let Name = document.getElementById("Name")
let FatherName = document.getElementById("fatherName")
let regContainer = document.getElementById("container")
let loginContainer = document.getElementById("login-container")
let contentContainer = document.getElementById("content-container")
let regNowBtn = document.getElementById("reg-now-btn")
let loginNowBtn = document.getElementById("log-now-btn")
let registerBtn = document.getElementById("register-btn")
let loginBtn = document.getElementById("login_btn")
let logoutBtn = document.getElementById("log-out")

regContainer.style.display = "none"
contentContainer.style.display = "none"


regNowBtn.addEventListener("click", registercontainer)
loginNowBtn.addEventListener("click", logincontainer)
registerBtn.addEventListener("click", registered)
loginBtn.addEventListener("click", loginButton)
logoutBtn.addEventListener("click", logout)






function registered() {
  let email = document.getElementById("email")
  let password = document.getElementById("password")


  

  createUserWithEmailAndPassword(auth, email.value, password.value)

  .then(async(userCredential) => {
    // Signed in
    const user = userCredential.user;
    console.log(user);

    try {
      const docRef = await addDoc(collection(db, `users/${auth.user.uid}`), {
        firstName: firstName.value,
        lastName: lastName.value,
        email: email.value 
      });
    
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }


    // const adref = ref(db, `users/${user.uid}/`);
    // const ob = {
    //   firstName,
    //   lastName,
    //   email,
    //   password
    // };
    // set(adref, ob)
    //   .then(() => {
    //     // Data saved successfully
    //     setTimeout(() => { location.reload() }, 300);
    //   })
    //   .catch((error) => {
    //     console.error('Error saving data:', error);
    //   });
  })
}



function registercontainer() {
  regContainer.style.display = "block"
  loginContainer.style.display = "none"
  todoContainer.style.display= "none"

}

function logincontainer() {
  regContainer.style.display = "none"
  loginContainer.style.display = "block"


}


function loginButton() {
  let login_email = document.getElementById("login_email")
  let login_password = document.getElementById("login_password")


  signInWithEmailAndPassword(auth, login_email.value, login_password.value)
    .then((userCredential) => {
      // Signed in 
      const user = userCredential.user;
      // ...

      console.log("user-->", user)

    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;

      console.log("error-->", errorMessage)


    });
}


onAuthStateChanged(auth, (user) => {
  if (user) {
    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/auth.user
    const uid = auth.currentUser.uid;
    loginContainer.style.display = "none"
    regContainer.style.display = "none"
    contentContainer.style.display = "block"
    console.log("uid=>", uid)
    // ...
  } else {
    // User is signed out
    // ...
    loginContainer.style.display = "block"

  }
});

function logout() {

  signOut(auth).then(() => {
    document.getElementById("content-container").style.display = "none"
    // Sign-out successful.
  }).catch((error) => {
    // An error happened.
  });


}



