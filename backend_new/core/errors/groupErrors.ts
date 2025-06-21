export class GroupAlreadyExistsError extends Error {
  constructor(readonly title: string, readonly password_hash: string) {
    super(`Group with title: ${title} and password_hash: ${password_hash} already exists`);
    this.name = 'GroupAlreadyExistsError';
    Object.setPrototypeOf(this, GroupAlreadyExistsError.prototype);
  }
}

export class GroupNotFoundError extends Error {
  constructor(readonly id: number) {
    super(`Group with ID ${id} not found`);
    this.name = 'GroupNotFoundError';
    Object.setPrototypeOf(this, GroupNotFoundError.prototype);
  }
}

export class GroupWrongPasswordError extends Error {
  constructor() {
    super(`Wrong group password`);
    this.name = 'GroupWrongPasswordError';
    Object.setPrototypeOf(this, GroupWrongPasswordError.prototype);
  }
}

export class GroupNotChangedError extends Error {
  constructor(readonly id: number) {
    super(`Group with ID ${id} not changed`);
    this.name = 'GroupNotChangedError';
    Object.setPrototypeOf(this, GroupNotChangedError.prototype);
  }
}