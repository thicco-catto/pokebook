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

function GetUserById(id) {
    return new Promise(resolve =>
        db.collection("users").get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                if (doc.data().userID === id) {
                    console.log("hola");
                    resolve(doc);
                }
            })

            resolve(null);
        })
    );
}


function GetNextUserId() {
    return new Promise(resolve =>
        db.collection("users").get().then((querySnapshot) => {
            let maxId = 0;
            querySnapshot.forEach((doc) => {
                if (doc.data().userID > maxId) {
                    maxId = doc.data().userID;
                }
            });
            resolve(maxId + 1);
        })
    );
}

function CheckNickExists(nick){
    return new Promise(resolve =>{
        db.collection("users").get().then((querySnapshot) => {
            let existsNick = false;
            querySnapshot.forEach((doc) =>{
                if(doc.data().nick === nick){
                    existsNick = true;
                }
            });
            resolve(existsNick);
        });
    })
}

function AddUser(id, nick, password, email, dob) {
    return new Promise(resolve =>{
        db.collection("users").add(
            {
                userID: id,
                nick: nick,
                password: password,
                email: email,
                dob: dob
            }
        );
    });
}

function CheckUserPass(nick, pass) {
    return new Promise(resolve =>
        db.collection("users").get().then((querySnapshot) => {
            let correctUser = null
            querySnapshot.forEach((doc) => {
                if (doc.data().nick === nick && doc.data().password === pass) {
                    correctUser = doc;
                }
            })
            resolve(correctUser);
        })
    );
}

function GetPosts(){
    return new Promise(resolve =>
        db.collection("posts").get().then((querySnapshot) => {
            resolve(querySnapshot);
        })
    );
}