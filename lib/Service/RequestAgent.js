var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
export class RequestAgent {
    constructor() {
        this.BASE_URL = 'https://intership-liga.ru';
        this.headers = {
            'accept': 'application/json',
            'Content-Type': 'application/json',
        };
    }
    get(url) {
        return __awaiter(this, void 0, void 0, function* () {
            const request = yield fetch(`${this.BASE_URL}${url}`);
            const data = yield request.json();
            return data;
        });
    }
    post(url, body) {
        return __awaiter(this, void 0, void 0, function* () {
            const request = yield fetch(`${this.BASE_URL}${url}`, {
                method: 'POST',
                headers: this.headers,
                body: JSON.stringify(body),
            });
            const data = yield request.json();
            return data;
        });
    }
    patch(url, body) {
        return __awaiter(this, void 0, void 0, function* () {
            const request = yield fetch(`${this.BASE_URL}${url}`, {
                method: 'PATCH',
                headers: this.headers,
                body: JSON.stringify(body),
            });
            const data = yield request.json();
            return data;
        });
    }
    delete(url) {
        return __awaiter(this, void 0, void 0, function* () {
            const request = yield fetch(`${this.BASE_URL}${url}`, { method: 'DELETE' });
            const data = yield request.json();
            return data;
        });
    }
}
//# sourceMappingURL=RequestAgent.js.map