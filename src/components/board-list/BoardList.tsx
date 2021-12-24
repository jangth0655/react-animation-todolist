import React from "react";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { boardState } from "../../atoms";
import Board from "./Board";

const Boardlist = styled.ul`
  padding: 1em;
  max-height: 60%;
  overflow-y: scroll;
`;

const BoardList = () => {
  const boardList = useRecoilValue(boardState);
  return (
    <Boardlist>
      {boardList.map((board) => (
        <Board key={board.id} {...board} />
      ))}
    </Boardlist>
  );
};

export default BoardList;
