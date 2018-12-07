import IValidatable from "../request";

export abstract class HttpRequestBase implements IValidatable {
    
    abstract get verb(): string;

    get headers(): any { return null; }

    validate(): void {
        // Nothing to do
    }
}

export abstract class HttpBodyRequestBase<TModel extends IValidatable> extends HttpRequestBase {

    abstract get model(): TModel;

    abstract serialise(): string;

    validate(): void {
        return this.model.validate();
    }
}

export abstract class JsonRequest<TModel extends IValidatable> extends HttpBodyRequestBase<TModel> {

    serialise(): string { 
        return JSON.stringify(this.model);
    }
}
