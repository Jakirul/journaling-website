// const api_url = "https://lap1-jokesapp.herokuapp.com/"

async function commentCreation(e) {
    e.preventDefault();
    const comment = e.target[0].value.trim()
    let id = e.target.name;
    if (comment.length > 0) {
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
    } else {
        
        const form = document.querySelector(`.comment-form[name="${id}"]`);
        const inputField = document.querySelector(`.comment-form[name="${id}"] > input[name="comment"]`);
        const pForm = document.querySelectorAll(`.comment-form[name="${id}"] p`);
       
        
        const p = document.createElement("p");
        if (inputField.textContent.length == 0) {
            if (pForm.length < 1) {
                p.textContent = "Empty comments are not allowed - please try again!"
                p.setAttribute("class", "emptyComm")
                form.append(p)
            }  else {
                document.querySelector(`.comment-form[name="${id}"] .emptyComm`).remove()
            }
        }       
       
    }
    
};



async function reactionCreation(e) {
    e.preventDefault();
    const like = document.querySelector(`.reactions[name="${e.target.name}"] > .happy-div > input:focus`)
    const likeLabel = document.querySelector(`.reactions[name="${e.target.name}"] > .happy-div > label`)

    const dislike = document.querySelector(`.reactions[name="${e.target.name}"] > .sad-div > input:focus`)
    const dislikeLabel = document.querySelector(`.reactions[name="${e.target.name}"] > .sad-div > label`)

    const happy = document.querySelector(`.reactions[name="${e.target.name}"] > .third-div > input:focus`)
    const happyLabel = document.querySelector(`.reactions[name="${e.target.name}"] > .third-div > label`)

    // const like = document.querySelector("#happy-div input:focus")
    // const likeLabel = document.querySelector("#happy")

    // const dislike = document.querySelector("#sad-div input:focus")
    // const dislikeLabel = document.querySelector("#sad")

    // const happy = document.querySelector("#third-div input:focus")
    // const happyLabel = document.querySelector("#third")

    let id = e.target.name;
    
    let currReaction;
    let currLabelText;
    let currLabel;
    if (like) {
        currLabel = likeLabel;
        currLabelText = likeLabel.textContent;
        currReaction = like.name;
    }
    if (dislike) {
        currLabel = dislikeLabel;
        currLabelText = dislikeLabel.textContent;
        currReaction = dislike.name;
    }
    if (happy) {
        currLabel = happyLabel;
        currLabelText = happyLabel.textContent;
        currReaction = happy.name;
    }
    const options = {
        method: "PUT",
        headers: { 'Content-Type': 'application/json' },
    }
        fetch(`http://localhost:3000/reaction/${currReaction}/${id}`, options)
            .then(data => {
                currLabel.innerText = `${parseInt(currLabelText) + 1}`
            })
            .catch(err => console.log(err))
    
}

module.exports = {commentCreation, reactionCreation}