/**
 * Created by ralph on 6/22/15.
 */

var request = require('request');

/**
 * Expose `XiamiDecoder`
 */

exports.XiamiDecoder = XiamiDecoder;

/**
 * Initialize a new `XiamiDecoder`
 *
 * @constructor
 */

function XiamiDecoder() {

}

/**
 * Decoder of the encoded MP3 location.
 *
 * The algorithm is based on the reverse-engineered code of the
 * official mp3 flash player.
 *
 * @param encodedLocation encoded mp3 location string
 * @returns {string} actual mp3 location
 * @api public
 */

XiamiDecoder.prototype.decodeLocation = function (encodedLocation) {
    var sectionCount = parseInt(encodedLocation.charAt(0)),
        code = encodedLocation.substr(1),
        length = Math.floor(code.length / sectionCount) + 1,
        remainder = code.length % sectionCount,
        sections = [],
        result = '';

    // split to a few sections
    for (var i = 0; i < sectionCount; i++) {
        if (i < remainder) {
            sections.push(code.substr(length * i, length));
        } else {
            sections.push(code.substr((length - 1) * i + remainder, length - 1));
        }
    }

    // rebuild url
    for (var j = 0; j < sections[0].length; j++) {
        for (var k = 0; k < sections.length; k++) {
            if (k < sections.length) {
                result += sections[k].charAt(j);
            }
        }
    }

    result = unescape(result);

    return result.replace(/\^/g, '0').replace('/+/g', ' ');
};


/**
 * Get downloadable MP3 URL from MP3 ID on xiami.com
 *
 * @param mp3Id MP3 ID in string
 * @param callback callback to process result
 * @api public
 */

XiamiDecoder.prototype.getMp3Url = function (mp3Id, callback) {
    var playListUrl = 'http://www.xiami.com/song/playlist/id/' + mp3Id,
        pattern = /<location>(.*)<\/location>/im,
        encodedLocation = '',
        self = this;

    request(playListUrl, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            // first captured group contains the encoded mp3 location
            encodedLocation = body.match(pattern)[1];
            callback(self.decodeLocation(encodedLocation));
        } else {
            callback('failed to get playlist from ' + playListUrl);
        }
    });
};
