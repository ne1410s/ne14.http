/**
 * A contract for that which generates a response from a request.
 */
export interface IOperation<TRequest, TResponse> {
    /**
     * Performs the commands necessary to yield a response.
     * @param requestData The request data.
     * @throws {OperationInvocationError}
     */
    invoke(requestData: TRequest): Promise<TResponse>;
    /**
     * Checks the data in a request.
     * @param requestData The request data.
     * @throws {ValidationError}
     */
    validateRequest(requestData: TRequest): void;
    /**
     * Checks the data in a response.
     * @param responseData The response data.
     * @throws {ValidationError}
     */
    validateResponse(responseData: TResponse): void;
}
/**
 * Base implementation for that which generates a response from a request.
 */
export declare abstract class OperationBase<TRequest, TResponse> implements IOperation<TRequest, TResponse> {
    /**
     * @inheritdoc
     */
    invoke(requestData: TRequest): Promise<TResponse>;
    /**
     * @inheritdoc
     */
    abstract validateRequest(requestData: TRequest): void;
    /**
     * @inheritdoc
     */
    abstract validateResponse(responseData: TResponse): void;
    /**
     *
     * @param requestData
     */
    protected abstract invokeInternal(requestData: TRequest): Promise<TResponse>;
}
export abstract class HttpOperation<TRequest, TResponse> extends OperationBase<TRequest, TResponse> {
    readonly url: string;
    readonly verb: 'get' | 'head' | 'post' | 'put' | 'delete';
    readonly headers: Headers;
    constructor(url: string, verb?: 'get' | 'head' | 'post' | 'put' | 'delete', headers?: HeadersInit);
    /**
     *
     * @param requestData Request data.
     * @throws {SerialisationError}
     */
    abstract serialise(requestData: TRequest): string;
    /**
     * @param response The http response.
     * @throws {DeserialisationError}
     */
    abstract deserialise(response: Response): Promise<TResponse>;
    protected invokeInternal(requestData: TRequest): Promise<TResponse>;
    private serialiseQuery;
}
export declare abstract class JsonOperation<TRequest, TResponse> extends HttpOperation<TRequest, TResponse> {
    readonly url: string;
    readonly verb: 'get' | 'head' | 'post' | 'put' | 'delete';
    constructor(url: string, verb?: 'get' | 'head' | 'post' | 'put' | 'delete', headers?: HeadersInit);
    /**
     * @inheritdoc
     */
    serialise(requestData: TRequest): string;
    /**
     * @inheritdoc
     */
    deserialise(response: Response): Promise<TResponse>;
}
export declare abstract class JsonBodylessOperation<TResponse> extends JsonOperation<any, TResponse> {
    readonly url: string;
    readonly verb: 'get' | 'head';
    constructor(url: string, verb?: 'get' | 'head', headers?: HeadersInit);
    validateRequest(requestData: any): void;
    invoke(): Promise<TResponse>;
}
/**
 *
 */
export class ValidationError<TModel> extends Error {
    model: TModel;
    messages?: Array<string>;
    constructor(model: TModel, messages?: Array<string>);
}
export class OperationInvocationError<TRequest, TResponse, TOperation extends IOperation<TRequest, TResponse>> extends Error {
    readonly error: any;
    readonly operation: TOperation;
    readonly request: TRequest;
    readonly response?: TResponse;
    constructor(error: any, operation: TOperation, request: TRequest, response?: TResponse);
}
export declare class SerialisationError<TModel> extends Error {
    model: TModel;
    constructor(model: TModel);
}
export declare class DeserialisationError extends Error {
    constructor();
}
