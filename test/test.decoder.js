/**
 * Created by ralph on 6/22/15.
 */

var should = require('chai').should(),
    XiamiDecoder = require('../decoder').XiamiDecoder,
    decoder = new XiamiDecoder();

var mp3Id = '1774377447',
    encodedLocation = '5h3%..i%982357715.3h%7586ff231E%utA2fx.2%2F3%7465mF' +
        '_32e7%74657%5lt%FiicF255924477pakD59c53b-%65Elp2mlao2F936F379_3ue' +
        '6b4cE4515%E-%F5emm55%3417_7l%tyef1792e4E5-n',
    expectedResult = 'http://m5.file.xiami.com/259/58259/533339645/1774377' +
        '447_16797557_l.mp3?auth_key=6e725bf5e94187cc7609f7342f4b5e26-1435' +
        '017600-0-null';

describe('#decodeLocation', function () {
    it('decodes encoded mp3 location to actual location ready for downloading', function () {
        decoder.decodeLocation(encodedLocation).should.equal(expectedResult);
    });
});

describe('#getMp3Url', function () {
    it('gets actual mp3 url from a mp3 id', function (done) {
        decoder.getMp3Url(mp3Id, function (result) {
            result
                .replace(/\?auth_key.*/i, '') // auth key varies so removing this part
                .should.equal(expectedResult.replace(/\?auth_key.*/i, ''));
            done();
        });
    });
});