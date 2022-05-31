async function renderComment(comment, user){
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);

    const selfUserNick = urlParams.get("user");
    const commentOp = await GetUserByNick(comment.data().op);

    commentStr = `
        <div class="card gedf-card">
            <div class="card-body" style="background-color: #003566;">
                    <p> En respuesta a @${user}:</p>
                <div class="d-flex align-items-center" >
                    <div class="mr-2">
                        <img class="rounded-circle" style="width: 45px;height: 45px; border-radius: 10px;" src="${commentOp.data().picture}" alt="foto de perfil">
                    </div>
                    <div class="ml-2">
                    <a href="Perfil.html?user=${selfUserNick}&userProfile=${comment.data().op}">
                        <div style="color: white;" class="h5 m-0">@${comment.data().op}</div>
                        </a>
                    </div>
                </div>

                <div class="form-group col-md-12">
                    <div class="card-body" style="background-color: #003566; "> <p>${comment.data().text}</p></div>
                </div>
            </div>
        </div>
    `;

    return parseHTML(commentStr);
}

async function onLoad(event){
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);

    const postId = urlParams.get("post");
    const post = await GetPostById(postId);
    
    const comments = await GetCommentsPerPost(postId);

    let commentsArray = [];
    comments.forEach(comments => {
        commentsArray.push(comments);
    });

    const commentsDiv = document.getElementById("comments");

    for (let i = 0; i < commentsArray.length; i++) {
        const comment = commentsArray[i];
        const commentHTML = await renderComment(comment, post.data().op);
        commentsDiv.appendChild(commentHTML);
    }
}
addEventListener("DOMContentLoaded", onLoad);