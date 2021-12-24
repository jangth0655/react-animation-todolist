import { atom } from "recoil";

export interface IBoardState {
  board: string;
  id: number;
  showing: boolean;
}
export interface ITodo {
  todo: string;
  id: number;
  boardId: number;
}

export const boardState = atom<IBoardState[]>({
  key: "board",
  default: [],
});

export const todoState = atom<ITodo[]>({
  key: "todo",
  default: [],
});

/* export const showingToDo = atom<IShowTodoList>({
  key: "showing",
  default: false,
});
 */
