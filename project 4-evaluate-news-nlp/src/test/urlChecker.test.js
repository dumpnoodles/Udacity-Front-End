import { checkForUrl } from '../client/js/urlChecker';


describe('Test checkForUrl() is defined' , () => {
    test('It should return true', () => {
        expect(checkForUrl).toBeDefined();
    });
});