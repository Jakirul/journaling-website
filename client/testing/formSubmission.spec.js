/**
* @jest-environment jsdom
*/

const fs = require('fs');
const path = require('path');
const html = fs.readFileSync(path.resolve(__dirname, '../index.html'), 'utf8');

global.fetch = require('jest-fetch-mock');
let app;

describe('submitForm', () => {
    

    beforeEach(() => {
        document.documentElement.innerHTML = html.toString();
        app = require('../js/formSubmission.js')
    })

    afterEach(() => {
        fetch.resetMocks();
    })

    describe("submits form",  () => {
        let evt;

        beforeEach(() => {
            fetch.resetMocks();
            evt =  { preventDefault: jest.fn()}
        })
        it("gets data", async () => {
            await app.submitForm(evt)
           
        })
        it("Count elements of the form", async() => {
            await app.submitForm(evt)
            expect(document.querySelector('.outer-form').childElementCount).toEqual(8)

        })


        

        
    })
})