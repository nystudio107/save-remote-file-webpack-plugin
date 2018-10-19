## How it works

webpack 4 plugin to download remote files, and save them locally.

## Usage

```js
const DownloadFilePlugin = require('download-file-webpack-plugin');
module.exports = {
    plugins: [
        new DownloadFilePlugin([
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

* **url** remote URL of the file to download
* **filepath** filename where the file will be saved
