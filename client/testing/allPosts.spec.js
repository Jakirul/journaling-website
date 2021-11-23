/**
* @jest-environment jsdom
*/

const fs = require('fs');
const path = require('path');
const html = fs.readFileSync(path.resolve(__dirname, '../jokes.html'), 'utf8');

global.fetch = require('jest-fetch-mock');
let app;

describe('allPosts', () => {
    const testJoke = {
        "id": "100",
        "title": "Test Joke",
        "description": "Test Punchline",
        "gif": "https://media0.giphy.com/media/9tx0gy37p7oXu/200.gif?cid=474c6cfdc4zzdswhwayf9kpva51xvzuvxhfg1h8ewn82luox&rid=200.gif&ct=g",
        "date": "Tue, 23 Nov 2021 10:55:37 GMT",
        "reaction": {
            "like": 1,
            "dislike": 2,
            "happy": 3
        },
        "comment": [
            "Test comment"
        ]
    }

    beforeEach(() => {
        document.documentElement.innerHTML = html.toString();
        app = require('../js/allPosts.js')
    })

    afterEach(() => {
        fetch.resetMocks();
    })

    describe("getAllPosts", () => {
        it("fetches all the data", () => {
            app.getAllPosts("likes")
            expect(fetch).toHaveBeenCalledWith('http://localhost:3000/')
        })

        describe("overallSection", () => {
            beforeEach(() => {
                const section = document.createElement("section")
                const form = document.createElement("form")
                let sectionArray = []
                app.overallSection(form, testJoke, section, sectionArray)
                document.body.append(section)
            })

            it("has a set up, date and punchline button on the page", () => {
                expect(document.querySelector('section').textContent).toContain("Test Joke");
                expect(document.querySelector('section').textContent).toContain("23 Nov 2021 10:55");
                expect(document.querySelector('section button')).toBeTruthy();
            })

            it("does not initially display punchline or image", () => {
                expect(document.querySelector('section h3').textContent).toBeFalsy();
                expect(document.querySelector('section img').src).toBeFalsy();
            })
        })

        describe("reaction", () => {
            beforeEach(() => {
                const section = document.createElement("section")
                app.reaction(testJoke, section)
                document.body.append(section)
            })

            it("adds appropriate reactions", () => {
                expect(document.querySelector(".reactions").children.length).toEqual(6)
                expect(document.querySelector(".reactions label[for='like']").textContent).toEqual("1")
                expect(document.querySelector(".reactions label[for='dislike']").textContent).toEqual("2")
                expect(document.querySelector(".reactions label[for='happy']").textContent).toEqual("3")

            })
        })

        describe("commentSection", () => {
            beforeEach(() => {
                const section = document.createElement("section")
                const form = document.createElement("form")
                app.commentSection(form, testJoke, section);
                document.body.append(section)
            })

            it("creates an add comment field", () => {
                expect(document.querySelector(".comment_input").tagName).toEqual("INPUT")
                expect(document.querySelector(".comment_input").placeholder).toEqual("Add a comment")
            })

            it("has a show/hide comments button", () => {
                expect(document.querySelector("section button")).toBeTruthy();
            })

            it("displays a message if there are no comments", () => {
                const testJokeNoComments = {
                    "id": "100",
                    "title": "Test Joke",
                    "description": "Test Punchline",
                    "gif": "https://media0.giphy.com/media/9tx0gy37p7oXu/200.gif?cid=474c6cfdc4zzdswhwayf9kpva51xvzuvxhfg1h8ewn82luox&rid=200.gif&ct=g",
                    "date": "Tue, 23 Nov 2021 10:55:37 GMT",
                    "reaction": {
                        "like": 1,
                        "dislike": 2,
                        "happy": 3
                    },
                    "comment": []
                }
                const section = document.createElement("section")
                const form = document.createElement("form")
                app.commentSection(form, testJokeNoComments, section);
                document.body.append(section)

                expect(document.querySelector(".comment-section h4")).toBeTruthy()
                expect(document.querySelector(".comment-section h4").textContent).toEqual("No comments yet!")

            })
        })
    })
})