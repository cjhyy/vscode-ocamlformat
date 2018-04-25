"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _child_process = require("child_process");

var _ramda = require("ramda");

var _vscode = require("vscode");

var _utils = require("../utils");

var _path = _interopRequireDefault(require("path"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class Service {
  constructor(outputChannel) {
    this.outputChannel = outputChannel;
    this.checkoFormtatter();
  }

  get formatterCommand() {
    const configuredFormatterPath = _vscode.workspace.getConfiguration('ocamlformatter').get('path');

    return configuredFormatterPath || Service.defaultFormatterCommand;
  }

  checkoFormtatter() {
    try {
      var _ref, _ref2, _ref3;

      const version = (_ref = (_ref2 = (_ref3 = `${this.formatterCommand} --version`, (0, _child_process.execSync)(_ref3)), (0, _ramda.toString)(_ref2)), (0, _ramda.trim)(_ref));
      this.outputChannel.appendLine(version);
      console.info(`${this.formatterCommand} version:`, version);
    } catch (error) {
      const warningMessage = this.formatterCommand === Service.defaultFormatterCommand ? _utils.formatterMissingCommandMessage : _utils.formatterInvalidSassPathMessage;
      this.outputChannel.append((0, _utils.formatError)(error));
      this.outputChannel.show();
      console.warn(`${this.formatterCommand} warn:`, error.toString('utf8').trim());
    }
  }

}

exports.default = Service;