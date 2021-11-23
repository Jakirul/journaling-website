(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
const {commentCreation, reactionCreation} = require('./creation')

async function getAllPosts(order) {
    const getPost = await fetch('http://localhost:3000/')
    const res = await getPost.json();
    sectionArray = []
    res.forEach(data => {
        
        const section = document.createElement("section");
       
        let form = document.createElement("form");

        overallSection(form, data, section,sectionArray)
        
        reaction(data, section)
        
        const div = document.querySelector("#jokes")
        console.log(document.querySelector(".comment-form"))
        form.addEventListener('submit', commentCreation)
       
    })

    for (var i = 0; i <sectionArray.length; i++) {
        console.log('unordered: ', sectionArray[i].querySelector("#happy").textContent+"KKKK");

      }
      const div = document.querySelector("#jokes")
      let s2 = sectionArray;
      console.log(order)
      if (order == "alphabetical"){
          s2 = sectionArray.sort(compareAlpha)
          console.log("ALPHA")
          div.innerHTML = ""
      }
      else if (order=="likes"){
        s2 = sortByProperty(sectionArray, "happy")
        console.log("IT WORKS")
        div.innerHTML = ""
      } 
      else if(order == "dislikes"){
        s2 = sortByProperty(sectionArray, "sad");
        console.log("Sad:((")
        div.innerHTML = ""
      }
      else if (order == "third"){
        s2 = sortByProperty(sectionArray, "third");
        console.log("Third")
        div.innerHTML = ""
      }
      else if(order = "Latest"){
        s2 = sectionArray
        console.log("Latest")
        div.innerHTML= ""
    }
      
    for (var i = 0; i <s2.length; i++) {

        div.append(s2[i])
       
        document.body.append(div)
    
        console.log('ordered: ', s2[i]);
      }
}

function sortByProperty(array, propertyName) {
    return array.sort(function (a, b) {
        return b.querySelector("#"+propertyName).textContent - a.querySelector("#"+propertyName).textContent;
    });
}

// function compareByLikes(a,b) {
        
//     let a1 = parseInt(a.querySelector("#happy").textContent)

//     let b1 = parseInt(b.querySelector("#happy").textContent)
    
    
//     if (a1 > b1){
//         return -1;}
//     else if (a1< b1){
//         return 1;}
//     else{return 0;}
// }
function compareAlpha(a,b) {
        
    let a1 = a.querySelector("h2").textContent.toLowerCase()

    let b1 = b.querySelector("h2").textContent.toLowerCase()
    
    
    if (a1 < b1)
    return -1;
    if (a1> b1)
    return 1;
    return 0;
}
async function overallSection(form, data, section,anArray) {
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

async function reaction(data, section) {
    const reactionForm = document.createElement("form");
    reactionForm.setAttribute("class", "reactions");
    reactionForm.setAttribute("name", data.id)

    const emoji1 = document.createElement("input");
    emoji1.value = "👍";
    const emoji1Label = document.createElement("label");
    emoji1Label.id = "happy"
    emoji1Label.setAttribute("for", `${data.reaction["like"]}`)
    emoji1Label.textContent = `${data.reaction["like"]}`

    const emoji2 = document.createElement("input");
    emoji2.value = "👎"
    const emoji2Label = document.createElement("label");
    emoji2Label.id = "sad"
    emoji2Label.setAttribute("for", `${data.reaction["dislike"]}`)
    emoji2Label.textContent = `${data.reaction["dislike"]}`

    const emoji3 = document.createElement("input");
    emoji3.value = "😃"
    const emoji3Label = document.createElement("label");
    emoji3Label.id = "third"
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
    comments.setAttribute("placeholder", "Add a comment")

    let input = document.createElement("input");
    input.setAttribute("type", "submit")
    input.setAttribute("class", "button green-button")

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

},{"./creation":3}],2:[function(require,module,exports){


const {submitForm} = require('./formSubmission')
const {getAllPosts} = require('./allPosts.js')
const {gifForm} = require('./gifFunctionality')


if (document.querySelector("form")) {
    const form = document.querySelector('.outer-form');
    const addGif = document.querySelector('#addGif')
    form.addEventListener('submit', submitForm)
    addGif.addEventListener('click', gifForm)
}

// Immediately shows all results in the home page
if (document.querySelector("#jokes")) {
    getAllPosts()
}









},{"./allPosts.js":1,"./formSubmission":4,"./gifFunctionality":5}],3:[function(require,module,exports){
// const api_url = "https://lap1-jokesapp.herokuapp.com/"

async function commentCreation(e) {
    e.preventDefault();
    const comment = e.target[0].value.trim()
    if (comment.length > 0) {
        let id = e.target.name;
        
        if (document.querySelector(".emptyComm")) {
            document.querySelector(".emptyComm").textContent = ""
        }
        
        const options = {
            method: "PUT",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ "comment": comment })
        }

        
        fetch(`http://localhost:3000/comment/${id}`, options)
            .then(data => {
                let commSec = document.querySelector(`.comment-section[name="${e.target.name}"]`);
                let p = document.createElement("p");
                p.textContent = comment;
                commSec.append(p)

            })
    } else {
        
        const form = document.querySelector(`.comment-form[name="${e.target.name}"]`);
        const inputField = document.querySelector(`.comment-form[name="${e.target.name}"] > input[name="comment"]`);
        const pForm = document.querySelectorAll(`.comment-form[name="${e.target.name}"] p`);
       
        
        const p = document.createElement("p");
        if (inputField.textContent.length == 0) {
            if (pForm.length < 1) {
                
                p.textContent = "Empty comments are not allowed - please try again!"
                p.setAttribute("class", "emptyComm")
                form.append(p)
            }  else {
                document.querySelector(`.emptyComm`).remove()
            }
        }       
       
    }
    
};



async function reactionCreation(e) {
    e.preventDefault();
    const like = document.querySelector(`.reactions[name="${e.target.name}"] > input:nth-of-type(1):focus`)
    const likeLabel = document.querySelector(`.reactions[name="${e.target.name}"]  > label:nth-of-type(1)`)

    const dislike = document.querySelector(`.reactions[name="${e.target.name}"] > input:nth-of-type(2):focus`)
    const dislikeLabel = document.querySelector(`.reactions[name="${e.target.name}"] > label:nth-of-type(2)`)

    const happy = document.querySelector(`.reactions[name="${e.target.name}"] > input:nth-of-type(3):focus`)
    const happyLabel = document.querySelector(`.reactions[name="${e.target.name}"] > label:nth-of-type(3)`)

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
	titleWarning.textContent = "";
	descriptionWarning.textContent = "";

	if (title.value.trim().length > 0 && description.value.trim().length > 0) {
		const data = {
			title: title.value.trim(),
			description: description.value.trim(),
			gif: gif_data
		};
		let options = {
			method: "POST",
			body: JSON.stringify(data),
			headers: { "Content-type": "application/json" }
		};

		// fetch(`${api_url}`, options)
		fetch('http://localhost:3000/', options)
			.then(data => console.log(data))
			.catch(err => console.log(err))
			.then(() => {
				window.location.href = "./jokes.html";
			});
	} else if (title.value.trim().length === 0 && description.value.trim().length > 0) {
		titleWarning.classList.remove("hidden2");
		descriptionWarning.classList.add("hidden3");
		titleWarning.textContent = "Please enter a joke!";
	} else if (title.value.trim().length > 0 && description.value.trim().length === 0) {
		descriptionWarning.classList.remove("hidden3");
		titleWarning.classList.add("hidden2");
		descriptionWarning.textContent = "Please give your joke a punchline!";
	} else if (title.value.trim().length === 0 && description.value.trim().length === 0) {
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
		search.addEventListener("click", async e => {
			e.preventDefault();

			let search = document.querySelector(".gif_search").value;

			// API function below
			let data = await api(search);

			if (data.data.length > 0) {
				const gif_list = document.querySelector(".gif-list");

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
		});
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

module.exports = { gifSelection, gifForm };

},{}]},{},[2]);
