export class PostgreSQLError extends Error {
  constructor(readonly message: string) {
    super(`PostgreSQL unexpected error: ${message}`);
    Object.setPrototypeOf(this, PostgreSQLError.prototype);
  }
}

export class PostgreSQLUniqueError extends Error {
  constructor(readonly message: string) {
    super(`PostgreSQL unique constraint error: ${message}`);
    Object.setPrototypeOf(this, PostgreSQLError.prototype);
  }
}