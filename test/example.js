const expect = require('chai').expect;

const ne14 = {
    http: require('../dist/index')
};

describe('#example', () => {

    it('should provide a token', async () => {

        var env = ne14.http.Acme2Environment.Staging;
        var sut = new ne14.http.Acme2Service(env);
        var result = await sut.getToken() || '';

        expect(result).to.not.be.empty;
    });
});
