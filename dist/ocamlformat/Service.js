"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _child_process = require("child_process");

var _path = _interopRequireDefault(require("path"));

var _ramda = require("ramda");

var _vscode = require("vscode");

var _utils = require("../utils");

var _fs = require("fs");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class Service {
  get formatCommand() {
    const configuredFormatterPath = _vscode.workspace.getConfiguration('ocamlformat').get('path');

    return configuredFormatterPath || Service.defaultFormatCommand;
  }

  constructor() {
    this.checkoFormtatter();
  }

  checkoFormtatter() {
    try {
      var _ref, _ref2, _ref3;

      const version = (_ref = (_ref2 = (_ref3 = `${this.formatCommand} --version`, (0, _child_process.execSync)(_ref3)), (0, _ramda.toString)(_ref2)), (0, _ramda.trim)(_ref));

      _vscode.window.showInformationMessage(`${this.formatCommand} version: ${version}`);
    } catch (error) {
      const warningMessage = this.formatCommand === Service.defaultFormatCommand ? _utils.formatterMissingCommandMessage : _utils.formatterInvalidSassPathMessage;

      _vscode.window.showErrorMessage((0, _utils.formatError)(error));

      _vscode.window.showWarningMessage(`${this.formatCommand} warn:`, warningMessage);
    }
  }

  async formatText(text) {
    const tempFilePath = _path.default.resolve(__dirname, '../../node_modules/.temp');

    await (0, _utils.errorFirstPromisify)(_fs.writeFile)(tempFilePath, text, 'utf8');
    const [newText, stderr] = await (0, _utils.errorFirstPromisify)(_child_process.exec)(`${this.formatCommand} ${tempFilePath}`);
    if (stderr) throw stderr;
    return newText;
  }

}

exports.default = Service;

_defineProperty(Service, "defaultFormatCommand", 'ocamlformat');