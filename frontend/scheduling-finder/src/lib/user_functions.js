import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getFirestore } from "firebase/firestore";
import { doc, collection, getDoc, addDoc, setDoc, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore"; 

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
        times: [],
        groups: [],
        contact: '',
        uploaded: false
    })
}

export async function getUserData(username) {
    return (await getDoc(doc(db, 'users', username))).data()
}

export async function addGroup(username, groupName) {
    await updateDoc(doc(db, 'users', username), {
        groups: arrayUnion(groupName)
    })

    const ref = doc(db, 'groups', groupName)
    const snapshot = await getDoc(ref)
    if(snapshot.exists()) {
        await updateDoc(ref, {
            users: arrayUnion(username)
        })
    }
}

export async function removeGroup(username, groupName) {
    await updateDoc(doc(db, 'users', username), {
        groups: arrayRemove(groupName)
    })

    const ref = doc(db, 'groups', groupName)
    const snapshot = await getDoc(ref)
    if(snapshot.exists()) {
        await updateDoc(ref, {
            users: arrayRemove(username)
        })
    }
}

export async function updateContact(username, contact) {
    await updateDoc(doc(db, 'users', username), {
        contact: contact
    })
}

export async function setup(username, classTimes) {
    let times = []
    for(let i = 0; i < 336; ++i) {
        times[i] = true
    }

    for(let i = 0; i < classTimes.length; ++i) {
        const classObj = JSON.parse(classTimes[i])
        let daysOfWeek = classObj.frequency
        let startTime = classObj.startDate
        let endTime = classObj.endDate
        let courseName = classObj.courseName
        let courseNumber = classObj.courseNum

        for(let j = 0; j < daysOfWeek.length; ++j) {
            let start = daysOfWeek[j] * 48 + Math.floor(startTime/5000) + (startTime % 10000)/3000
            let end = daysOfWeek[j] * 48 + Math.floor(endTime/5000) + (endTime % 10000)/3000
            for(let k = start; k < end; ++k) {
                times[k] = false
            }
        }
        
        let courseInfo = courseNumber + ' : ' + courseName
        await updateDoc(doc(db, 'users', username), {
            classes: arrayUnion(courseInfo),
            uploaded: true
        })
    
        const ref = doc(db, 'classes', courseInfo)
        const snapshot = await getDoc(ref)
        if(snapshot.exists()) {
            await updateDoc(ref, {
                users: arrayUnion(courseInfo)
            })
        } else {
            await setDoc(doc(db, 'classes', courseInfo), {
                className: courseInfo,
                users: [username]
            })
        }
    }
    return times
}