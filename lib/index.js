import { RequestAgent } from './Service/RequestAgent.js';
class Task {
    constructor(name, info, isImportant) {
        this.request = new RequestAgent();
        this.name = name;
        this.info = info;
        this.isImportant = isImportant;
    }
    create() {
        const body = {
            name: this.name,
            info: this.info,
            isImportant: this.isImportant,
        };
        return this.request
            .post('/tasks', body)
            .then((data) => {
            console.log(data);
        })
            .catch((error) => {
            console.log(error);
        });
    }
}
const task = new Task('Testing', 'testing info', false);
console.log(task);
//# sourceMappingURL=index.js.map