import { handleSubmit } from '../client/js/formHandler';

describe('Test handleSubmit() is defined' , () => {
    test('It should return true', async () => {
        expect(handleSubmit).toBeDefined();
    });
});
