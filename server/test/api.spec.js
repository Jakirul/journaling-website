/**
 * @jest-environment jsdom
*/

const request = require('supertest');
// import server
const server = require('../server');

// const data = require('../data/postData.json');

let testData = {
    title: "What do you call a fish wearing a bowtie?",
    description: "Sofishticated.",
    author: "Jakirul",
    gif: "https://media1.giphy.com/media/3ohs4iUIR6b14Hv9N6/200.gif?cid=474c6cfd2opmtx9o0svu9rngse7qpgdzkpb6sfpgqokwq66q&rid=200.gif&ct=g"
    
}

describe('API server', () => {
    let api;

    beforeAll(() => {
        // start the server and store it in the api variable
        api = server.listen(5000, () =>
            console.log('Test server running on port 5000')
        );
    });

    afterAll((done) => {
        // close the server, then run done
        console.log('Gracefully stopping test server');
        api.close(done);
    });

    it('responds to get / with status 200', (done) => {
        request(api).get('/').expect(200, done);
    });

    it('puts data', (done) => {
        request(api).put('/reaction/like/1/0').expect(200, done).expect("New reaction!")
    })

    it('POST / data', async () => {
        const res = await request(api)
        .post('/')
        .send(testData)
        expect(res.statusCode).toEqual(201)
    });

    it('new comment put', (done) => {
        request(api).put('/comment/1').send({comment: "New comment"}).expect(201, done)
    })

   
    
    
})
