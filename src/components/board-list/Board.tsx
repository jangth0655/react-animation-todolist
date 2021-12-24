import React, { useState } from "react";
import { useSetRecoilState } from "recoil";
import styled from "styled-components";
import { boardState, IBoardState } from "../../atoms";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBackspace } from "@fortawesome/free-solid-svg-icons";
import { faTimesCircle } from "@fortawesome/free-solid-svg-icons";
import TodoList from "../todo-list/TodoList";
import { AnimatePresence, motion } from "framer-motion";

const BoardItem = styled.li`
  position: relative;
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.2em;
  h1 {
    cursor: pointer;
    font-size: 1.2rem;
    & :hover {
      color: red;
    }
  }
`;

const Line = styled.div`
  width: 100%;
  border: 0.5px solid rgba(0, 0, 0, 0.1);
  margin-bottom: 1.5em;
`;

const OnDeleteBtn = styled.button`
  padding: 0.5em;
  font-size: 1.1rem;
  transition: all 0.2s ease-in-out;
  &:hover {
    transform: scale(1.2);
    color: ${(props) => props.theme.accentColor};
  }
`;

const Overlay = styled(motion.div)`
  z-index: 1;
  background-color: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
`;

const CloseBtn = styled(motion.div)`
  cursor: pointer;
  z-index: -1;
  padding: 1em;
  position: fixed;
  top: 1em;
  font-size: 4rem;
  color: ${(props) => props.theme.dark};
  transition: all 1s ease-in-out;
  & :hover {
    color: white;
  }
  @media only screen and (max-height: 45em) {
    right: -0.5em;
    font-size: 2rem;
  }
`;

const BigTodoList = styled(motion.div)`
  width: 10vw;
  height: 10vh;
  border-radius: 50%;
  position: absolute;
  right: 0;
  left: 0;
  opacity: 0;
  margin: auto;
`;

type showing = boolean;

const Board = ({ board, id }: IBoardState) => {
  const setBoard = useSetRecoilState(boardState);
  const [showTodoList, setShowTodoList] = useState<showing>(false);

  const onShowTodo = () => {
    setShowTodoList((prev) => !prev);
  };

  const onDelete = (id: number) => {
    setBoard((oldBoard) => {
      const newBoard = oldBoard.filter((board) => board.id !== id);
      return newBoard;
    });
  };

  return (
    <>
      <BoardItem>
        <button onClick={onShowTodo}>
          <h1>{board}</h1>
        </button>
        <OnDeleteBtn onClick={() => onDelete(id)}>
          <FontAwesomeIcon icon={faBackspace} />
        </OnDeleteBtn>
        <AnimatePresence>
          {showTodoList ? (
            <Overlay
              layoutId={id + ""}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <TodoList board={board} id={id} showing={true} />
              <CloseBtn onClick={onShowTodo}>
                <FontAwesomeIcon icon={faTimesCircle} />
              </CloseBtn>
            </Overlay>
          ) : null}
        </AnimatePresence>
      </BoardItem>
      <Line></Line>
      <BigTodoList layoutId={id + ""}></BigTodoList>
    </>
  );
};

export default Board;