const {commentCreation, reactionCreation} = require('./creation')

async function getAllPosts() {
    try {
        const getPost = await fetch('http://localhost:3000/')
        const res = await getPost.json();
        res.forEach(createJokeSection)
    } catch (error) {
        console.log(error)
    }
}

function createJokeSection(data) {
    const section = document.createElement("section");
    let form = document.createElement("form");

    overallSection(form, data, section)
    reaction(data, section)
    
    const div = document.querySelector("#jokes")
    div.append(section)

    form.addEventListener('submit', commentCreation)
}

function overallSection(form, data, section) {
    let h2 = document.createElement("h2");
    h2.textContent = `${data.title}`;
    
    let h5 = document.createElement("h5");
    h5.textContent = `Posted: ${data.date.slice(5,-7)}`;

    let button = document.createElement("button");
    button.textContent = "Show punchline";
    button.setAttribute("class", "button green-button")

    let h3 = document.createElement("h3");
    let img = document.createElement("img");

    button.addEventListener('click', (e) => {
        e.preventDefault();
        h3.textContent = `${data.description}`;
        h3.style.fontWeight = "normal";
        img.src = data.gif;
        button.style.display = "none";
        
        
        commentSection(form, data, section)
    })

    section.append(h2);
    section.append(button)
    section.append(h3);
    section.append(img);
    section.append(h5);
}

function reaction(data, section) {
    const reactionForm = document.createElement("form");
    reactionForm.setAttribute("class", "reactions");
    reactionForm.setAttribute("name", data.id)

    const [emoji1, emoji1Label] = createEmoji(data, "👍", "like")
    const [emoji2, emoji2Label] = createEmoji(data, "👎", "dislike")
    const [emoji3, emoji3Label] = createEmoji(data, "😃", "happy")
    
    reactionForm.append(emoji1Label)
    reactionForm.append(emoji1)

    reactionForm.append(emoji2Label)
    reactionForm.append(emoji2)

    reactionForm.append(emoji3Label)
    reactionForm.append(emoji3)
    
    section.append(reactionForm)
    reactionForm.addEventListener('submit', reactionCreation)
}

function createEmoji(data, symbol, name) {
    const emoji = document.createElement("input");
    const emojiLabel = document.createElement("label");
    emoji.value = symbol;
    emoji.setAttribute("name", name);
    emoji.setAttribute("type", "submit")
    emojiLabel.setAttribute("for", name);
    emojiLabel.textContent = `${data.reaction[name]}`;

    return [emoji, emojiLabel];
}


function commentSection(form, data, section) {
    
    form.setAttribute("name", data.id)
    form.setAttribute("class", "comment-form")

    let comments = document.createElement("input");
    comments.setAttribute("name", "comment")
    comments.setAttribute("class", "comment_input")
    comments.setAttribute("required", "true")
    comments.setAttribute("placeholder", "Add a comment")

    let input = document.createElement("input");
    input.setAttribute("type", "submit")
    input.setAttribute("class", "button green-button")

    form.append(comments);
    form.append(input)
    section.append(form);

    const commentWrapper = document.createElement("section");
    commentWrapper.setAttribute("class", "comment-section hidden")
    
    const toggleComments = document.createElement("button");
    toggleComments.textContent = "Show/Hide Comments"
    toggleComments.setAttribute("class", "button grey-button")
    toggleComments.addEventListener('click', () => {
        commentWrapper.classList.toggle("hidden")
    })

    section.append(toggleComments)

    if (data.comment.length < 1) {
        noComments(section, commentWrapper)
    }
    
    data.comment.forEach(comment => displayComment(comment, section, commentWrapper))
}

function noComments(section, wrapper) {
    const comments1 = document.createElement("h4");
    comments1.textContent = `No comments yet!`
    wrapper.append(comments1)
    section.append(wrapper)
}

function displayComment(comment, section, wrapper) {
    const comments1 = document.createElement("p");
    comments1.textContent = comment
    wrapper.append(comments1)
    section.append(wrapper)
}

module.exports = {getAllPosts, overallSection, reaction, commentSection, createJokeSection}
