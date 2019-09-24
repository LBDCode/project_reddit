$(document).ready(function() {


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

        const deletePost = (postID) => {
            let postIndex = posts.findIndex((obj => obj.id == postID));
            posts.splice(postIndex, 1);
            displayPosts();
        };

        const addComment = (postID, id, author, content) => {
            let postIndex = posts.findIndex((obj => obj.id == postID));
            let newComment = {postID: postID, id: id, author: author, content: content}
            posts[postIndex].comments.push(newComment);
            console.log(posts[postIndex].comments);
            displayPosts();
        };

        const deleteComment = (postID, commentID) => {
            let postIndex = posts.findIndex((obj => obj.id == postID));
            let commentIndex = posts[postIndex].comments.findIndex(com => com.id == commentID);
            let p = posts[postIndex];
            console.log(p.comments);
            console.log(`delete ${postID} comment ${commentID}`);
            p.comments.splice(commentIndex, 1);
            console.log(posts[postIndex]);
            displayPosts();
        }

        const generateID = () => {
            return Math.random().toString(36).replace('0.', '') 
        };


        const displayPosts = () => {
            console.log("displaying posts");
            $('.post-content').empty();
            
            posts.map(post => {
                let commentsDiv = `<p>`

                post.comments.map(comment => {
                    commentsDiv+= `<p><span class='commentDelete' data-postID= ${comment.postID} id=${comment.id}>x</span>${comment.author}: ${comment.content}</p>
                     `
                });

                let newPost =  `<div class="media post" id=${post.id} data-id=${post.id}>
                    <div class="media-body">
                        <p class="title">
                            <a class="title-link">${post.title}</a>
                        </p>
                        <p>posted by: ${post.author}</p>
                        <p>${post.content}</p>            
                        <p><strong>Comments:</strong></p>
                    `;
                newPost += commentsDiv;
                newPost += '</p>';
                newPost += `    
                        <button data-id=${post.id} class="btn btn-dark addComment">Add Comment</button>
                        <button data-id=${post.id} class="btn btn-light removePostButton">Remove Post</button>
                    </div>
                </div>`;
                $('.post-content').append(newPost);
            });

        };

        const resetPostDiv = () => {
            $("#postTitle").val('');
            $("#postUser").val('');
            $("#postText").val('');
        };

        const resetCommentDiv = () => {
            $("#commentUser").val('');
            $("#commentText").val('');
        };
        
        return {
            posts: posts,
            addPost: addPost,
            resetPostDiv: resetPostDiv,
            generateID: generateID,
            addComment: addComment,
            displayPosts: displayPosts,
            deletePost: deletePost,
            resetCommentDiv: resetCommentDiv,
            deleteComment: deleteComment
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
        $('.postAction').hide();
    });

    $('.post-content').on('click', function(event){
        if ($(event.target).hasClass('addComment')) {
            $('.comment-form').show();
            $('.postAction').show();
            $('.post-form').hide();    
            const postID = $(event.target).attr('data-id');
            $('#saveCommentButton').attr('data-id', postID);
            $('.post-form').hide()
            $('.comment-form').show();
        } else if ($(event.target).hasClass('removePostButton')) {
            const postID = $(event.target).attr('data-id');
            app.deletePost(postID);
        } else if ($(event.target).hasClass('commentDelete')) {
            const postID = $(event.target).attr('data-postID');
            const commentID = $(event.target).attr('id');
            app.deleteComment(postID, commentID);
        }
    });

    $('#saveCommentButton').on('click', function(event){
        const postID = $(event.target).attr('data-id');
        let commentID = app.generateID();
        let commentAuthor = $("#commentUser").val();
        let commentContent = $("#commentText").val();
        app.addComment(postID, commentID, commentAuthor, commentContent);
        app.displayPosts();
        app.resetCommentDiv();
    });

    $('.addPostBtn').on('click', function(event){
        $('.comment-form').hide();
        $('.postAction').show();
        $('.post-form').show();
    })


    
});