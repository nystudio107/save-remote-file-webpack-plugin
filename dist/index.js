'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var crypto = require('crypto');
var download = require('download');

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
        key: 'appendHashToPath',
        value: function appendHashToPath(path, hash) {
            var newPath = path.substring(0, path.lastIndexOf('.')) + '.' + hash + path.substring(path.lastIndexOf('.'));

            return newPath;
        }
    }, {
        key: 'apply',
        value: function apply(compiler) {
            var _this = this;

            compiler.hooks.emit.tapAsync({
                name: 'SaveRemoteFilePlugin',
                context: true
            }, function (context, compilation, callback) {
                var count = _this.options.length;
                var downloadFiles = function downloadFiles(option) {
                    var reportProgress = context && context.reportProgress;
                    download(option.url).then(function (data) {
                        var hash = crypto.createHash('md5').update(data).digest("hex");
                        var newPath = _this.appendHashToPath(option.filepath, hash);
                        compilation.assets[newPath] = {
                            size: function size() {
                                return data.length;
                            },
                            source: function source() {
                                return data;
                            }
                        };
                        if (reportProgress) {
                            reportProgress(95.0, 'Remote file downloaded: ', newPath);
                        }
                        // Issue the calback after all files have been processed
                        count--;
                        if (count === 0) {
                            callback();
                        }
                    }).catch(function (error) {
                        compilation.errors.push(new Error(error));
                        callback();
                    });
                };
                _this.options.forEach(downloadFiles);
            });
        }
    }]);

    return SaveRemoteFilePlugin;
}();
