import { HttpRequestBase } from "../http/request";
import { HttpOperationBase } from "../http/operation";
import { JsonResponse } from "../http/response";

export enum Acme2Environment {
    Staging = 'https://acme-staging-v02.api.letsencrypt.org/acme',
    Production = 'https://acme-v02.api.letsencrypt.org/acme'
}

export class GetTokenRequest extends HttpRequestBase {
    verb = 'get';
}

export class GetTokenResponse extends JsonResponse<string> {

    async deserialise(): Promise<string> {
        return this.headers['replay-nonce'];
    }
}

export class GetTokenOp extends HttpOperationBase<GetTokenRequest, GetTokenResponse> {
    relPath = '/new-nonce';
}

export class Acme2Service {
    
    getTokenOp = new GetTokenOp(this.env.valueOf());

    constructor(private env: Acme2Environment) {
    }
}

