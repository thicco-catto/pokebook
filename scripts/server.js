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
                dob: dob,
                picture: "https://bootdey.com/img/Content/avatar/avatar1.png"
            }
        ).then(() => resolve());
    });
}

function ChangeProfilePicture(nick, picture){
    return new Promise(resolve =>{
        db.collection("users").doc(nick).update(
            {
                picture: picture
            }
        ).then(() => resolve());
    });
}

//-----------
//Followers
//-----------

function AddFollowed(userFollower, userFollowed){
    return new Promise(resolve =>{
        db.collection(`users/${userFollower}/follows`).doc(userFollowed).set({}).then(() =>
            resolve()
        )
    });
}

function AddFollower(userFollower, userFollowed){
    return new Promise(resolve =>{
        db.collection(`users/${userFollowed}/followers`).doc(userFollower).set({}).then(() =>
            resolve()
        )
    });
}

async function FollowUser(userFollower, userFollowed){
    await AddFollowed(userFollower, userFollowed);
    await AddFollower(userFollower, userFollowed);

    return true;
}

function RemoveFollowed(userFollower, userFollowed){
    return new Promise(resolve =>{
        db.collection(`users/${userFollower}/follows`).doc(userFollowed).delete().then(() =>
            resolve()
        )
    });
}

function RemoveFollower(userFollower, userFollowed){
    return new Promise(resolve =>{
        db.collection(`users/${userFollowed}/followers`).doc(userFollower).delete().then(() =>
            resolve()
        )
    });
}

async function UnfollowUser(userFollower, userFollowed){
    await RemoveFollowed(userFollower, userFollowed);
    await RemoveFollower(userFollower, userFollowed);

    return true;
}

function GetUserFollowers(user){
    return new Promise(resolve =>{
        db.collection(`users/${user}/followers`).get().then((querySnapshot) =>
            resolve(querySnapshot)
        )
    }); 
}

function GetUserFollowed(user){
    return new Promise(resolve =>{
        db.collection(`users/${user}/follows`).get().then((querySnapshot) =>
            resolve(querySnapshot)
        )
    }); 
}

function GetUserFollowsUser(userFollower, userFollowed){
    return new Promise(resolve =>{
        db.collection(`users/${userFollowed}/followers`).doc(userFollower).get().then((doc) =>
            resolve(doc)
        )
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
                pokemon: pokemon,
                postDate: Date.now()
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

function GetLikedPostsByUser(nick){
    return new Promise(resolve =>
        db.collection(`users/${nick}/likes`).get().then((querySnapshot) =>
            resolve(querySnapshot)
        )
    );
}

function DeletePost(id){
    return new Promise(resolve =>
        db.collection("posts").doc(id.toString()).delete().then(() =>
            resolve()
        )
    );
}

//-----------
//Notifications
//-----------

function GetNotificationsByUser(user){
    return new Promise(resolve =>
        db.collection(`users/${user}/notifications`).orderBy("postDate", "desc").get().then((querySnapshot) =>
            resolve(querySnapshot)
        )  
    );
}

function GetNotificationsByPost(user, post){
    return new Promise(resolve =>
        db.collection(`users/${user}/notifications`).where("post", "==", parseInt(post)).get().then((querySnapshot) =>
            resolve(querySnapshot)
        )  
    );
}

function AddNotification(reciever, type, post, user){
    return new Promise(resolve =>
        db.collection(`users/${reciever}/notifications`).add({
            type: type,
            post: parseInt(post),
            user: user,
            postDate: Date.now()
        }).then(() => resolve())
    );
}

function DeleteNotification(user, notif){
    return new Promise(resolve =>
        db.collection(`users/${user}/notifications`).doc(notif).delete().then(() =>
            resolve()
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

function AddLikeToUser(post, user){
    return new Promise(resolve =>
        db.collection(`users/${user}/likes`).doc(post.toString()).set({}).then(() =>
            resolve()
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

async function LikePost(post, user){
    await AddLikeToUser(post, user);
    await AddLikeToPost(post, user);
    const postid = await GetPostById(post);
    await AddNotification(postid.data().op, "like", post, user);

    return true;
}

function RemoveLikeFromUser(post, user){
    return new Promise(resolve =>
        db.collection(`users/${user}/likes`).doc(post.toString()).delete().then(() =>
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

async function UnlikePost(post, user){
    await RemoveLikeFromUser(post, user);
    await RemoveLikeFromPost(post, user);

    return true;
}

//-----------
//Reposts
//-----------

function GetRepostsPerUser(user){
    return new Promise(resolve =>
        db.collection(`users/${user}/reposts`).get().then((querySnapshot) =>
            resolve(querySnapshot)
        )  
    );
}

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

function AddRepostToUser(post, user){
    return new Promise(resolve =>
        db.collection(`users/${user}/reposts`).doc(post.toString()).set({}).then(() =>
            resolve()
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

async function RepostPost(post, user){
    await AddRepostToUser(post, user);
    await AddRepostToPost(post, user);
    const postid = await GetPostById(post);
    await AddNotification(postid.data().op, "repost", post, user);

    return true;
}

function RemoveRepostFromUser(post, user){
    return new Promise(resolve =>
        db.collection(`users/${user}/reposts`).doc(post.toString()).delete().then(() =>
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

async function UnrepostPost(post, user){
    await RemoveRepostFromUser(post, user);
    await RemoveRepostFromPost(post, user);

    return true;
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

async function AddCommentToPost(post, user, comment){
    const postid = await GetPostById(post);
    await AddNotification(postid.data().op, "comment", post, user);

    return new Promise(resolve =>
        db.collection(`posts/${post}/comments`).add({
            op : user,
            text : comment
        }).then(() =>
            resolve()
        )  
    );
}

function GetUserCommentForPost(post, user){
    return new Promise(resolve =>
        db.collection(`posts/${post}/comments`).where("op", "==", user).get().then((querySnapshot) =>
            resolve(querySnapshot)
        )  
    );
}