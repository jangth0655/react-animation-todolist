import React from "react";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { IBoardState, todoState } from "../../atoms";
import ToDo from "./Todo";
import TodoForm from "./TodoForm";

const TodoSection = styled.div`
  overflow-y: scroll;
  position: relative;
  padding: 2em;
  width: 25em;
  height: 25em;
  border-radius: 15px;
  background-color: white;
`;

const Todolist = styled.ul`
  margin-top: 2em;
  height: 60%;

  @media only screen and (max-width: 40em) {
    font: 0.6em;
  }
`;

function TodoList(board: IBoardState) {
  const toDos = useRecoilValue(todoState);

  return (
    <>
      <TodoSection>
        <TodoForm {...board} />
        <Todolist>
          {toDos.map((todo) =>
            board.id === todo.boardId ? (
              <ToDo key={todo.todo} {...todo} />
            ) : null
          )}
        </Todolist>
      </TodoSection>
    </>
  );
}

export default TodoList;
