# SaveRemoteFilePlugin webpack plugin

## Installing

```
yarn add save-remote-file-webpack-plugin --dev
```
or
```
npm install save-remote-file-webpack-plugin --save-dev
```

## How it works

webpack 4 plugin to download & save remote files locally

It was written to allow for the downloading of [https://google-analytics.com/analytics.js](https://google-analytics.com/analytics.js) so that it can be served locally, but it can be used to locally download any remote file as part of the webpack build process.

The resulting file has a content hash appended to the file name after it is downloaded, and is added to your `manifest.json` if you are using `manifest-webpack-plugin`

## Usage

```js
const SaveRemoteFilePlugin = require('save-remote-file-webpack-plugin');
module.exports = {
    plugins: [
        new SaveRemoteFilePlugin([
            {
                url: 'https://google-analytics.com/analytics.js',
                filepath: 'js/analytics.js',
            },
        ])
    ]
}
```

This would emit `js/analytics.45eff9ff7d6c7c1e3c3d4184fdbbed90.js` and in your `manifest.json` something like this:

```json
  "js/analytics.js": "/dist/js/analytics.45eff9ff7d6c7c1e3c3d4184fdbbed90.js"
```

## Options

You can pass in either an object, or an array of objects for downloading multiple files.

* **url** remote URL of the remote file to save locally
* **filepath** filename where the file will be saved, relative to your webpack `output.path`
