import IValidatable from "./request";
import OperationError from "./error/operationError";

export interface IOperation<TRequest extends IValidatable, TResponse> {

    invoke(request: TRequest): Promise<TResponse>;
}

export abstract class OperationBase<TRequest extends IValidatable, TResponse> implements IOperation<TRequest, TResponse> {
    
    /**
     * 
     * @param request The request.
     * @throws {ValidationError}
     * @throws {OperationError}
     */
    invoke(request: TRequest): Promise<TResponse> {
        
        request.validate();

        let response: Promise<TResponse>;

        try {
            // TODO: Callback/etc for request dispatched
            response = this.invokeInternal(request);

            // TODO: Callback/etc for response received
            return response;
        }
        catch (error) {
            throw new OperationError(error, request);
        }
    }

    protected abstract invokeInternal(request: TRequest): Promise<TResponse>;
}