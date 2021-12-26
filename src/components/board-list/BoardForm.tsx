import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useRecoilValue, useSetRecoilState } from "recoil";
import styled from "styled-components";
import { getItem, setItems } from "../../App";
import { boardState, IBoardState } from "../../atoms";

export interface IBoard {
  board: string;
}

const CATEGORIES = "board";

const BoardForm = styled.form`
  padding: 0.5em;
  width: 100%;
`;

const Input = styled.input`
  font-style: italic;
  font-size: 1rem;
  padding: 0.4em;
  width: 50%;
  margin-right: 0.5em;
  outline: 0;
  border: 0;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  &::placeholder {
    color: rgba(0, 0, 0, 0.2);
  }
`;

const AddButton = styled.button`
  padding: 0.2em;
  cursor: pointer;
  width: 15%;
  font-size: 0.8rem;
  border-radius: 15px;
  -webkit-box-shadow: 1px 3px 16px -6px #000000;
  box-shadow: 1px 3px 16px -6px #000000;
  transition: all 0.2s ease-in;
  &:active {
    transform: scale(0.6);
  }
  &:hover {
    background-color: ${(prop) => prop.theme.bgColor};
  }
`;

const Category = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 2em;
  margin-bottom: 2em;
`;

const CategoryText = styled.h1`
  color: ${(props) => props.theme.light};
  font-style: italic;
  font-weight: 600;
  font-size: 1.5rem;
`;

const CountText = styled.p`
  display: flex;
`;
const Count = styled.span`
  color: ${(props) => props.theme.activeColor};
  font-size: 1.2rem;
  font-weight: 600;
  margin: 0 0.7em;
`;

const BoardCreateForm = () => {
  const boardList = useRecoilValue(boardState);
  const setBoard = useSetRecoilState(boardState);
  const { register, handleSubmit, setValue, setFocus } = useForm();
  const onSubmit = ({ board }: IBoard) => {
    setValue("board", "");
    setBoard((prev) => {
      const newBoards = [...prev, { board, id: Date.now(), showing: false }];
      setItems(CATEGORIES, JSON.stringify(newBoards));
      return newBoards;
    });
  };

  useEffect(() => {
    const loadedItems = getItem(CATEGORIES);
    if (loadedItems !== null) {
      const parsedBoards: IBoardState[] = JSON.parse(loadedItems);
      parsedBoards.forEach((board) => {
        setBoard((prev) => {
          return [...prev, board];
        });
      });
    }
    setFocus("board");
  }, [setFocus, setBoard]);

  return (
    <>
      <BoardForm onSubmit={handleSubmit(onSubmit)}>
        <Input
          {...register("board", { required: true })}
          placeholder="Write your Category"
        />
        <AddButton>Add</AddButton>
      </BoardForm>

      <Category>
        <CategoryText>Categories ...</CategoryText>
        <CountText>
          Total :<Count>" {boardList.length} "</Count>
        </CountText>
      </Category>
    </>
  );
};

export default BoardCreateForm;
