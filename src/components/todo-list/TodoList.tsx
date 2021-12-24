import { motion } from "framer-motion";
import React, { useState } from "react";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { IBoardState, todoState } from "../../atoms";
import ToDo from "./Todo";
import TodoForm from "./TodoForm";

const TodoSection = styled(motion.div)`
  padding: 2em;
  width: 36em;
  height: 26em;
  border-radius: 15px;
  background-color: white;
`;

const Todolist = styled.ul`
  margin-top: 2em;
  overflow-y: scroll;
  height: 60%;
  @media only screen and (max-height: 40em) {
    position: absolute;
    bottom: 0em;
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
            board.id === todo.boardId ? <ToDo key={todo.id} {...todo} /> : null
          )}
        </Todolist>
      </TodoSection>
    </>
  );
}

export default TodoList;
