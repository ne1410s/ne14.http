
export default interface IValidatable {

    /**
     * @throws {ValidationError}
     */
    validate(): void;
}