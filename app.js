$(document).ready(function() {

    //post object
    function Post(id, title, author, content) {
        this.id = id;
        this.title = title;
        this.author = author;
        this.content = content;
        this.comments = [];
    };

    //comment object
    function Comment(postID, id, author, content) {
        this.postID = postID;
        this.id = id;
        this.author = author;
        this.content = content;
    };


    const redditApp = () => {
        
        const posts = [];

        // create a new post object, add it to posts array, and update the ui
        const addPost = (id, title, author, content) => {
            post = new Post(id, title, author, content)
            posts.push(post);
            displayPosts();
        };

        // delete a post object from the posts array by using id, update the ui
        const deletePost = (postID) => {
            let postIndex = posts.findIndex((obj => obj.id == postID));
            posts.splice(postIndex, 1);
            displayPosts();
        };

        // for a specific post (use post ID number), add a comment to the comments array of that post
        // then update the ui
        const addComment = (postID, id, author, content) => {
            let postIndex = posts.findIndex((obj => obj.id == postID));
            let newComment = new Comment(postID, id, author, content);
            posts[postIndex].comments.push(newComment);
            console.log(posts[postIndex].comments);
            displayPosts();
        };

        // for a specific post (use post ID number), delete a comment from the comments array of that post
        // then update the ui
        const deleteComment = (postID, commentID) => {
            let postIndex = posts.findIndex((obj => obj.id == postID));
            let commentIndex = posts[postIndex].comments.findIndex(com => com.id == commentID);
            let p = posts[postIndex];
            p.comments.splice(commentIndex, 1);
            console.log(posts[postIndex]);
            displayPosts();
        };

        // function to generate a random id for posts and comments
        const generateID = () => {
            return Math.random().toString(36).replace('0.', '') 
        };

        // update the ui to display posts
        // empty the post container div, then map through posts and build a post div for each item in posts array
        // append to post container div
        const displayPosts = () => {
            $('.post-content').empty();
            
            posts.map(post => {
                // build comments div by looping through comments array of post
                let commentsDiv = `<p>`;
                post.comments.map(comment => {
                    commentsDiv+= `<p><span class='commentDelete' data-postID= ${comment.postID} id=${comment.id}>x</span>${comment.author}: ${comment.content}</p>
                     `
                });
                // build post div for each post in posts array
                let newPost =  `<div class="media post" id=${post.id} data-id=${post.id}>
                    <div class="media-body">
                        <p class="title">${post.title}
                        </p>
                        <p>posted by: ${post.author}</p>
                        <p>${post.content}</p>            
                        <p><strong>Comments:</strong></p>
                    `;
                // add comments div    
                newPost += commentsDiv;
                newPost += '</p>';
                // add buttons to comment and delete posts
                newPost += `    
                        <button data-id=${post.id} class="btn btn-dark addComment">Add Comment</button>
                        <button data-id=${post.id} class="btn btn-light removePostButton">Remove Post</button>
                    </div>
                </div>`;
                // append to container div
                $('.post-content').append(newPost);
            });
        };

        // set form inputs for post back to empty string
        const resetPostDiv = () => {
            $("#postTitle").val('');
            $("#postUser").val('');
            $("#postText").val('');
        };

        //set form inputs for comment back to empty string
        const resetCommentDiv = () => {
            $("#commentUser").val('');
            $("#commentText").val('');
        };

        const showOnePost = (postID) => {
            $('.media').not('#' + postID).hide();
            $('.showAllPostsBtn').show();
        };

        const showAllPosts = (postID) => {
            $('.media').show();
            $('.showAllPostsBtn').hide();
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
            deleteComment: deleteComment,
            showOnePost: showOnePost,
            showAllPosts: showAllPosts
        }
    };

    const app = redditApp();

    // when add post button is clicked hide the comment form, and show the form container and post form
    $('.addPostBtn').on('click', function(event){
        $('.comment-form').hide();
        $('.postAction').show();
        $('.post-form').show();
    });

    // when save post button is clicked, capture form inputs, call the method to add a post to the posts array,
    // reset post form inputs and then hide the form
    $('#savePostButton').on('click', function(){
        let postID = app.generateID();
        let postTitle = $("#postTitle").val();
        let postAuthor = $("#postUser").val();
        let postContent = $("#postText").val();
        app.addPost(postID, postTitle, postAuthor, postContent);
        app.resetPostDiv();
        $('.postAction').hide();
    });

    // handlers for various actions users can take on posts (add comment, delete post, delete comment)
    $('.post-content').on('click', function(event){
        // if user clicks add comment, show the comment form and container div, hide the post form
        // then get the post ID from the data attr, attach that to the save comment button data-id attr
        // if user clicks remove post, get the post ID and call the delete post method
        /// if user clicks delete comment, get post ID and comment ID from data attrs, call delete comment
        if ($(event.target).hasClass('addComment')) {
            $('.comment-form').show();
            $('.postAction').show();
            $('.post-form').hide();    
            const postID = $(event.target).attr('data-id');
            $('#saveCommentButton').attr('data-id', postID);   
        } else if ($(event.target).hasClass('removePostButton')) {
            const postID = $(event.target).attr('data-id');
            app.deletePost(postID);
            app.showAllPosts();
        } else if ($(event.target).hasClass('commentDelete')) {
            const postID = $(event.target).attr('data-postID');
            const commentID = $(event.target).attr('id');
            app.deleteComment(postID, commentID);
        } else if ($(event.target).hasClass('media-body') || $(event.target).hasClass('title')) {
            const postID = $(event.target).closest('.post').attr('id');
            app.showOnePost(postID);
        }
    });

    // if user clicks save comment, get form inputs then run add comment method
    // then re-set comment div
    $('#saveCommentButton').on('click', function(event){
        const postID = $(event.target).attr('data-id');
        let commentID = app.generateID();
        let commentAuthor = $("#commentUser").val();
        let commentContent = $("#commentText").val();
        app.addComment(postID, commentID, commentAuthor, commentContent);
        app.resetCommentDiv();
        $('.comment-form').hide();
        $('.postAction').hide();
    });

    $('.showAllPostsBtn').on('click', function(event){
        app.showAllPosts();
    });


});

// basic functionality:
// users can create (form with title, content, user) and delete posts 
// users comment on posts (form with content and user), and delete comments
// additional functionality (not done yet):
// hide all posts but the one clicked - this is semi-working, need to go back 
// and refactor hide/show to reduce redundancy/duplication
// validate form inputs
// change pointer on mouseover of delete x
// 