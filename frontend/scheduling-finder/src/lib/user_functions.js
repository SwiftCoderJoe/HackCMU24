import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getFirestore } from "firebase/firestore";
import { doc, setDoc, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore"; 

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

export async function register(username) {
    await setDoc(doc(db, 'users', username), {
        username: username,
        classes: [],
        groups: [],
        contact: ''
    })
}

export async function getUserData(username) {
    await getDoc(doc(db, 'users', username))
}

export async function addClass(username, className) {
    await updateDoc(doc(db, 'users', username), {
        classes: arrayUnion(className)
    })

    await setDoc(doc(db, 'classes', className), {
        className: className,
        users: arrayUnion(username)
    })
}

export async function removeClass(username, className) {
    await updateDoc(doc(db, 'users', username), {
        classes: arrayRemove(className)
    })

    await updateDoc(doc(db, 'classes', className), {
        users: arrayRemove(username)
    })
}

export async function addGroup(username, groupName) {
    await updateDoc(doc(db, 'users', username), {
        groups: arrayUnion(groupName)
    })

    await setDoc(doc(db, 'groups', groupName), {
        users: arrayUnion(username)
    })
}

export async function removeGroup(username, groupName) {
    await updateDoc(doc(db, 'users', username), {
        groups: arrayRemove(groupName)
    })

    await updateDoc(doc(db, 'groups', groupName), {
        users: arrayRemove(username)
    })
}

export async function updateContact(username, contact) {
    await updateDoc(doc(db, 'users', username), {
        contact: contact
    })
}