async function onLoad(event){
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);

    const selfUserNick = urlParams.get("user");
    const userNick = urlParams.get("userProfile");

    const user = await GetUserByNick(userNick);

    const nickText = document.getElementById("user-nick");
    nickText.textContent = user.id;

    const emailText = document.getElementById("user-email");
    emailText.textContent = user.data().email;

    const followButton = document.getElementById("follow-button");
    if(selfUserNick === userNick){
        followButton.textContent = "Editar";
        followButton.onclick = () => console.log(selfUserNick + " SAME");
    }else{
        followButton.textContent = "Seguir";
        followButton.onclick = () => console.log(userNick + " follow");
    }

    const posts = await GetPostsByUser(userNick);

    let postArray = [];
    console.log(posts.size);
    posts.forEach(post => {
        console.log(post);
        postArray.push(post);
    });

    renderPosts(postArray)
}
addEventListener("DOMContentLoaded", onLoad);