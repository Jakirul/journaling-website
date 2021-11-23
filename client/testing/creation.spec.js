/**
* @jest-environment jsdom
*/


const request = require('supertest');
// import server
const { expect } = require("@jest/globals");
const { commentCreation } = require("../js/creation");
let fullComment = 'Hello there, general kenobi'
let emptyComment = ' ';


describe("creation.js", () => {
    describe('comment creation',()=>
        it('it rejects an empty comment', ()=>{
            commentCreation(emptyComment);
            let body = document.body
            let form = body.getElementsByClassName('comment-form')
            // let para = form.querySelector('p');
            expect(commentCreation(emptyComment)).toBeTruthy()
            expect(body.getElementsByClassName('comment-form').querySelector('p').textContent).toBe("Empty comments are not allowed - please try again!")
        })
    )
})