const ApiError = require("../errors/ApiError");
const { checkResponse } = require("./api");

/* global describe, it */
describe('API Utils', () => {

  describe('checkResponse', () => {

    it('should do nothing if response is ok', async () => {
      const res = { ok: true };
      await checkResponse(res);
    });

    it('should throw an ApiError if response is not ok', async () => {
      const res = {
        ok: false,
        headers: {
          get: jest.fn().mockReturnValueOnce('text/plain') 
        },
        status: 500,
        statusText: 'Internal Server Error',
        text: jest.fn().mockReturnValueOnce('Something went wrong.')
      };
      try{
        await checkResponse(res);
      } catch(err) {
        if(!err instanceof ApiError) throw err;
        expect(err.statusCode).toEqual(500);
        expect(err.statusText).toEqual('Internal Server Error');
        expect(err.body).toEqual('Something went wrong.');
        expect(err.message).toEqual('500 Internal Server Error ');
      }
    });

    it('should throw an ApiError and parse the error response if json', async () => {
      const res = {
        ok: false,
        headers: {
          get: jest.fn().mockReturnValueOnce('application/json') 
        },
        status: 500,
        statusText: 'Internal Server Error',
        json: jest.fn().mockReturnValueOnce({ message: 'Something went wrong' })
      };
      try{
        await checkResponse(res);
      } catch(err) {
        if(!err instanceof ApiError) throw err;
        expect(err.statusCode).toEqual(500);
        expect(err.statusText).toEqual('Internal Server Error');
        expect(err.body).toEqual('{"message":"Something went wrong"}');
        expect(err.message).toEqual('500 Internal Server Error Something went wrong');
        expect(err.error).toEqual('Something went wrong');
      }
    });

  });

});
