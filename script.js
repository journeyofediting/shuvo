import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { getFirestore, collection, getDocs } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

/* 🔥 PASTE YOUR FIREBASE CONFIG */
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

/* UI */
const loader=document.getElementById("loader");
const modal=document.getElementById("authModal");
const locked=document.getElementById("locked");
const dashboard=document.getElementById("dashboard");

/* GSAP */
gsap.registerPlugin(ScrollTrigger);
window.onload=()=>gsap.to(loader,{opacity:0,duration:1,onComplete:()=>loader.remove()});
gsap.from(".section",{opacity:0,y:60,stagger:.15,scrollTrigger:{trigger:".section",start:"top 80%"}});

/* AUTH */
document.getElementById("openLogin").onclick=()=>modal.classList.remove("hidden");
document.getElementById("loginBtn").onclick=async()=>{
  const e=email.value,p=password.value;
  try{await signInWithEmailAndPassword(auth,e,p)}
  catch{await createUserWithEmailAndPassword(auth,e,p)}
  modal.classList.add("hidden");
};

onAuthStateChanged(auth,async user=>{
  if(user){
    locked.style.display="none";
    dashboard.classList.remove("hidden");
    const snap=await getDocs(collection(db,"courses"));
    dashboard.innerHTML="";
    snap.forEach(d=>{
      const c=d.data();
      dashboard.innerHTML+=`<div class="course"><h3>${c.title}</h3><p>${c.description}</p></div>`;
    });
  }
});
