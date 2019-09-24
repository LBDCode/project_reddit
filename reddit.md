# DOM Project

## Intro

Another week under our belts! Let's look at all the objectives together to see how much we covered:

- Explain what the DOM is
- Access DOM nodes with JavaScript
- Explain what Web APIs are
- Append and remove DOM elements with JavaScript
- Create new DOM elements with JavaScript
- Utilize events to respond to user actions
- Talk about the difference between HTML "nodes", "tags", and "elements".
- Distinguish between "block" and "inline" elements.
- Utilize from memory some of the most common HTML tags.
- Utilize class, id, inline and pseudo CSS selectors
- Explain CSS specificity
- Describe the different CSS "positions"
- Explain the CSS Box Model
- Utilize floats and clear floats to create a "grid" layout
- Utilize the display property for layout
- Define responsive design
- Utilize CSS media queries to create responsive web pages
- Synthesize HTML, CSS and JavaScript to build simple, practical applications
- Define CSS frameworks
- Explain how CSS frameworks are built
- Make an argument for utilizing CSS frameworks
- Select DOM elements using jQuery
- Utilize events using jQuery
- Identify and utilize several jQuery methods
- Explain something about how jQuery might be implemented in JavaScript
- Append and remove elements using jQuery
- Access and set data attributes using jQuery
- Utilize `this` in jQuery
- Explain what it means to bind events, especially with jQuery
- Utilize the Bootstrap 3 grid system for layout
- Utilize a variety of Bootstrap 3 components
- Be able to quickly learn Bootstrap 4 and all other CSS frameworks
- Synthesize HTML, CSS, JavaScript and jQuery concepts to build more advanced user interfaces.

---

## The Challenge - Posts and Comments

Today's challenge is fairly simple (but perhaps not easy) and similar to some of what we've already tackled this week.

We're going to be building Project Reddit. It's not a very creative name, but it will basically be a miniature version of Reddit (and every other social media site) where users can create posts and comments. The first part of it will look like this:

![img](https://www.projectshift.io/wp-content/uploads/2017/12/Screen-Shot-2017-12-20-at-7.40.46-PM.png)

### Part 1

So the task is simple: build the above and make it work. Here are the constraints:

- Use Bootstrap (version 3 or 4 is fine)
- Write clean and pretty HTML, CSS and JavaScript
- Utilize patterns to organize your JavaScript if necessary
- Use jQuery

### Part 2

Here, things will get a bit more complex:

![img](https://www.projectshift.io/wp-content/uploads/2017/12/Screen-Shot-2017-12-20-at-7.54.27-PM.png)

- We now want users to be able to leave comments on each post. When a user clicks 'comments' (above each post) it should toggle the comments and input box visible/hidden.

- When a user clicks the 'x' next to a comment, it should delete it.

- When a user fills out the two comment inputs and clicks 'Post Comment' it should immediately add the comment to the list of comments.

- Lastly, when a user clicks 'remove' above a post, it should remove the post too.

That's all! To get started, [fork and clone this repo](https://github.com/projectshft/project-reddit). There's nothing in it but a `README.md` file, but we want you to fork/clone so you can leave a pull request when you're done for review. Enjoy!

## Extension 1

Enable users to edit their posts.

## Extension 2

Instead of having the comments appear right below the posts, enable a post to be "clickable" and for the page to seem to navigate to a new page that is dedicated to just that post and its comments. Of course, it won't be a new page, but you'll have to figure out how to handle that.

The "new page" will look something like this:

![img](https://www.projectshift.io/wp-content/uploads/2018/01/Screen-Shot-2018-01-22-at-8.56.55-AM.png)

Notice that the main form is not for posts, but comments. Also notice that "back" button. It should link "backward" showing all the posts again.
