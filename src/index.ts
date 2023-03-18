class RequestAgent {
  private BASE_URL = 'https://intership-liga.ru';

  private headers = {
    'accept': 'application/json',
    'Content-Type': 'application/json',
  };

  async get(url: string): Promise<Response> {
    const request = await fetch(`${this.BASE_URL}${url}`);
    const data = await request.json();

    return data;
  }

  async post(url: string, body: object): Promise<Response> {
    const request = await fetch(`${this.BASE_URL}${url}`, {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify(body),
    });
    const data = await request.json();

    return data;
  }

  async patch(url: string, body: object): Promise<Response> {
    const request = await fetch(`${this.BASE_URL}${url}`, {
      method: 'PATCH',
      headers: this.headers,
      body: JSON.stringify(body),
    });
    const data = await request.json();

    return data;
  }

  async delete(url: string): Promise<Response> {
    const request = await fetch(`${this.BASE_URL}${url}`, { method: 'DELETE' });
    const data = await request.json();

    return data;
  }
}

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

// const task = new Task('Testing', 'testing info', false);

// task.create();
