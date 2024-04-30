export interface ResponsePayload<T = any> {
  message: string;
  payload: {
    currentPage: number;
    datas: T[];
    totalItems: number;
    totalPages: number;
  };
}
