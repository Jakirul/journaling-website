/**
* @jest-environment jsdom
*/

const { expect } = require("@jest/globals");
const fs = require("fs");
const path = require("path");
const html = fs.readFileSync(path.resolve(__dirname, "../index.html"), "utf8");

describe("index.html", () => {
    beforeEach(() => {
        document.documentElement.innerHTML = html.toString();
    })
    describe("description", () => {
        test("description", () => {
            
        })
    })
})