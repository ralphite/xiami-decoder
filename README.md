xiami-decoder
=============

An npm module to decode mp3 url on xiami.com for direct downloading

## Installation

```sh
    npm install xiami-decoder --save
```

## Usage

```js
    var XiamiDecoder = require('xiami-decoder').XiamiDecoder,
        decoder = new XiamiDecoder();

    var encodedLocation = '5h3%..i%982357715.3h%7586ff231E%utA2fx.2%2F3%7465mF' +
                          '_32e7%74657%5lt%FiicF255924477pakD59c53b-%65Elp2mla' +
                          'o2F936F379_3ue6b4cE4515%E-%F5emm55%3417_7l%tyef1792' +
                          'e4E5-n';

    decoder.getMp3Url('1774377447', function(result) {
        console.log(result);
    });
    console.log(decoder.decodeLocation(encodedLocation));
```

## Test

```sh
    npm test
```

## Change Log

- 0.1.0 Initial Release