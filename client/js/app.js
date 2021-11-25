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








