// const api_url = "https://lap1-jokesapp.herokuapp.com/"

async function commentCreation(e) {
    e.preventDefault();
    const comment = e.target[0].value && e.target[0].value.trim()
    let id = e.target.name;
    if (comment && comment.length > 0) {
        postComment(comment, id)
        if (document.querySelector(`.no-comment[name="${id}"] .emptyComm`)) {
            document.querySelector(`.no-comment[name="${id}"] .emptyComm`).remove()
        }
    } else {
        askForComment(id)
    }
    e.target[0].value = ""
};

async function postComment(comment, id) {
    const options = {
        method: "PUT",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ "comment": comment })
    }

    fetch(`http://localhost:3000/comment/${id}`, options)
        .then(data => {
            let commSec = document.querySelector(`.comment-section[name="${id}"]`);
            let p = document.createElement("p");
            p.textContent = comment;
            commSec.append(p)

        })
        .catch(error => console.log(error))
}

function askForComment(id) {
    const inputField = document.querySelector(`.comment-form[name="${id}"] > input[name="comment"]`);
    const pCounts = document.querySelectorAll(`.no-comment[name="${id}"] p`);
    const pDiv = document.querySelector(`.no-comment[name="${id}"]`)
    
    const p = document.createElement("p");
    if (inputField && inputField.textContent.length == 0) {
        if (pCounts.length < 1) {
            p.textContent = "Empty comments are not allowed - please try again!"
            p.setAttribute("class", "emptyComm")
            pDiv.appendChild(p)
        } 
    } 
}

async function reactionCreation(e) {
    e.preventDefault();
    let id = e.target.name;
    const like = document.querySelector(`.reactions[name="${id}"] > .happy-div > input:focus`)
    const likeLabel = document.querySelector(`.reactions[name="${id}"] > .happy-div > label`)
    const likeDiv = document.querySelector(`.reactions[name="${id}"] > .happy-div`)
    const likeDivClasses = likeDiv && likeDiv.classList.value.split(" ")

    const dislike = document.querySelector(`.reactions[name="${id}"] > .sad-div > input:focus`)
    const dislikeLabel = document.querySelector(`.reactions[name="${id}"] > .sad-div > label`)
    const dislikeDiv = document.querySelector(`.reactions[name="${id}"] > .sad-div`)
    const dislikeDivClasses = dislikeDiv && dislikeDiv.classList.value.split(" ");

    const happy = document.querySelector(`.reactions[name="${id}"] > .third-div > input:focus`)
    const happyLabel = document.querySelector(`.reactions[name="${id}"] > .third-div > label`)
    const happyDiv = document.querySelector(`.reactions[name="${id}"] > .third-div`)
    const happyDivClasses = happyDiv && happyDiv.classList.value.split(" ")

    const allDivClasses = likeDiv && likeDivClasses.concat( dislikeDiv && dislikeDivClasses, happyDiv && happyDivClasses )

    let currReaction, currLabelText, currLabel, currDiv, otherDivs;
    if (like) {
        currLabel = likeLabel;
        currLabelText = likeLabel.textContent;
        currReaction = like.name;
        currDiv = likeDiv
        otherDivs = [dislikeDiv, happyDiv]
    }
    if (dislike) {
        currLabel = dislikeLabel;
        currLabelText = dislikeLabel.textContent;
        currReaction = dislike.name;
        currDiv = dislikeDiv
        otherDivs = [likeDiv, happyDiv]
    }
    if (happy) {
        currLabel = happyLabel;
        currLabelText = happyLabel.textContent;
        currReaction = happy.name;
        currDiv = happyDiv
        otherDivs = [likeDiv, dislikeDiv]
    }

    let currDivClasses = currDiv && currDiv.classList.value.split(" ")
   
    if (allDivClasses && !allDivClasses.includes("selected")) {
        selectReaction(currReaction, id, currLabel, currDiv, otherDivs, currLabelText);
    } else if (currDivClasses && currDivClasses.includes("selected")) {
        unselectReaction(currReaction, id, currLabel, currDiv, otherDivs, currLabelText);
    }
}

function selectReaction(reaction, id, label, div, otherDivs, labelText) {
    const options = {
        method: "PUT",
        headers: { 'Content-Type': 'application/json' },
    }
    fetch(`http://localhost:3000/reaction/${reaction}/${id}/1`, options)
            .then(data => {
                label.innerText = `${parseInt(labelText) + 1}`
                div.classList.remove("unselected")
                div.classList.add("selected")
                otherDivs[0].classList.add("not-chosen")
                otherDivs[1].classList.add("not-chosen")
            })
            .catch(err => console.log(err))
}

function unselectReaction(reaction, id, label, div, otherDivs, labelText) {
    const options = {
        method: "PUT",
        headers: { 'Content-Type': 'application/json' },
    }
    fetch(`http://localhost:3000/reaction/${reaction}/${id}/0`, options)
            .then(data => {
                label.innerText = `${parseInt(labelText) - 1}`
                div.classList.remove("selected")
                div.classList.add("unselected")
                otherDivs[0].classList.remove("not-chosen")
                otherDivs[1].classList.remove("not-chosen")
            })
            .catch(err => console.log(err))
}

module.exports = {commentCreation,postComment, askForComment, reactionCreation, selectReaction, unselectReaction}