/**
* @jest-environment jsdom
*/

const fs = require('fs');
const path = require('path');
const { compareAlpha } = require('../js/gifFunctionality.js');
const html = fs.readFileSync(path.resolve(__dirname, '../new_joke.html'), 'utf8');

global.fetch = require('jest-fetch-mock');
let app;

describe('gifFunctionality', () => {

    beforeEach(() => {
        document.documentElement.innerHTML = html.toString();
        app = require('../js/gifFunctionality.js')
    })

    afterEach(() => {
        fetch.resetMocks();
    })

    describe("gifSelection", () => {
        const form = document.createElement("form")
        form.id = ".outer-form"
        it("creates an img and a remove gif button", () => {
            const gifForm = document.createElement("form")
            gifForm.classList.add("gifSearchForm")
            document.body.append(gifForm);
            const gif = document.createElement("span")
            gif.id = "one_gif"
            const img = document.createElement("img")
            img.addEventListener("click", app.gifSelection)
            img.click()

            expect(document.querySelector("[name='gif']")).toBeTruthy();
            expect(document.querySelector("[value='Remove Gif']")).toBeTruthy();
        })
    })

    describe("gifForm", () => {
        const form = document.createElement("form")
        form.id = ".outer-form"
        it("removes the search form if it exists", () => {
            const gifForm = document.createElement("form")
            gifForm.classList.add("gifSearchForm")
            document.body.append(gifForm);
            let gifSearchButton = document.createElement("button")
            gifSearchButton.addEventListener("click", app.gifForm)
            gifSearchButton.click()

            expect(document.querySelector(".gifSearchForm")).toBeFalsy();
        })

        it("creates a new form with the right elements", () => {
            let gifSearchButton = document.createElement("button")
            gifSearchButton.addEventListener("click", app.gifForm)
            gifSearchButton.click()

            expect(document.querySelector(".gifSearchForm")).toBeTruthy();
            expect(document.querySelector(".gif_search")).toBeTruthy();
            expect(document.querySelector(".search_bar")).toBeTruthy();
            expect(document.querySelector(".gif-list")).toBeTruthy();
        })
    })

    // describe("gifSearch", () => {
        

    //     it("displays images", () => {
    //         const searchBar = document.createElement("input");
	// 	    searchBar.setAttribute("class", "gif_search");
    //         searchBar.textContent = "cat"

    //         const gifList = document.createElement("section");
	// 	    gifList.setAttribute("class", "gif-list");
    //         document.body.append(gifList);

    //         const searchButton = document.createElement("button")
    //         searchButton.addEventListener("click", app.gifSearch);
    //         searchButton.click();
    //         // let gif_list = document.querySelector(".gif-list")

    //         expect(document.querySelector(".gif-list").children.length).toEqual(5);
    //     })

    //     it("displays a no gifs found paragraph")
    // })

    describe("api search function", () => {
        it("fetches from giphy", () => {
            app.api("cat")
            expect(fetch).toHaveBeenCalledWith('https://api.giphy.com/v1/gifs/search?q=cat&limit=5&api_key=zKQx1K0AwGT2RnboMBzbnHfZpLetPU8K')
        })
    })
})