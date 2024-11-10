import { CartListResponse } from './response.dto';

export class StatusDTO {
  constructor(public message: string = '', public error: boolean = false) {}
  setError(message: string) {
    this.error = false;
    this.message = message;
  }
}

export class PageInfo {
  pageNumber: number;
  pageSize: number;
  totalRecords: number;
  totalPages: number;
  constructor(pageNumber: number, pageSize: number, totalRecords: number) {
    this.pageNumber = pageNumber;
    this.pageSize = pageSize;
    this.totalRecords = totalRecords;
    this.totalPages = Math.floor(totalRecords / pageSize);
  }
}

export class PaginatedAPIResponseDTO<T> {
  payload: Array<T>;
  pageInfo: PageInfo;
  status: StatusDTO;
  constructor() {
    this.status = new StatusDTO();
  }
}

export class APIResponseDTO<T> {
  payload: T;
  status: StatusDTO;
  constructor() {
    this.status = new StatusDTO();
  }
}
