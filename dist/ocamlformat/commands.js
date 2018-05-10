"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _vscode = require("vscode");

var _utils = require("../utils");

var _Service = _interopRequireDefault(require("./Service"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const service = new _Service.default();

const inplaceFormat = _vscode.commands.registerCommand('extension.ocamlformat', async () => {
  const editor = _vscode.window.activeTextEditor;
  if (!editor) return;
  const targetFile = _vscode.window.activeTextEditor.document.fileName;

  try {
    await service.inplaceFormat(targetFile);
  } catch (error) {
    console.error(error);
    (void 0).outputChannel.append((0, _utils.formatError)(error));
    (void 0).outputChannel.show();
  }
});

var _default = [inplaceFormat];
exports.default = _default;