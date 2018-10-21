# SaveRemoteFilePlugin webpack plugin Changelog

## 1.0.2 - 2018-10-22
### Changed
* Code and docs cleanup

## 1.0.1 - 2018-10-21
### Added
* Downloaded files are now emitted, so they can be tracked by plugins like `manifest-webpack-plugin`
* Downloaded files have a content hash appended to their names for cache busting purposes

### Changed
* Switched over to `download` to avoid saving temporary files to the file system

## 1.0.0 - 2018-10-20
### Added
- Initial release
