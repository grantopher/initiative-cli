import {Interface} from "readline";
import * as readline from "readline";

export class CLIInterface {
    private interface: Interface;

    constructor() {
        this.interface = readline.createInterface({
            input: process.stdin,
            output: process.stdout,
            terminal: false
        });
    }

    public async query(output: string): Promise<string> {
        return new Promise<string>((resolve) => {
            this.interface.question(output, resolve);
        });
    }
}
