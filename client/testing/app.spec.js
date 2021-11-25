/**
* @jest-environment jsdom
*/

const fs = require('fs');
const path = require('path');
const html = fs.readFileSync(path.resolve(__dirname, "../jokes.html"), "utf8");


global.fetch = require('jest-fetch-mock');

describe ('app',()=>{
    let select;
    beforeEach(() => {
        document.documentElement.innerHTML = html.toString();
        app = require('../js/app.js')
        selectAmount =document.querySelector("#sortBy").childNodes 
        selectValue = document.querySelector("#sortBy").value
        
    })

    afterEach(() => {
        fetch.resetMocks();
    })
    
    it("default value",()=>{
        expect(selectValue=="Latest")
    })    
    it("value amounts",()=>{
        expect(selectAmount==5)
    })    

})