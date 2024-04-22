const {describe, expect, test} = require('@jest/globals');
const request = require('supertest');

const app = require('../app');

describe('Backend health endpoint', () => {

    test('Should return 200', async () => {
        const response = await request(app)
          .get('/health')
          .set('Accept', 'application/json')
        expect(response.status).toEqual(200);
    });
});

describe('POST links endpoint', () => {

    beforeEach(async () => {
        await request(app)
            .delete('/api/links/empty');
    });


    test('Posting a link', async () => {

        const url = "https://www.youtube.com";

        const response = await request(app)
          .post('/api/links')
          .set('Accept', "application/json")
          .set('Content', 'application/json')
          .send({ "url" : url});

          expect(response.status).toEqual(200);
          expect(response.headers['content-type']).toMatch(/json/);
          expect(response.body.addedLink.originalUrl).toEqual("https://www.youtube.com");
          expect(response.body.addedLink.shortUrl).toBeTruthy();
    });
});

describe('Short URL functionality', () => {

    let shortUrl;

    // Create a shortened URL before running the test
    beforeAll(async () => {
        await request(app)
        .delete('/api/links/empty');

        // Send a POST request to create a shortened URL
        const response = await request(app)
            .post('/api/links')
            .set('Accept', 'application/json')
            .set('Content-Type', 'application/json')
            .send({ "url": "https://www.youtube.com" });

        // Extract the short URL from the response
        shortUrl = response.body.addedLink.shortUrl;
    });

    test('Navigating a shortLink', async () => {
        const response = await request(app)
            .get(`/${shortUrl}`);

            expect(response.status).toEqual(302);
            expect(response.headers).toHaveProperty('location');
            expect(response.headers.location).toEqual("https://www.youtube.com");
    });
});