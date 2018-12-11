import { OperationInvocationError } from "../error/operationInvocation";

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
export abstract class OperationBase<TRequest, TResponse> implements IOperation<TRequest, TResponse> {

    /**
     * @inheritdoc
     */
    async invoke(requestData: TRequest): Promise<TResponse> {

        this.validateRequest(requestData);

        let responseData: TResponse;

        try {
            responseData = await this.invokeInternal(requestData);
        }
        catch (error) {
            throw new OperationInvocationError(error, this, requestData, responseData);
        }

        this.validateResponse(responseData);

        return responseData;
    }

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
    protected abstract async invokeInternal(requestData: TRequest): Promise<TResponse>;
}
