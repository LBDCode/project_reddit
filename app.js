$(document).ready(function() {

    $('#commentDiv').hide();


    const redditApp = () => {
        const posts = [];

        const addPost = (id, title, author, content) => {
            posts.push({id: id, title: title, author: author, content: content, comments: []});
            console.log(posts);
            displayPosts();
        };

        const generateID = () => {
            return Math.random().toString(36).replace('0.', '') 
        };

        const displayPosts = () => {
            $('.post-content').empty();
            posts.map(post => {
                let newPost =  `<div class="media post">
                    <div class="media-body">
                        <p class="title">
                            <a class="title-link">${post.title}</a>
                        </p>
                        <p>${post.author}</p>
                        <p>${post.content}</p>            
                        <p>${post.id}</p>
                        <button data-id=${post.id} class="btn btn-dark comment">Add Comment</button>
                    </div>
                </div>`
                $('.post-content').append(newPost);
            })
        };

        const resetPostDiv = () => {
            $("#postTitle").val('');
            $("#postUser").val('');
            $("#postText").val('');
        };
        
        return {
            posts: posts,
            addPost: addPost,
            resetPostDiv: resetPostDiv,
            generateID: generateID
        }
    };

    const app = redditApp();

    $('#savePostButton').on('click', function(){
        let postID = app.generateID();
        let postTitle = $("#postTitle").val();
        let postAuthor = $("#postUser").val();
        let postContent = $("#postText").val();
        app.addPost(postID, postTitle, postAuthor, postContent);
        app.resetPostDiv();
    });


    
});