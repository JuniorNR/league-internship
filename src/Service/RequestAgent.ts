export class RequestAgent {
  private BASE_URL = 'https://intership-liga.ru';

  private headers = {
    'accept': 'application/json',
    'Content-Type': 'application/json',
  };

  async get(url: string): Promise<Response> {
    const request = await fetch(`${this.BASE_URL}${url}`);

    if (!request.ok) {
      throw new Error(`request status: ${request.status}`);
    }

    const data = await request.json();

    return data;
  }

  async post(url: string, body: object): Promise<Response> | never {
    const request = await fetch(`${this.BASE_URL}${url}`, {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify(body),
    });

    if (!request.ok) {
      throw new Error(`request status: ${request.status}`);
    }

    const data = await request.json();

    return data;
  }

  async patch(url: string, body: object): Promise<Response> {
    const request = await fetch(`${this.BASE_URL}${url}`, {
      method: 'PATCH',
      headers: this.headers,
      body: JSON.stringify(body),
    });

    if (!request.ok) {
      throw new Error(`request status: ${request.status}`);
    }

    const data = await request.json();

    return data;
  }

  async delete(url: string): Promise<Response> {
    const request = await fetch(`${this.BASE_URL}${url}`, { method: 'DELETE' });

    if (!request.ok) {
      throw new Error(`request status: ${request.status}`);
    }

    const data = await request.json();

    return data;
  }
}
