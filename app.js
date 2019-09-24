$(document).ready(function() {

    $('.comment-form').hide();

    function Post(id, title, author, content) {
        this.id = id;
        this.title = title;
        this.author = author;
        this.content = content;
        this.comments = [];
    };

    function Comment(postID, id, author, content) {
        this.postID = postID;
        this.id = id;
        this.author = author;
        this.content = content;
    };


    const redditApp = () => {
        const posts = [];

        const addPost = (id, title, author, content) => {
            post = new Post(id, title, author, content)
            posts.push(post);
            console.log(posts);
            displayPosts();
        };

        const addComment = (postID, id, author, content) => {
            let postIndex = posts.findIndex((obj => obj.id == postID));
            let newComment = {id: id, author: author, content: content}
            posts[postIndex].comments.push(newComment);
            console.log(posts[postIndex].comments)
        };

        const generateID = () => {
            return Math.random().toString(36).replace('0.', '') 
        };

        // const mapComments = function (post) {
        //     let newCommentDiv = $('p');
        //     post.comments.map(comment => {
        //         let commentContent = `
        //             <p>${comment.author}</p>
        //             <p>${comment.content}</p>
        //             `;
        //         $(newCommentDiv).append(commentContent);
        //     });
        //     return newCommentDiv;
        // };

        const displayPosts = () => {
            console.log("displaying posts");
            $('.post-content').empty();
            
            posts.map(post => {
                let commentsDiv = `<p>`
                post.comments.map(comment => {
                    commentsDiv+= `<p>${comment.author}: ${comment.content}</p>
                     `
                });
                let newPost =  `<div class="media post" id=${post.id} data-id=${post.id}>
                    <div class="media-body">
                        <p class="title">
                            <a class="title-link">${post.title}</a>
                        </p>
                        <p>${post.author}</p>
                        <p>${post.content}</p>            
                        <p>${post.id}</p>
                    `;
                newPost += commentsDiv;
                newPost += '</p>';
                newPost += `    
                        <button data-id=${post.id} class="btn btn-dark addComment">Add Comment</button>
                    </div>
                </div>`;
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
            generateID: generateID,
            addComment: addComment,
            displayPosts: displayPosts
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

    $('.post-content').on('click', function(event){
        if ($(event.target).hasClass('addComment')) {
            const postID = $(event.target).attr('data-id');
            $('#saveCommentButton').attr('data-id', postID);
            $('.post-form').hide()
            $('.comment-form').show();
        }
    });

    $('#saveCommentButton').on('click', function(event){
        const postID = $(event.target).attr('data-id');
        let commentID = app.generateID();
        let commentAuthor = $("#commentUser").val();
        let commentContent = $("#commentText").val();
        console.log(postID);
        app.addComment(postID, commentID, commentAuthor, commentContent);
        app.displayPosts();
    });


    
});