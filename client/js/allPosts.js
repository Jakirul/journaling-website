const {commentCreation, reactionCreation} = require('./creation')

async function getAllPosts() {
    const getPost = await fetch('http://localhost:3000/')
    const res = await getPost.json();
   
    res.forEach(data => {
        
        const section = document.createElement("section");
       
        let form = document.createElement("form");

        overallSection(form, data, section)
        
        reaction(data, section)
        
        const div = document.querySelector("#jokes")
        console.log(document.querySelector(".comment-form"))
        div.append(section)
       
        document.body.append(div)
        form.addEventListener('submit', commentCreation)
       
    })
}

async function overallSection(form, data, section) {
    let h2 = document.createElement("h2");
    h2.textContent = `${data.title}`;
    
    let h5 = document.createElement("h5");
    h5.textContent = `Posted: ${data.date.slice(0,-7)}`;

    let button = document.createElement("button");
    button.textContent = "Show punchline";

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

async function reaction(data, section) {
    const reactionForm = document.createElement("form");
    reactionForm.setAttribute("class", "reactions");
    reactionForm.setAttribute("name", data.id)

    const emoji1 = document.createElement("input");
    emoji1.value = "👍";
    const emoji1Label = document.createElement("label");
    emoji1Label.setAttribute("for", `${data.reaction["like"]}`)
    emoji1Label.textContent = `${data.reaction["like"]}`

    const emoji2 = document.createElement("input");
    emoji2.value = "👎"
    const emoji2Label = document.createElement("label");
    emoji2Label.setAttribute("for", `${data.reaction["dislike"]}`)
    emoji2Label.textContent = `${data.reaction["dislike"]}`

    const emoji3 = document.createElement("input");
    emoji3.value = "😃"
    const emoji3Label = document.createElement("label");
    emoji3Label.setAttribute("for", `${data.reaction["happy"]}`)
    emoji3Label.textContent = `${data.reaction["happy"]}`

    emoji1.setAttribute("name", "like");
    emoji1.setAttribute("type", "submit")
    emoji2.setAttribute("name", "dislike");
    emoji2.setAttribute("type", "submit")
    emoji3.setAttribute("name", "happy");
    emoji3.setAttribute("type", "submit")
    
    reactionForm.append(emoji1Label)
    reactionForm.append(emoji1)

    reactionForm.append(emoji2Label)
    reactionForm.append(emoji2)

    reactionForm.append(emoji3Label)
    reactionForm.append(emoji3)
    
    section.append(reactionForm)
    reactionForm.addEventListener('submit', reactionCreation)
}


async function commentSection(form, data, section) {
    
    form.setAttribute("name", data.id)
    form.setAttribute("class", "comment-form")

    let comments = document.createElement("input");
    comments.setAttribute("name", "comment")
    comments.setAttribute("class", "comment_input")
    comments.setAttribute("required", "true")

    let input = document.createElement("input");
    input.setAttribute("type", "submit")

    form.append(comments);
    form.append(input)
    section.append(form);

    const commentWrapper = document.createElement("section");
    commentWrapper.setAttribute("class", "comment-section hidden")
    
    const toggleComments = document.createElement("button");
    toggleComments.textContent = "Show/Hide Comment"
    toggleComments.addEventListener('click', () => {
        commentWrapper.classList.toggle("hidden")
    })

    section.append(toggleComments)

    if (data.comment.length < 1) {
        const comments1 = document.createElement("h4");
        comments1.textContent = `No comments yet!`
        commentWrapper.append(comments1)
        section.append(commentWrapper)
    }
    data.comment.forEach(comment => {
        const comments1 = document.createElement("p");
        comments1.textContent = `${comment}`
        commentWrapper.append(comments1)
        section.append(commentWrapper)
    })

    
}

module.exports = {getAllPosts, overallSection, reaction, commentSection}