/**
* @jest-environment jsdom
*/

const fs = require('fs');
const { request } = require('http');
const path = require('path');
const html = fs.readFileSync(path.resolve(__dirname, '../jokes.html'), 'utf8');
const {commentCreation, reactionCreation} = require('../js/creation.js')
const {getAllPosts} = require('../js/allPosts')
global.fetch = require('jest-fetch-mock');
let app;
describe('allPosts', () => {
    

    beforeEach(() => {
        document.documentElement.innerHTML = html.toString();
        app = require('../js/creation.js')
        getAllPosts(order)
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
})
