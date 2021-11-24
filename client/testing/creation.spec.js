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
            
            // await reactionCreation(evt)

            expect(reactionCreation(evt)).toBeDefined()
        })

    })
})