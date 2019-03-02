"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _child_process = require("child_process");

var _vscode = require("vscode");

var _utils = require("./utils");

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class Service {
  constructor() {
    _defineProperty(this, "inplaceFormat", async filepath => {
      const [_, stderr] = await (0, _utils.errorFirstPromisify)(_child_process.exec)(`${this.formatCommand} ${filepath} --inplace`);
      if (stderr) throw stderr;
    });

    _defineProperty(this, "stdioFormat", text => {
      const {
        stdout,
        stderr
      } = (0, _child_process.spawnSync)(Service.defaultFormatCommand, ['-', '--name vscode-ocamlformat'], {
        input: text
      });
      if (stderr) throw stderr;
      return stdout;
    });
  }

  get formatCommand() {
    const configuredFormatterPath = _vscode.workspace.getConfiguration('ocamlformat').get('path');

    return configuredFormatterPath || Service.defaultFormatCommand;
  }

}

exports.default = Service;

_defineProperty(Service, "defaultFormatCommand", 'ocamlformat');