const crypto = require('crypto');
const download = require('download');

module.exports = class SaveRemoteFilePlugin {
    constructor(options) {
        if (options instanceof Array) {
            this.options = options;
        } else {
            this.options = [options];
        }
    }

    appendHashToPath(path, hash) {
        const newPath = path.substring(0, path.lastIndexOf('.'))
            + '.'
            + hash
            + path.substring(path.lastIndexOf('.'));

        return newPath;
    }

    apply(compiler) {
        compiler.hooks.emit.tapAsync(
            {
                name: 'SaveRemoteFilePlugin',
                context: true
            },
            (context, compilation, callback) => {
                let count = this.options.length;
                const downloadFiles = (option) => {
                    const reportProgress = context && context.reportProgress;
                    download(option.url).then(data => {
                        const hash = crypto.createHash('md5').update(data).digest("hex");
                        const newPath = this.appendHashToPath(option.filepath, hash);
                        compilation.assets[newPath] = {
                            size: () => data.length,
                            source: () => data
                        };
                        if (reportProgress) {
                            reportProgress(95.0, 'Remote file downloaded: ', newPath);
                        }
                        // Issue the calback after all files have been processed
                        count--;
                        if (count === 0) {
                            callback();
                        }
                    }).catch(error => {
                        compilation.errors.push(new Error(error));
                        callback();
                    });
                };
                this.options.forEach(downloadFiles);
            });
    }
};
