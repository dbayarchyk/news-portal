class ValidationErrors extends Error {
  constructor(errors) {
    super("Validation errors");

    this.errors = errors;
  }
}

export default ValidationErrors;
