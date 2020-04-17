const expect = require('chai').expect;
const jws = require('jws');
const ne_http = require('../dist/ne14_http.umd.min');

describe('JwtClient', () => {

  it('should be a fair test', () => {
    const payloadIn = makePayload(10, 'Th3 B0$$', 'user42', null, ['admin', 'management']);
    const token = makeToken(payloadIn, 'teh-seekrut');
    expect(token).to.not.be.null;
    expect(token.length).to.be.greaterThan(10);
  });
  
  it('should parse a valid token', () => {

    const payloadIn = makePayload(10, 'Th3 B0$$', 'user42', null, ['admin', 'management']);
    const token = makeToken(payloadIn, 'teh-seekrut');
    const payloadOut = ne_http.JwtClient.parse(token);

    expect(payloadOut).to.not.be.null;
    expect(payloadOut.iss).to.equal('Th3 B0$$');
    expect(payloadOut.rol).to.not.be.null;
    expect(payloadOut.rol.length).to.equal(2);
  });
});

function makeToken(payload, secret) {
  return jws.sign({ header: { alg: 'HS256' }, payload, secret });
}

function makePayload(mins, iss, sub, aud, rol) {
  const now = new Date();
  const exp = new Date();
  exp.setMinutes(exp.getMinutes() + mins);
  return { iss, sub, aud, rol, exp, nbf: now, iat: now };
}