'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var download = require('download-to-file');
var path = require('path');

module.exports = function () {
    function SaveRemoteFilePlugin(options) {
        _classCallCheck(this, SaveRemoteFilePlugin);

        if (options instanceof Array) {
            this.options = options;
        } else {
            this.options = [options];
        }
    }

    _createClass(SaveRemoteFilePlugin, [{
        key: 'apply',
        value: function apply(compiler) {
            var _this = this;

            compiler.hooks.beforeRun.tapAsync({
                name: 'SaveRemoteFilePlugin',
                context: true
            }, function (context, compilation, callback) {
                var downloadFiles = function downloadFiles(option) {
                    var reportProgress = context && context.reportProgress;
                    var filepath = path.join(compiler.options.output.path, option.filepath);
                    download(option.url, filepath, function (err, filepath) {
                        if (err) {
                            compilation.errors.push(new Error(err));
                        } else {
                            if (reportProgress) {
                                reportProgress(100.0, 'Remote files saved to: ', filepath);
                            }
                        }
                    });
                };
                _this.options.forEach(downloadFiles);
                callback();
            });
        }
    }]);

    return SaveRemoteFilePlugin;
}();
