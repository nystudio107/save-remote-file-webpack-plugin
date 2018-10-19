## How it works

webpack 4 plugin to download & save remote files locally

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
