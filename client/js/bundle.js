(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){

const {commentCreation, reactionCreation} = require('./creation')

async function getAllPosts(order) {
    sectionArray = []
    try {    
        const getPost = await fetch('http://localhost:3000/')
        const res = await getPost.json();
        
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
        showPunchline(data, h3, img, button)
        commentSection(form, data, section)
    })

    section.append(h2);
    section.append(button)
    section.append(h3);
    section.append(img);
    section.append(h5);
    anArray.push(section)
}

function showPunchline(data, punchline, gif, button) {
    punchline.textContent = `${data.description}`;
    punchline.style.fontWeight = "normal";
    gif.src = data.gif;
    button.style.display = "none";
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
    emojidiv.setAttribute("class", `emoji-div ${id}-div unselected`)

    const emoji = document.createElement("input");
    emoji.value = symbol;
    emoji.setAttribute("name", name);
    emoji.setAttribute("type", "submit")

    const emojiLabel = document.createElement("label");
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
    comments.setAttribute("placeholder", "Add a comment")

    let input = document.createElement("input");
    input.setAttribute("type", "submit")
    input.setAttribute("value", "\uf1d8")
    input.setAttribute("class", "fa button send-comment")

    let noComm = document.createElement("div")
    noComm.setAttribute("class", "no-comment")
    noComm.setAttribute("name", data.id)

    form.append(comments);
    form.append(input)
    section.append(form);
    section.append(noComm)

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

module.exports = {getAllPosts, overallSection, reaction, commentSection,compareAlpha,sortByProperty}


},{"./creation":3}],2:[function(require,module,exports){
const {submitForm} = require('./formSubmission')
const {getAllPosts} = require('./allPosts.js')
const {gifForm} = require('./gifFunctionality')


if (document.querySelector(".outer-form")) {
    const form = document.querySelector('.outer-form');
    const addGif = document.querySelector('#addGif')
    form.addEventListener('submit', submitForm)
    addGif.addEventListener('click', gifForm)
}

if (document.querySelector("#jokes")) {
    getAllPosts("latest")
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









},{"./allPosts.js":1,"./formSubmission":4,"./gifFunctionality":5}],3:[function(require,module,exports){
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
            document.querySelector(`.comment-section[name="${id}"] > h4`).remove()
   
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

module.exports = {commentCreation, reactionCreation}
},{}],4:[function(require,module,exports){
const api_url = "https://lap1-jokesapp.herokuapp.com/"

async function submitForm(e) {

	e.preventDefault();

	const gif = document.querySelector("#one_gif img");
	const title = document.querySelector(".title");
	const description = document.querySelector(".description");
	const titleWarning = document.querySelector(".title-warning");
	const descriptionWarning = document.querySelector(".description-warning");
	// If the user opts not to use gifs, append an empty string, else, use the source of the image
	const gif_data = gif !== null ? gif.src : "";
	if (titleWarning) {
		titleWarning.textContent = "";
	}

	if (descriptionWarning) {
		descriptionWarning.textContent = "";
	}
	if (title && title.value.trim().length > 0 && description && description.value.trim().length > 0) {
		const data = {
			title: title.value.trim(),
			description: description.value.trim(),
			gif: gif_data
		};
		let options = {
			method: "POST",
			body: JSON.stringify(data),
			headers: { "Content-type": "application/json" },
		};

		// fetch(`${api_url}`, options)
		fetch('http://localhost:3000/', options)
			.then(data => console.log(data))
			.catch(err => console.log(err))
			.then(() => {
				window.location.href = "./jokes.html";
			});
	} else if (title && title.value.trim().length === 0 && description && description.value.trim().length > 0) {
		titleWarning.classList.remove("hidden2");
		descriptionWarning.classList.add("hidden3");
		titleWarning.textContent = "Please enter a joke!";
	} else if (title && title.value.trim().length > 0 && description && description.value.trim().length === 0) {
		descriptionWarning.classList.remove("hidden3");
		titleWarning.classList.add("hidden2");
		descriptionWarning.textContent = "Please give your joke a punchline!";
	} else if (title && title.value.trim().length === 0 && description && description.value.trim().length === 0) {
		titleWarning.classList.remove("hidden2");
		descriptionWarning.classList.remove("hidden3");
		titleWarning.textContent = "Please enter a joke!";
		descriptionWarning.textContent = "Please give your joke a punchline!";
	}
}

module.exports = { submitForm };

},{}],5:[function(require,module,exports){
const form = document.querySelector(".outer-form");

function gifSelection(e) {
	const form = document.querySelector(".outer-form");
	let gif = document.querySelector("#one_gif");
	gif.textContent = "";
	let gifImg = document.createElement("img");
	gifImg.setAttribute("name", "gif");
	gifImg.setAttribute("src", e.target.src);

	let gifDeletion = document.createElement("input");
	gifDeletion.setAttribute("type", "button");
	gifDeletion.setAttribute("value", "Remove Gif");
	gifDeletion.setAttribute("class", "button red-button")

	gifDeletion.addEventListener("click", () => {
		gif.textContent = "";
	});

	gif.append(gifImg);
	gif.append(gifDeletion);
	document.querySelector(".gifSearchForm").remove();
}

function gifForm(e) {
	e.preventDefault();
	const form = document.querySelector(".outer-form");
	const gifSearchForm = document.querySelector(".gifSearchForm");

	if (gifSearchForm) {
		gifSearchForm.remove();
	} else {
		// Because you can't nest forms, i had to use this method of creating it in javascript
		let newForm = document.createElement("form");
		newForm.setAttribute("class", "gifSearchForm");

		// this is the search bar to search for gifs
		let gif_search = document.createElement("input");
		gif_search.setAttribute("class", "gif_search");
		gif_search.setAttribute("placeholder", "Search giphy");

		// this is the submit button to search for gifs
		let gif_btn = document.createElement("input");
		gif_btn.setAttribute("type", "submit");
		gif_btn.setAttribute("value", "Search");
		gif_btn.setAttribute("class", "search_bar grey-button button");

		// This is the list of gifs that gets returned into a new 'section'
		let gif_list = document.createElement("section");
		gif_list.setAttribute("class", "gif-list");

		newForm.append(gif_search);
		newForm.append(gif_btn);
		newForm.append(gif_list);
		form.append(newForm);

		const search = document.querySelector(".search_bar");
		search.addEventListener("click", gifSearch);
	}
}

async function gifSearch(e) {
	e.preventDefault();

	let search = document.querySelector(".gif_search").value;

	// API function below
	let data = await api(search);
	const gif_list = document.querySelector(".gif-list");

	if (data.data.length > 0) {
		// If I dont keep this in, the other searches will stack. not ideal
		gif_list.textContent = "";

		data.data.forEach(gif => {
			let img = document.createElement("img");
			img.setAttribute("src", gif.images.fixed_height.url);
			gif_list.append(img);
			img.addEventListener("click", gifSelection);
		});
	} else {
		const p = document.createElement("p");
		p.textContent = `No gifs found for "${search}"!`;
		p.style.overflow = "hidden";
		p.style.textOverflow = "ellipsis";
		gif_list.textContent = "";
		gif_list.append(p);
	}
}

async function api(search) {
	// My api key and limit. limit is set to '5' so only 5 results show
	const giphy_api = "zKQx1K0AwGT2RnboMBzbnHfZpLetPU8K";
	const limit = 5;
	let response = await fetch(
		`https://api.giphy.com/v1/gifs/search?q=${search}&limit=${limit}&api_key=${giphy_api}`
	);
	let data = await response.json();
	return data;
}

module.exports = { gifSelection, gifForm, api };
},{}]},{},[2]);
