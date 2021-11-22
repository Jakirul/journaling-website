async function submitForm(e) {
    e.preventDefault()

    const gif = document.querySelector("#one_gif img")
    const title = document.querySelector(".title");
    const description = document.querySelector(".description");
    const titleWarning = document.querySelector(".title-warning");
    const descriptionWarning = document.querySelector(".description-warning");
    // If the user opts not to use gifs, append an empty string, else, use the source of the image
    const gif_data = gif !== null ? gif.src : ""
    titleWarning.textContent = ""
    descriptionWarning.textContent = ""

    if (title.value.trim().length > 0 && description.value.trim().length > 0) {
        const data = {
            title: title.value.trim(),
            description: description.value.trim(),
            gif: gif_data,
    
        }
        let options = {
            method: "POST",
            body: JSON.stringify(data),
            headers: { "Content-type": "application/json" }
        }
    
        fetch(`http://localhost:3000/`, options)
            .then(data => console.log(data))
            .catch(err => console.log(err))
            .then(() => {
                window.location.href = "./jokes.html"
            }) 
    } else if (title.value.trim().length === 0 && description.value.trim().length > 0) {
        titleWarning.classList.remove("hidden2")
        descriptionWarning.classList.add("hidden3")
        titleWarning.textContent = "Please enter a title!"
  
    } else if (title.value.trim().length > 0 && description.value.trim().length === 0) {
        descriptionWarning.classList.remove("hidden3")
        titleWarning.classList.add("hidden2")
        descriptionWarning.textContent = "Please enter a description!"

    } else if (title.value.trim().length === 0 && description.value.trim().length === 0) {
        titleWarning.classList.remove("hidden2")
        descriptionWarning.classList.remove("hidden3")
        titleWarning.textContent = "Please enter a title!"
        descriptionWarning.textContent = "Please enter a description!"
    }
    

}

module.exports = {submitForm}