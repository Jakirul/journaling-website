
const {commentCreation, reactionCreation} = require('./creation')

async function getAllPosts(order) {
    try {    
        const getPost = await fetch('http://localhost:3000/')
        const res = await getPost.json();
        sectionArray = []
        res.forEach(data => {
            
            const section = document.createElement("section");
        

            let form = document.createElement("form");

            overallSection(form, data, section,sectionArray)
            
            reaction(data, section)

            form.addEventListener('submit', commentCreation)
        })
    } catch (error) {
        console.log(error)
    }
    
      const div = document.querySelector("#jokes")
      let s2 = sectionArray;
      if (order == "alphabetical"){
        s2 = sectionArray.sort(compareAlpha)
        while(div.firstChild){
            div.removeChild(div.firstChild);
        }
      }
      else if (order=="likes"){
        s2 = sortByProperty(sectionArray, "happy")
        while(div.firstChild){
            div.removeChild(div.firstChild);
        }
      } 
      else if(order == "dislikes"){
        s2 = sortByProperty(sectionArray, "sad");
        while(div.firstChild){
            div.removeChild(div.firstChild);
        }
      }
      else if (order == "third"){
        s2 = sortByProperty(sectionArray, "third");
        while(div.firstChild){
            div.removeChild(div.firstChild);
        }
      }
      else if(order = "Latest"){
        s2 = sectionArray
        while(div.firstChild){
            div.removeChild(div.firstChild);
        }
    }
      
    for (var i = 0; i <s2.length; i++) {

        div.append(s2[i])
       
        document.body.append(div)

      }
}

function sortByProperty(array, propertyName) {
    return array.sort(function (a, b) {
        return b.querySelector("."+propertyName).textContent.toLowerCase() - a.querySelector("."+propertyName).textContent.toLowerCase();
    });
}

function compareAlpha(a,b) {
        
    let a1 = a.querySelector("h2").textContent.toLowerCase()

    let b1 = b.querySelector("h2").textContent.toLowerCase()
    
    
    if (a1 < b1){
        return -1;
    }
    if (a1 > b1){
        return 1;
    }
    return 0;
}
function overallSection(form, data, section,anArray) {
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
    anArray.push(section)
}

function reaction(data, section) {
    const reactionForm = document.createElement("form");
    reactionForm.setAttribute("class", "reactions");
    reactionForm.setAttribute("name", data.id)

    const emoji1 = createEmoji(data, "👍", "like", "happy")
    const emoji2 = createEmoji(data, "👎", "dislike", "sad")
    const emoji3 = createEmoji(data, "😃", "happy", "third")
    
    reactionForm.append(emoji1)
    reactionForm.append(emoji2)
    reactionForm.append(emoji3)
    
    section.append(reactionForm)
    reactionForm.addEventListener('submit', reactionCreation)
}

function createEmoji(data, symbol, name, id) {
    const emojidiv = document.createElement("div");
    const emoji = document.createElement("input");
    const emojiLabel = document.createElement("label");
    emojidiv.setAttribute("class", `emoji-div ${id}-div unselected`)
    emoji.value = symbol;
    emoji.setAttribute("name", name);
    emoji.setAttribute("type", "submit")
    emojiLabel.setAttribute("for", name);
    emojiLabel.setAttribute("class", id)
    emojiLabel.textContent = `${data.reaction[name]}`;

    emojidiv.append(emojiLabel);
    emojidiv.append(emoji)

    return emojidiv;
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
    input.setAttribute("value", "\uf1d8")
    input.setAttribute("class", "fa button send-comment")

    form.append(comments);
    form.append(input)
    section.append(form);

    const commentWrapper = document.createElement("section");
    commentWrapper.setAttribute("class", "comment-section hidden")
    commentWrapper.setAttribute("name", data.id)
    
    const toggleComments = document.createElement("button");
    toggleComments.textContent = "Show/Hide Comments"
    toggleComments.setAttribute("class", "button grey-button")
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

if (document.querySelector("#jokes")){
    sortBy.addEventListener('change', (event) => {
        if(event.target.value == "alphabetical"){
            getAllPosts("alphabetical")
        }
        else if(event.target.value == "likes"){
            getAllPosts("likes")
        }
        else if (event.target.value == "dislikes"){
            getAllPosts("dislikes")
        }
        else if (event.target.value == "third"){
            getAllPosts("third")
        } 
        else{
            getAllPosts("latest")
        }
        
      });
}

module.exports = {getAllPosts, overallSection, reaction, commentSection,compareAlpha,sortByProperty}

