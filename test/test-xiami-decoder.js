/**
 * Created by ralph on 6/22/15.
 */

var should = require('chai').should(),
    decoder = require('../xiami-decoder'),
    decodeLocation = decoder.decodeLocation;

describe('#decodeLocation', function() {
    it('decodes encoded mp3 location to actual location ready for downloading', function() {
        var encodedLocation = '5h3%..i%982357715.3h%7586ff231E%utA2fx.2%2F3%7465mF' +
            '_32e7%74657%5lt%FiicF255924477pakD59c53b-%65Elp2mlao2F936F379_3ue6b4c' +
            'E4515%E-%F5emm55%3417_7l%tyef1792e4E5-n';
        var expectedResult = 'http://m5.file.xiami.com/259/58259/533339645/1774377' +
            '447_16797557_l.mp3?auth_key=6e725bf5e94187cc7609f7342f4b5e26-14350176' +
            '00-0-null';
        decodeLocation(encodedLocation).should.equal(expectedResult);
    });
});