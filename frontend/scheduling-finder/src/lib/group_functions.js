import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getFirestore } from "firebase/firestore";
import { doc, collection, getDoc, getDocs, addDoc, setDoc, updateDoc, deleteDoc, query } from "firebase/firestore"; 
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

export async function createGroup(group, times, user, topicClass) {
    await setDoc(doc(db, 'groups', group), {
        groupName: group,
        users: [user],
        times: times,
        topicClass: topicClass,
    })
}

export async function getGroup(groupID) {
    return (await getDoc(doc(db, 'groups', groupID))).data()
}

export async function getAllGroups() {
    const querySnapshot = await getDocs(query(collection(db, 'groups')))
    let groups = []
    querySnapshot.forEach((doc) => {
        groups.push(doc.data())
    })
    return groups
}

export async function deleteGroup(groupID) {
    await deleteDoc(doc(db, 'groups', groupID))
}

export async function updateDescription(groupID, description) {
    await updateDoc(doc(db, 'groups', groupID), {
        description: description
    })
}