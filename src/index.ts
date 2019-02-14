import {Initiative} from "./Initiative";

(async () => {
    const app: Initiative = new Initiative();

    while (true) {
        await app.loop();
    }
})();
