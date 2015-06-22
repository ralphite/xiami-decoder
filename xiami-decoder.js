/**
 * Created by ralph on 6/22/15.
 */

module.exports = {

    /**
     * decoder of the encrypted MP3 url.
     *
     * the algorithm is based on the reverse-engineered code of the
     * official mp3 flash player.
     *
     * @param encodedLocation encoded mp3 location string
     * @returns {string} actual mp3 location
     */
    decodeLocation: function (encodedLocation) {
        var sectionCount = parseInt(encodedLocation.charAt(0)),
            code = encodedLocation.substr(1),
            length = Math.floor(code.length / sectionCount) + 1,
            remainder = code.length % sectionCount,
            sections = [],
            result = '';

        // split to a few sections
        for (var i = 0; i < sectionCount; i++) {
            if(i < remainder) {
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
    }
};