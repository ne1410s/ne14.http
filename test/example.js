const expect = require('chai').expect;
const ne14 = {
    http: require('../dist/index')
};

describe('#example', () => {

    it('should do things', async () => {
        var env = ne14.http.Acme2Environment.Staging;
        var sut = new ne14.http.Acme2Service(env);
        var req = new ne14.http.GetTokenRequest();
        var result = await sut.getTokenOp.invoke(req);

        console.log(result);
    });
});
