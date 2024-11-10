export interface CreateUserDto {
  email: string;
  username: string;
  password: string;
  connection: string;
}

export class StatusDTO {
  constructor(public message: string = '', public error: boolean = false) {}
  setError(message: string) {
    this.error = true;
    this.message = message;
  }
}

export class APIResponseDTO<T> {
  payload: T;
  status: StatusDTO;
  constructor() {
    this.status = new StatusDTO();
  }
}
