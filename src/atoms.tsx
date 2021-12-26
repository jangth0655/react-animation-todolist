import { atom } from "recoil";

export interface IBoardState {
  board: string;
  id: number;
  showing: boolean;
}
export interface ITodos {
  todo: string;
  id: number;
  boardId: number;
}

export const boardState = atom<IBoardState[]>({
  key: "board",
  default: [],
});

export const todoState = atom<ITodos[]>({
  key: "todo",
  default: [],
});
