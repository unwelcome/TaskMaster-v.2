export class PostgreSQLError extends Error {
  constructor(readonly message: string) {
    super(`PostgreSQL unexpected error: ${message}`);
    this.name = 'PostgreSQLError';
    Object.setPrototypeOf(this, PostgreSQLError.prototype);
  }
}

export class PostgreSQLUniqueError extends Error {
  constructor(readonly message: string) {
    super(`PostgreSQL unique constraint error: ${message}`);
    this.name = 'PostgreSQLUniqueError';
    Object.setPrototypeOf(this, PostgreSQLUniqueError.prototype);
  }
}