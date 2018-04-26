"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.documentSelector = exports.outputChannel = void 0;

var _child_process = require("child_process");

var _vscode = require("vscode");

var _utils = require("../utils");

var _Service = _interopRequireDefault(require("./Service"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const outputChannel = _vscode.window.createOutputChannel('ocamlformat');

exports.outputChannel = outputChannel;
const documentSelector = [{
  language: 'ocaml'
}];
exports.documentSelector = documentSelector;
const service = new _Service.default();

const provideDocumentFormattingEdits = async (textDocument, formattingOptions, cancellationToken) => {
  try {
    const [newText, stderr] = await (0, _utils.errorFirstPromisify)(_child_process.exec)(`${service.formatCommand} ${textDocument.fileName}`);
    if (stderr) throw stderr;
    const rangeStart = textDocument.lineAt(0).range.start;
    const rangeEnd = textDocument.lineAt(textDocument.lineCount - 1).range.end;
    const range = new _vscode.Range(rangeStart, rangeEnd);
    return [_vscode.TextEdit.replace(range, newText)];
  } catch (error) {
    (void 0).outputChannel.append((0, _utils.formatError)(error));
    (void 0).outputChannel.show();
  }
};

var _default = {
  provideDocumentFormattingEdits
};
exports.default = _default;