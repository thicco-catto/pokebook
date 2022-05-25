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

//-----------
//User
//-----------

function GetUserByNick(nick) {
    return new Promise(resolve =>
        db.collection("users").doc(nick).get().then((doc) =>
            resolve(doc)
        )
    );
}

function AddUser(nick, password, email, dob) {
    return new Promise(resolve =>{
        db.collection("users").doc(nick).set(
            {
                password: password,
                email: email,
                dob: dob
            }
        ).then(() => resolve());
    });
}

//-----------
//Posts
//-----------

function GetPosts(){
    return new Promise(resolve =>
        db.collection("posts").get().then((querySnapshot) => {
            resolve(querySnapshot);
        })
    );
}

function GetNextPostId(){
    return new Promise(resolve =>{
        db.collection("posts").get().then((querySnapshot) => {
            let maxId = -1;
            querySnapshot.forEach((doc) => {
                if(parseInt(doc.id) > maxId){
                    maxId = parseInt(doc.id);
                }
            });
            resolve(maxId + 1);
        });
    });
}

function AddPost(id, user, title, description, pokemon){
    return new Promise(resolve =>{
        db.collection("posts").doc(id.toString()).set(
            {
                op: user,
                title: title,
                description: description,
                pokemon: pokemon
            }
        ).then(() => resolve());
    });
}

function GetPostById(id){
    return new Promise(resolve =>
        db.collection("posts").doc(id.toString()).get().then((doc) =>
            resolve(doc)
        )
    );
}

function GetPostsByUser(nick){
    return new Promise(resolve =>
        db.collection("posts").where("op", "==", nick).get().then((querySnapshot) =>
            resolve(querySnapshot)
        )
    );
}

//-----------
//Likes
//-----------

function GetLikesPerPost(post){
    return new Promise(resolve =>
        db.collection(`posts/${post}/likes`).get().then((querySnapshot) =>
            resolve(querySnapshot)
        )  
    );
}

function GetUserLikeForPost(post, user){
    return new Promise(resolve =>
        db.collection(`posts/${post}/likes`).doc(user).get().then((doc) =>
            resolve(doc)
        )  
    );
}

function AddLikeToPost(post, user){
    return new Promise(resolve =>
        db.collection(`posts/${post}/likes`).doc(user).set({}).then(() =>
            resolve()
        )  
    );
}

function RemoveLikeFromPost(post, user){
    return new Promise(resolve =>
        db.collection(`posts/${post}/likes`).doc(user).delete().then(() =>
            resolve()
        )  
    );
}

//-----------
//Reposts
//-----------


function GetRepostsPerPost(post){
    return new Promise(resolve =>
        db.collection(`posts/${post}/reposts`).get().then((querySnapshot) =>
            resolve(querySnapshot)
        )  
    );
}

function GetUserRepostForPost(post, user){
    return new Promise(resolve =>
        db.collection(`posts/${post}/reposts`).doc(user).get().then((doc) =>
            resolve(doc)
        )  
    );
}

function AddRepostToPost(post, user){
    return new Promise(resolve =>
        db.collection(`posts/${post}/reposts`).doc(user).set({}).then(() =>
            resolve()
        )  
    );
}

function RemoveRepostFromPost(post, user){
    return new Promise(resolve =>
        db.collection(`posts/${post}/reposts`).doc(user).delete().then(() =>
            resolve()
        )  
    );
}

//-----------
//Comments
//-----------

function GetCommentsPerPost(post){
    return new Promise(resolve =>
        db.collection(`posts/${post}/comments`).get().then((querySnapshot) =>
            resolve(querySnapshot)
        )  
    );
}

function AddCommentToPost(post, user, comment){
    return new Promise(resolve =>
        db.collection(`posts/${post}/comments`).add({
            op : user,
            text : comment
        }).then(() =>
            resolve()
        )  
    );
}