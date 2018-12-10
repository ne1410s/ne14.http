import { JsonBodylessOperation } from "../operation/json";
import ValidationError from "../error/validation";
import { DeserialisationError } from "../error/serialisation";

export enum Acme2Environment {
    Staging = 'https://acme-staging-v02.api.letsencrypt.org/acme',
    Production = 'https://acme-v02.api.letsencrypt.org/acme'
}

class TokenOperation extends JsonBodylessOperation<string> {
    
    async deserialise(response: Response): Promise<string> {

        await Promise.resolve();

        if (!response.headers.has('replay-nonce')) {
            throw new DeserialisationError();
        }
        
        return response.headers.get('replay-nonce');
    }

    validateResponse(responseData: string): void {

        if (!/^[\w-]{43}$/gi.test(responseData)) {
            throw new ValidationError(responseData);
        }
    }
}

export class Acme2Service {
    
    public readonly baseUrl: string;

    private readonly tokenOperation: TokenOperation;

    constructor(env: Acme2Environment) {
        this.baseUrl = env.valueOf();
        this.tokenOperation = new TokenOperation(`${this.baseUrl}/new-nonce`, 'head');
    }

    async getToken(): Promise<string> {
        return await this.tokenOperation.invoke();
    }
}
