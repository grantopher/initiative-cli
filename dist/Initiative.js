"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const terminal_kit_1 = require("terminal-kit");
const CLIInterface_1 = require("./lib/CLIInterface");
class Initiative {
    constructor() {
        this.list = new Set();
        this.cli = new CLIInterface_1.CLIInterface();
    }
    add(name, roll) {
        this.list.add({
            name,
            roll: Number(roll),
        });
    }
    show() {
        terminal_kit_1.terminal.singleColumnMenu([...this.list].sort((a, b) => (b.roll - a.roll)).reduce((all, item) => [...all, `[ ${item.roll} ] ${item.name}`], []), () => {
            process.exit();
        });
    }
    loop() {
        return __awaiter(this, void 0, void 0, function* () {
            const command = yield this.cli.query('> ');
            const [func, ...args] = command.split(' ');
            const f = this.getFunc(func);
            f.call(this, ...args);
        });
    }
    getFunc(funcName) {
        switch (funcName) {
            case 'add':
                return this.add;
            case 'show':
                return this.show;
        }
    }
}
exports.Initiative = Initiative;
//# sourceMappingURL=Initiative.js.map