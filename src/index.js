const download = require('download-to-file')
const path = require('path');

module.exports = class SaveRemoteFilePlugin {
    constructor(options) {
        if (options instanceof Array) {
            this.options = options;
        } else {
            this.options = [options];
        }
    }

    apply(compiler) {
        compiler.hooks.beforeRun.tapAsync(
            {
                name: 'SaveRemoteFilePlugin',
                context: true
            },
            (context, compilation, callback) => {
                const downloadFiles = (option) => {
                    const reportProgress = context && context.reportProgress;
                    const filepath = path.join(compiler.options.output.path, option.filepath);
                    download(option.url, filepath, (err, filepath) => {
                        if (err) {
                            compilation.errors.push(new Error(err));
                        } else {
                            if (reportProgress) {
                                reportProgress(100.0, 'Remote files saved to: ', filepath);
                            }
                        }
                    });
                };
                this.options.forEach(downloadFiles);
                callback();
            });
    }
};
