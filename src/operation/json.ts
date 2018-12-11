import { HttpOperation } from "./http";

export abstract class JsonOperation<TRequest, TResponse> extends HttpOperation<TRequest, TResponse> {

    constructor (
            public readonly url: string,
            public readonly verb: 'get' | 'head' | 'post' | 'put' | 'delete' = 'get',
            headers?: HeadersInit) {

        super(url, verb, headers);

        this.headers.set('content-type', 'application/json');
        this.headers.set('accept', 'application/json');
    }

    /**
     * @inheritdoc
     */
    serialise(requestData: TRequest): string {
        return requestData ? JSON.stringify(requestData) : null;
    }
    
    /**
     * @inheritdoc
     */
    async deserialise(response: Response): Promise<TResponse> {
        const raw = await response.text();
        return JSON.parse(raw);
    }
}

export abstract class JsonBodylessOperation<TResponse> extends JsonOperation<any, TResponse> {

    constructor (
            public readonly url: string,
            public readonly verb: 'get' | 'head' = 'get',
            headers?: HeadersInit) {

        super(url, verb, headers);
    }

    validateRequest(requestData: any): void {
        // Do nothing by default
    }
  
    async invoke(): Promise<TResponse> {
        return super.invoke(null);
    }
}
