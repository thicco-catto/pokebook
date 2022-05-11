const firebaseConfig = {
    apiKey: "AIzaSyC40Oh4sPupi4gFPpYV_GR-w85ACnW4HAo",
    authDomain: "pokebook-dbc8c.firebaseapp.com",
    projectId: "pokebook-dbc8c",
    storageBucket: "pokebook-dbc8c.appspot.com",
    messagingSenderId: "94431024453",
    appId: "1:94431024453:web:7a9b42eabaafbd760e9a2c",
    measurementId: "G-1QPM7DXVDK"
  };

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
const db = firebase.firestore();

function GetUserById(id){
    return new Promise(resolve =>
        db.collection("user").get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                if(doc.data().userID === id){
                    console.log("hola");
                    resolve(doc.data());
                }
            })

            resolve(null);
        })
    );
}


function GetMaxUserId(){
    let maxId = 0;
    return new Promise(resolve =>
        db.collection("user").get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                if(doc.data().userID > maxId){
                    maxId = doc.data().userID;
                }
            })

            resolve(maxId);
        })
    );
}

function AddNewUser(nick, password, email, dob){
    return new Promise(resolve =>
        db.collection("user").get().then((querySnapshot) => {querySnapshot.forEach((doc) => {if(doc.data().userID > maxId){maxId = doc.data().userID;}});resolve(maxId);})
    );
}

function CheckUser(nick, pass){
    return new Promise(resolve =>
        db.collection("user").get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                if(doc.data().nick === nick && doc.data().password === pass){
                    resolve(true)
                }
            })
            resolve(false)
        })
    );
}