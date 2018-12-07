import IValidatable from "../request";

/**
 * 
 */
export default class ValidationError<TRequest extends IValidatable> extends Error {

    constructor(
            public request: TRequest,
            public messages: Array<string>) {

        super("At least one field was invalid");
    }
}