/**
 * 
 */
export default class ValidationError<TModel> extends Error {

    constructor(
            public model: TModel,
            public messages?: Array<string>) {

        super("The data is invalid");
    }
}