export type TodoStatus = "OPEN" | "IN_PROGRESS" | "DONE";

export interface ITodo {
  id: number;
  title: string;
  description?: string;
  status: TodoStatus;
  created_at: string;
}

export interface INewTodo {
  title: string;
  description?: string;
  status: TodoStatus;
}
