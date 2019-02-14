import {ICharInitiative} from "./interaface/ICharInitiative";
import {terminal} from "terminal-kit";
import {CLIInterface} from "./lib/CLIInterface";

export class Initiative {
    private list: Set<ICharInitiative> = new Set<ICharInitiative>();
    private cli: CLIInterface = new CLIInterface();


    public add(name: string, roll: number): void {
        this.list.add({
            name,
            roll: Number(roll),
        });
    }

    public show() {
        terminal.singleColumnMenu(
            [...this.list].sort(
                (a,b) => (b.roll - a.roll)
            ).reduce((all, item) => [...all, `[ ${item.roll} ] ${item.name}`], []),
            () => {
                process.exit();
            }
        );
    }

    public async loop() {
        const command: string = await this.cli.query('> ');
        const [func, ...args]: string[] = command.split(' ');

        const f: Function = this.getFunc(func);
        f.call(this, ...args);
    }

    public getFunc(funcName: string) {
        switch (funcName) {
            case 'add':
            case 'a':
                return this.add;
            case 'show':
            case 's':
            case 'l':
            case 'list':
                return this.show;
        }
    }
}
