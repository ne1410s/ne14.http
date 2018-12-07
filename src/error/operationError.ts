import IValidatable from "../request";

/**
 * 
 */
export default class OperationError<TRequest extends IValidatable> extends Error {

    constructor(
            public error: any,
            public request: TRequest) {

        super("An error occurred during operation invocation.");
    }
}