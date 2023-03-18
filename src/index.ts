import { RequestAgent } from './Service/RequestAgent.js';

class Task {
  private name: string;
  private info: string;
  private isImportant: boolean;

  private request = new RequestAgent();

  constructor(name: string, info: string, isImportant: boolean) {
    this.name = name;
    this.info = info;
    this.isImportant = isImportant;
  }

  create(): object {
    const body: {
      name: string;
      info: string;
      isImportant: boolean;
    } = {
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

// task.create();
