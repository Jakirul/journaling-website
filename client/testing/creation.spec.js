/**
* @jest-environment jsdom
*/

const { expect } = require("@jest/globals");
const { commentCreation, reactionCreation } = require("../js/creation");
const { getAllPosts } = require("../js/allPosts")
let app;
let fullComment = 'Hello there, general kenobi'
let emptyComment = ' ';

let testData = [{
    title: "What do you call a fish wearing a bowtie?",
    description: "Sofishticated.",
    author: "Jakirul",
    gif: "https://media1.giphy.com/media/3ohs4iUIR6b14Hv9N6/200.gif?cid=474c6cfd2opmtx9o0svu9rngse7qpgdzkpb6sfpgqokwq66q&rid=200.gif&ct=g"
    
},
{
    title: "Why was the scarecrow promoted?",
    description: "Because he was outstanding in his field.",
    author: "Jakirul",
    gif: "https://media1.giphy.com/media/3ohs4iUIR6b14Hv9N6/200.gif?cid=474c6cfd2opmtx9o0svu9rngse7qpgdzkpb6sfpgqokwq66q&rid=200.gif&ct=g"
    
}]


const fs = require('fs');
const path = require('path');
const html = fs.readFileSync(path.resolve(__dirname, '../jokes.html'), 'utf8');

global.fetch = require('jest-fetch-mock');

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
        beforeEach(() => {
            evt = { preventDefault: jest.fn(), target: "value" };
            comment = commentCreation(evt)

        })
        it("exists", () => {
            expect(comment).toBeTruthy()
        })

    })

    describe("reactionCreation", () => {
        let reaction;
        beforeEach(() => {
            const evt = { preventDefault: jest.fn() }
            reaction = reactionCreation(evt)
            
        })
        it("exists", () => {
            expect(reaction).toBeTruthy();
        })

        it("Create reaction", async () => {
            const evt = { preventDefault: jest.fn(), target: [0, {name: '0'}] }
            
            await reactionCreation(evt)

            expect(reactionCreation(evt)).toBeDefined()
        })

    })
})



describe("creation.js", () => {
    beforeEach(()=>{
        document.documentElement.innerHTML = html.toString();
        app = require('../js/allPosts.js')
        app.getAllPosts("likes")

	});

    describe('comment creation',()=>
        it('it has a comment creating function', ()=>{
            expect(commentCreation(emptyComment)).toBeDefined()
            expect(typeof(commentCreation)).toBe('function')
        })
        )
        it('it rejects empty comments',()=>{
            commentCreation(emptyComment);
            const addEvnt = new Event('submit')
            let jokes = document.querySelector("#jokes")
            document.querySelector('.comment-form ').dispatchEvent(addEvnt)
            
            let para = document.getElementsByClassName('emptyComm')
            expect(para.textContent).toEqual("Empty comments are not allowed - please try again!")
        })
    })

describe('reaction creation',()=>{

    
    it('it lets you you add a reaction',()=>{
        expect(reactionCreation()).toBeDefined()
    })
    it('fetches the right reactions',()=>{
        expect(document.querySelector(".reactions").childElementCount).toEqual(3)
        })
    })
