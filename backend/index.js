// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getFirestore } from "firebase/firestore";
import { register, addClass, removeClass, addGroup, removeGroup, updateContact } from './user_functions.js';
import { getClass, getStudents } from "./class_functions.js";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDLAFngZMZPjeLaJSPMnTi2EFn11Ewjlvw",
  authDomain: "hackcmu-2024.firebaseapp.com",
  projectId: "hackcmu-2024",
  storageBucket: "hackcmu-2024.appspot.com",
  messagingSenderId: "456355014854",
  appId: "1:456355014854:web:b45824e985f60046dd0fc7",
  measurementId: "G-GP5HBS52CK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function test() {
  await register('Chopin123')
  await addClass('Chopin123', '15122')
  await addGroup('Chopin123', '15122 study group')
  await updateContact('Chopin123', 'fchopin@andrew.cmu.edu')
  console.log(await getClass('15122'))
  // console.log(getStudents('15122'))
  // await removeClass('Chopin123', '15122')
  // await removeGroup('Chopin123', '15122 study group')
}

await test()