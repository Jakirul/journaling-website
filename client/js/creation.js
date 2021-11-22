// const api_url = "https://lap1-jokesapp.herokuapp.com/"

async function commentCreation(e) {
    e.preventDefault();
    const comment = e.target[0].value.trim()

    if (comment.length > 0) {
        let id = e.target.name;
        // let commentInput = document.querySelector(`form[name="${e.target.name}"]`);
        const options = {
            method: "PUT",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ "comment": comment })
        }

        
        fetch(`http://localhost:3000/comment/${id}`, options)
        // fetch(`http://localhost:3000/comment/${id}`, options)
            .then(data => console.log(data))
            .catch(err => console.log(err))
            .then(() => window.location.reload())
    } else {
        const form = document.querySelector(".comment-form");
        const p = document.createElement("p");
        p.textContent = "Empty comments are not allowed - please try again!"
        form.append(p)
    }
    
};



async function reactionCreation(e) {
    e.preventDefault();
    const like = document.querySelector(".reactions > input:nth-of-type(1):focus")
    const dislike = document.querySelector(".reactions > input:nth-of-type(2):focus")
    const happy = document.querySelector(".reactions > input:nth-of-type(3):focus")
    
    let id = e.target.name;
    let currReaction;
    if (like) currReaction = like.name;
    if (dislike) currReaction = dislike.name;
    if (happy) currReaction = happy.name;
    

   
    const options = {
        method: "PUT",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ "reaction": currReaction })
    }
    fetch(`http://localhost:3000/reaction/${currReaction}/${id}`, options)
    // fetch(`${api_url}/reaction/${currReaction}/${id}`, options)

        .then(data => console.log(data))
        .then(() => location.reload())
        .catch(err => console.log(err))
}

module.exports = {commentCreation, reactionCreation}