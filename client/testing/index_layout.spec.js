/**
* @jest-environment jsdom
*/

const { expect } = require("@jest/globals");
const fs = require("fs");
const path = require("path");
const html = fs.readFileSync(path.resolve(__dirname, "../new_joke.html"), "utf8");

describe("index.html", () => {
    beforeEach(() => {
        document.documentElement.innerHTML = html.toString();
    })
    
    describe('head', () => {
        it('has a title', () => {
            const title = document.querySelector('head title');
            expect(title).toBeTruthy();
            expect(title.textContent).toBe("Tell us a joke!")
        })
    })

    
    describe("body", () => {
        describe('header', () => {
            let header;
            let nav, heading;

            beforeEach(() => {
                header = document.querySelector("header");
                nav = document.querySelector("nav");
                heading = header.querySelector("h1");
            })

            it("exists", () => {
                expect(header).toBeTruthy();
            })

            it("has the right title", () => {
                expect(heading).toBeTruthy();
                expect(heading.textContent).toEqual("Tell us a Joke!");
            })
            describe("navigation bar", () => {
                it("exists and has two elements", () => {
                    expect(nav).toBeTruthy();
                    expect(nav.children.length).toEqual(2)
                })

                it("links to the jokes page", () => {
                    expect(nav.children[1].href).toEqual("http://localhost/jokes.html")
                })
            })
        })

        describe('form', () => {
            let form;
            let titleInput, descriptionInput, submitBtn, gifBtn;

            beforeEach(() => {
                form = document.querySelector('form')
                titleInput = form.querySelector('.title');
                descriptionInput = form.querySelector('.description')
                submitBtn = form.querySelector('.submit');
                gifBtn = form.querySelector("#addGif")
            })

            it("exists", () => {
                expect(form).toBeTruthy();
            })

            it("has a section for the joke set up", () => {
                expect(titleInput).toBeTruthy();
                expect(titleInput.tagName).toEqual("TEXTAREA")
            })

            //TEST THAT THEY HAVE CHARACTER LIMIT

            it("has a section for the joke punchline", () => {
                expect(titleInput).toBeTruthy();
                expect(titleInput.tagName).toEqual("TEXTAREA")
            })

            it("has a button to add gifs", () => {
                expect(gifBtn).toBeTruthy();
                expect(gifBtn.value).toEqual("Add a gif");
            })
        })
    })
})