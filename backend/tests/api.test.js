const request = require('supertest');
const express = require('express');
const cors = require('cors');
const romanNumeralRouter = require('../routes/romanNumeral');

const app = express();
app.use(cors());
app.use('/', romanNumeralRouter);

describe('Roman Numeral API', () => {
    test('converts valid number to Roman numeral', async () => {
        const response = await request(app)
            .get('/romannumeral?query=42');

        expect(response.status).toBe(200);
        expect(response.body).toEqual({
            input: '42',
            output: 'XLII'
        });
    });

    test('handles missing query parameter', async () => {
        const response = await request(app)
            .get('/romannumeral');

        expect(response.status).toBe(400);
        expect(response.text).toBe('Query parameter is required');
    });

    test('handles number below range', async () => {
        const response = await request(app)
            .get('/romannumeral?query=0');

        expect(response.status).toBe(400);
        expect(response.text).toBe('Number must be an integer between 1 and 3999');
    });

    test('handles number above range', async () => {
        const response = await request(app)
            .get('/romannumeral?query=4000');

        expect(response.status).toBe(400);
        expect(response.text).toBe('Number must be an integer between 1 and 3999');
    });

    test('handles non-numeric input', async () => {
        const response = await request(app)
            .get('/romannumeral?query=abc');

        expect(response.status).toBe(400);
        expect(response.text).toBe('Number must be an integer between 1 and 3999');
    });

    test('handles decimal numbers', async () => {
        const response = await request(app)
            .get('/romannumeral?query=1.5');

        expect(response.status).toBe(400);
        expect(response.text).toBe('Number must be an integer between 1 and 3999');
    });
}); 