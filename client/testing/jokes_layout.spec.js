/**
* @jest-environment jsdom
*/

const { expect } = require("@jest/globals");
const fs = require("fs");
const path = require("path");
const html = fs.readFileSync(path.resolve(__dirname, "../jokes.html"), "utf8");

describe("index.html", () => {
    beforeEach(() => {
        document.documentElement.innerHTML = html.toString();
    })
    
    describe('head', () => {
        it('has a title', () => {
            const title = document.querySelector('head title');
            expect(title).toBeTruthy();
            expect(title.textContent).toBe("Jokes List")
        })
    })

    
    describe("body", () => {
        describe('header', () => {
            let header;
            let nav, heading;

            beforeEach(() => {
                header = document.querySelector("header");
                nav = header.querySelector("nav");
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

                it("links to the home page", () => {
                    expect(nav.children[0].href).toEqual("http://localhost/index.html")
                })
            })
        })

        it("has a space for the jokes to be added", () => {
            let div = document.querySelector("#jokes")
            expect(div).toBeTruthy();
        })

    })
})