const {commentCreation, reactionCreation} = require('./creation')


async function sortPosts(){
    console.log("herecd")
    const getPost = await fetch('http://localhost:3000/')
    const res = await getPost.json();
    
    res.forEach(data => {
        console.log(data.title+"LOLOLOLOL")
        
    })
}

async function getAllPosts() {
    const getPost = await fetch('http://localhost:3000/')
    const res = await getPost.json();
    
    let sectionArray = []
    res.forEach(data => {
        
        const section = document.createElement("section");
        
        overallSection(data, section,sectionArray)
        reaction(data, section)
        
        let form = document.createElement("form");
        commentSection(form, data, section)
        
        form.addEventListener('submit', commentCreation)
        
        
        const div = document.querySelector("#jokes")
        div.append(section)
       
        document.body.append(div)

       
    })
    function compare(a,b) {
        let a1 = a.querySelector("h2").textContent.toLowerCase()
        let b1 = b.querySelector("h2").textContent.toLowerCase()
        if (a1 < b1)
           return -1;
        if (a1> b1)
          return 1;
        return 0;
      }

    for (var i = 0; i <sectionArray.length; i++) {
        console.log('unordered: ', sectionArray[i]);
      }
    let s2 = sectionArray.sort(compare)
    const div = document.querySelector("#jokes")

    for (var i = 0; i <s2.length; i++) {
        div.append(s2[i])
       
        document.body.append(div)
    
        console.log('ordered: ', s2[i]);
      }

      sortPosts()

}



async function overallSection(data, section,anArray) {
    console.log(data)
    let h2 = document.createElement("h2");
    h2.textContent = `${data.title}`

    let h3 = document.createElement("h3");
    h3.textContent = `${data.description}`;
    h3.style.fontWeight = "normal"

    let h4 = document.createElement("h4");
    h4.textContent = `Author: ${data.author}`;

    let h5 = document.createElement("h5");
    h5.textContent = `Date: ${data.date}`;

    let img = document.createElement("img");
    img.src = data.gif

    section.append(h2);
    section.append(h3);
    section.append(h4);
    section.append(h5);
    section.append(img);
    anArray.push(section);
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

    data.comment.forEach(comment => {
        const comments1 = document.createElement("p");
        comments1.textContent = `${comment}`
        commentWrapper.append(comments1)
        section.append(commentWrapper)
    })

    
}

module.exports = {getAllPosts, overallSection, reaction, commentSection,sortPosts}