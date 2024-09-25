import { Pagination } from "../data/base";

export type APIResponse<T> = {
  message: string;
  data: T;
};

export type APIPagiResponse<T> = APIResponse<{
  meta: Pagination;
  data: T[];
}>;
