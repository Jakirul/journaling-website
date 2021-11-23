/**
* @jest-environment jsdom
*/


const request = require('supertest');
// import server
const { expect } = require("@jest/globals");
const { commentCreation } = require("../js/creation");
let fullComment = 'Hello there, general kenobi'
let emptyComment = '';


describe("creation.js", () => {
    describe('comment creation',()=>
        it('it rejects an empty comment', ()=>{
            commentCreation(emptyComment);
            const para = document.getElementsByClassName("title-warning warning");
            expect(commentCreation(emptyComment)).toBeTruthy()
            expect(para.textContent).toBe("Empty comments are not allowed - please try again!")
        })
    )
})