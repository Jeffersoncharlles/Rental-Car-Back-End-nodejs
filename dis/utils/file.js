/**

 * @Author: Jefferson Charlles

 * @Date:   2021-12-02 18:50:52

 * @Last Modified by:   Jefferson Charlles

 * @Last Modified time: 2021-12-02 18:53:26

 */

Object.defineProperty(exports, '__esModule', {
    value: true,
});

exports.deleteFile = void 0;

const _fs = _interopRequireDefault(require('fs'));

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
}

const deleteFile = async (file) => {
    try {
        await _fs.default.promises.stat(file); //* verifica se o arquivo existe
    } catch {
        return;
    }

    await _fs.default.promises.unlink(file); //* remove se o arquivo existe
};

exports.deleteFile = deleteFile;
