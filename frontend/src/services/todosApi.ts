import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { ITodo, INewTodo } from "../types/Todo";
import type { ApiParams } from "../types/Api";

const API_BASE_URL = "http://localhost:8000/api/";

export const todosApi = createApi({
  reducerPath: "todosApi",
  baseQuery: fetchBaseQuery({ baseUrl: API_BASE_URL }),
  tagTypes: ["Todos"],
  endpoints: (builder) => ({
    getTodos: builder.query<ITodo[], ApiParams>({
      query: (params) => ({
        url: "todos/",
        params: params,
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: "Todos" as const, id })),
              "Todos",
            ]
          : ["Todos"],
    }),

    createTodo: builder.mutation<ITodo, INewTodo>({
      query: (newTodo) => ({
        url: "todos/",
        method: "POST",
        body: newTodo,
      }),
      invalidatesTags: ["Todos"],
    }),

    updateTodo: builder.mutation<
      ITodo,
      Partial<ITodo> & { id: number; queryArgs?: ApiParams }
    >({
      query: ({ id, ...patch }) => ({
        url: `todos/${id}/`,
        method: "PATCH",
        body: patch,
      }),
      async onQueryStarted({ id, ...patch }, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          todosApi.util.updateQueryData(
            "getTodos",
            undefined as any,
            (draft) => {
              const todo = draft.find((t) => t.id === id);
              if (todo) {
                Object.assign(todo, patch);
              }
            }
          )
        );
        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      },
      invalidatesTags: (_, __, { id }) => [{ type: "Todos", id }],
    }),

    deleteTodo: builder.mutation<void, number>({
      query: (id) => ({
        url: `todos/${id}/`,
        method: "DELETE",
      }),
      invalidatesTags: ["Todos"],
    }),
  }),
});

export const {
  useGetTodosQuery,
  useCreateTodoMutation,
  useUpdateTodoMutation,
  useDeleteTodoMutation,
} = todosApi;
