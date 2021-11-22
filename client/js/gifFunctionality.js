
const form = document.querySelector('.outer-form');

function gifSelection(e) {
    let gif = document.querySelector("#one_gif");
    gif.textContent = "";
    let gifImg = document.createElement('img')
    gifImg.setAttribute("name", "gif")
    gifImg.setAttribute('src', e.target.src)

    let gifDeletion = document.createElement("input");
    gifDeletion.setAttribute("type", "button");
    gifDeletion.setAttribute("value", "Remove Gif")

    gifDeletion.addEventListener('click', () => {
        gif.textContent = ""
    })

    gif.append(gifImg);
    gif.append(gifDeletion);
    document.querySelector('.gifSearchForm').remove();

}

function gifForm(e) {
    e.preventDefault();
    const gifSearchForm = document.querySelector(".gifSearchForm")
    
    if (gifSearchForm) {
        gifSearchForm.remove();
    }
    else {
        // Because you can't nest forms, i had to use this method of creating it in javascript 
        let newForm = document.createElement('form')
        newForm.setAttribute('class', 'gifSearchForm')

        // this is the search bar to search for gifs
        let gif_search = document.createElement("input");
        gif_search.setAttribute("class", "gif_search")
        gif_search.setAttribute("placeholder", "Gif search")
        
        // this is the submit button to search for gifs
        let gif_btn = document.createElement("input");
        gif_btn.setAttribute("type", "submit");
        gif_btn.setAttribute("value", "Search a gif!");
        gif_btn.setAttribute("class", "search_bar")

      
        // This is the list of gifs that gets returned into a new 'section'
        let gif_list = document.createElement('section');
        gif_list.setAttribute('class', 'gif-list');

        newForm.append(gif_search);
        newForm.append(gif_btn);
        newForm.append(gif_list)
        form.append(newForm);

        const search = document.querySelector(".search_bar")
        search.addEventListener('click', async(e) => {
            e.preventDefault()

            let search = document.querySelector('.gif_search').value;
            
            // API function below
            let data = await api(search)
            
            if (data.data.length > 0) {
                const gif_list = document.querySelector(".gif-list");

                // If I dont keep this in, the other searches will stack. not ideal
                gif_list.textContent = "";

                data.data.forEach(gif => {
                    let img = document.createElement("img");
                    img.setAttribute("src", gif.images.fixed_height.url)
                    gif_list.append(img)
                    img.addEventListener('click', gifSelection)

                })
            } else {
                const p = document.createElement("p");
                p.textContent = `No gifs found with the term "${search}"!`;
                p.style.overflow = "hidden";
                p.style.textOverflow = "ellipsis";
                gif_list.textContent = "";
                gif_list.append(p)
               
            }
        })
        
    }

}

async function api(search) {
    // My api key and limit. limit is set to '5' so only 5 results show
    const giphy_api = 'zKQx1K0AwGT2RnboMBzbnHfZpLetPU8K'
    const limit = 5
    let response = await fetch(`https://api.giphy.com/v1/gifs/search?q=${search}&limit=${limit}&api_key=${giphy_api}`)
    let data = await response.json();
    return data
}


module.exports = {gifSelection, gifForm}