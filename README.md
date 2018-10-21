# SaveRemoteFile webpack plugin

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
                url: 'http://example.com/some/file.txt',
                filepath: 'local.txt',
            },
        ])
    ]
}
```

The `filepath` is relative to your webpack `output.path`

You can pass in either an object, or an array of objects.

## Options

* **url** remote URL of the remote file to save locally
* **filepath** filename where the file will be saved, relative to your webpack `output.path`
