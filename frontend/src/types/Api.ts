import type { TodoStatus } from "./Todo";

export type FilterStatus = TodoStatus | "";

export interface ApiParams {
  search?: string;
  status?: FilterStatus;
  ordering?: string;
}
