/**
* @jest-environment jsdom
*/

const { expect } = require("@jest/globals");

describe("creation.js", () => {
    beforeEach(() => {
        document.documentElement.innerHTML = html.toString();
    })
})