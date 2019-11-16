const db = require('../database/dbConfig');

describe('Users model', () => {
    describe('insert helper function.', () => {

        test('process.env.PORT should be valid || 5000', async () => {
            console.log('CONSOLE LOG THE USER LENGTH AND RETURNED LIST OF USERS.');
            expect(parseFloat(process.env.PORT)).toBe(5000);
        })

        test('process.env.JWT_SECRET should be valid', async () => {
            console.log('CONSOLE LOG THE USER LENGTH AND RETURNED LIST OF USERS.');
            expect(process.env.JWT_SECRET).toBe('aksdjnf');
        })
    })
})