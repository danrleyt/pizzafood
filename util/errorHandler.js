class InvalidInputError extends Error {
  constructor(message) {
    super(message);
    this.errorCode = 'ERR_INVALID_INPUT';
    this.name = 'InvalidInputError';
    this.errorMessage = this.message;
  }
}

class DatabaseOperationError extends Error {
  constructor(message) {
    super(message);
    this.errorCode = 'ERR_DBOPERATION_ERROR';
    this.name = 'InvalidInputError';
    this.errorMessage = this.message;
  }
}

module.exports = {
  InvalidInputError,
  DatabaseOperationError
};
