import { IOperation } from "../operation/base";

/**
 * 
 */
export class OperationInvocationError<TRequest, TResponse, TOperation extends IOperation<TRequest, TResponse>> extends Error {

    constructor(
            public readonly error: any,
            public readonly operation: TOperation,
            public readonly request: TRequest,
            public readonly response?: TResponse) {

        super("An error occurred while invoking an operation.");
    }
}