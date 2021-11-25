/**
* @jest-environment jsdom
*/

const fs = require('fs');
const path = require('path');
const html = fs.readFileSync(path.resolve(__dirname, '../jokes.html'), 'utf8');
const {commentCreation, reactionCreation} = require('../js/creation.js')

global.fetch = require('jest-fetch-mock');
let app;

describe('allPosts', () => {
    

    beforeEach(() => {
        document.documentElement.innerHTML = html.toString();
        app = require('../js/creation.js')
    })

    afterEach(() => {
        fetch.resetMocks();
    })

    describe("commentCreation", () => {


        let comment;
        let evt;
        beforeEach(  () => {
            evt = {preventDefault: jest.fn(), target: [{value: "test"}]};

        })
        it("exists",  () => {
            
            comment = commentCreation(evt);
            expect(comment).toBeDefined()
        })

        it("posts", async () => {
            let evt = {preventDefault: jest.fn(), target: [{value: "test"}]}
            await app.commentCreation(evt);
            expect(fetch).toHaveBeenCalledTimes(1)
        })


    })

    describe("postComment", () => {
        it("links to the server", () => {
            const comment = "test comment";
            const id = 1;
            const options = {
                "method": "PUT",
                "headers": { 'Content-Type': 'application/json' },
                "body": JSON.stringify({ "comment": comment })
            }
            app.postComment(comment, id)
            expect(fetch).toHaveBeenCalledWith(`http://localhost:3000/comment/${id}`, options)
        })
    })

    describe("askForComment", () => {
        it("creates a paragraph element", () => {
            const id = "1"
            const pdiv = document.createElement("div")
            pdiv.setAttribute("class", "no-comment")
            pdiv.setAttribute("name", id)
            const inputParent = document.createElement("form")
            inputParent.setAttribute("class", "comment-form")
            inputParent.setAttribute("name", id)
            const inputChild = document.createElement("input")
            inputChild.setAttribute("name", "comment")
            inputParent.append(inputChild)
            document.body.append(inputParent)
            document.body.append(pdiv)

            app.askForComment(id)
            expect(pdiv.children.length).toEqual(1);
            expect(pdiv.children[0].textContent).toContain("Empty comments are not allowed - please try again!")
        })
    })

    describe("reactionCreation", () => {
        const testJoke = {
            "id": "1",
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
        let evt1;
        beforeEach(() => {
            evt1 =  { preventDefault: jest.fn(), target: {name: testJoke.id}}
            app = require('../js/creation.js')
           
            
        })

        
        it("exists", () => {
            expect(reactionCreation(evt1)).toBeTruthy();
        })
        it("Create reaction", async () => {
            const evt = { preventDefault: jest.fn(), target: {name: 1} }
           
            await reactionCreation(evt)
            expect(reactionCreation(evt)).toBeDefined()
        })
    })

    describe("selectReaction", () => {
        it("fetches the right path", () => {
            const reaction = "like"
            const id = 1
            const label = document.createElement("label")
            const div = document.createElement("div")
            const div2 = document.createElement("div")
            const div3 = document.createElement("div")
            const otherDivs = [div2, div3]
            const labelText = "1"
            const options = {
                "headers": { 'Content-Type': 'application/json' },
                "method": "PUT",
            }
            div.classList.add("unselected")
            app.selectReaction(reaction, id, label, div, otherDivs, labelText)
            expect(fetch).toHaveBeenCalledWith(`http://localhost:3000/reaction/${reaction}/${id}/1`, options)
        })
    })

    describe("unselectReaction", () => {
        it("fetches the right path", () => {
            const reaction = "like"
            const id = 1
            const label = document.createElement("label")
            const div = document.createElement("div")
            const div2 = document.createElement("div")
            const div3 = document.createElement("div")
            div.classList.add("selected")
            div2.classList.add("unselected")
            div3.classList.add("unselected")
            const otherDivs = [div2, div3]
            const labelText = "1"
            const options = {
                "headers": { 'Content-Type': 'application/json' },
                "method": "PUT",
            }

            app.unselectReaction(reaction, id, label, div, otherDivs, labelText)
            expect(fetch).toHaveBeenCalledWith(`http://localhost:3000/reaction/${reaction}/${id}/0`, options)
        })
    })
})

