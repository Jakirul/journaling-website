// const api_url = "https://lap1-jokesapp.herokuapp.com/"

async function commentCreation(e) {
    e.preventDefault();
    
    const comment = e.target[0].value && e.target[0].value.trim()
    let id = e.target.name;
    if (comment && comment.length > 0) {
        if (document.querySelector(`.comment-form[name="${id}"] .emptyComm`)) {
            document.querySelector(`.comment-form[name="${id}"] .emptyComm`).remove()
        }

        if (document.querySelector(`.comment-section[name="${id}"] h4`)) {
            document.querySelector(`.comment-section[name="${id}"] h4`).remove()
        }

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
        e.target[0].value = ""

        if (document.querySelector(`.no-comment[name="${id}"] .emptyComm`)) {
            document.querySelector(`.no-comment[name="${id}"] .emptyComm`).remove()
        }
        
    } else {
        const inputField = document.querySelector(`.comment-form[name="${id}"] > input[name="comment"]`);
        const pCounts = document.querySelectorAll(`.no-comment[name="${id}"] p`);
        const pDiv = document.querySelector(`.no-comment[name="${id}"]`)
       
        const p = document.createElement("p");
        if (inputField && inputField.textContent.length == 0) {
            if (pCounts.length < 1) {
                p.textContent = "Empty comments are not allowed - please try again!"
                p.setAttribute("class", "emptyComm")
                pDiv.appendChild(p)
                e.target[0].value = ""
            } 
            else {
                e.target[0].value = ""
            }
        }       
    }
};



async function reactionCreation(e) {
    e.preventDefault();
    let id = e.target.name;
    const like = document.querySelector(`.reactions[name="${id}"] > .happy-div > input:focus`)
    const likeLabel = document.querySelector(`.reactions[name="${id}"] > .happy-div > label`)
    const likeDiv = document.querySelector(`.reactions[name="${id}"] > .happy-div`)

    const dislike = document.querySelector(`.reactions[name="${id}"] > .sad-div > input:focus`)
    const dislikeLabel = document.querySelector(`.reactions[name="${id}"] > .sad-div > label`)
    const dislikeDiv = document.querySelector(`.reactions[name="${id}"] > .sad-div`)

    const happy = document.querySelector(`.reactions[name="${id}"] > .third-div > input:focus`)
    const happyLabel = document.querySelector(`.reactions[name="${id}"] > .third-div > label`)
    const happyDiv = document.querySelector(`.reactions[name="${id}"] > .third-div`)

    const allDivClasses = likeDiv && likeDiv.classList.value.split(" ").concat( dislikeDiv && dislikeDiv.classList.value.split(" "), happyDiv && happyDiv.classList.value.split(" "))
    
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

    const options = {
        method: "PUT",
        headers: { 'Content-Type': 'application/json' },
    }
   
    if (allDivClasses && !allDivClasses.includes("selected")) {
        fetch(`http://localhost:3000/reaction/${currReaction}/${id}/1`, options)
            .then(data => {
                currLabel.innerText = `${parseInt(currLabelText) + 1}`
                currDiv.classList.remove("unselected")
                currDiv.classList.add("selected")
                otherDivs[0].classList.add("not-chosen")
                otherDivs[1].classList.add("not-chosen")
            })
            .catch(err => console.log(err))
    } else if (currDivClasses && currDivClasses.includes("selected")) {
        fetch(`http://localhost:3000/reaction/${currReaction}/${id}/0`, options)
            .then(data => {
                currLabel.innerText = `${parseInt(currLabelText) - 1}`
                currDiv.classList.remove("selected")
                currDiv.classList.add("unselected")
                otherDivs[0].classList.remove("not-chosen")
                otherDivs[1].classList.remove("not-chosen")
            })
            .catch(err => console.log(err))
    }
            
}

module.exports = {commentCreation, reactionCreation}