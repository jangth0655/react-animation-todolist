import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { getItem, setItems } from "../../App";
import { IBoardState, ITodos, todoState } from "../../atoms";

export interface ITodo {
  todo: string;
}

const TODOS_KEY = "todos";

const Form = styled.form`
  padding: 0.5em;
  width: 100%;
`;

const Input = styled.input`
  font-style: italic;
  font-size: 0.8rem;
  width: 50%;
  margin-right: 0.5em;
  outline: 0;
  border: 0;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  &::placeholder {
    color: rgba(0, 0, 0, 0.2);
  }
`;

const AddBtn = styled.button`
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
  font-size: 1rem;
`;

const CountText = styled.p`
  display: flex;
  font-size: 1rem;
`;
const Count = styled.span`
  color: ${(props) => props.theme.activeColor};
  font-size: 1rem;
  font-weight: 600;
  margin: 0 0.7em;
`;

const TodoForm = (board: IBoardState) => {
  const [todos, setTodos] = useRecoilState(todoState);
  const { register, handleSubmit, setValue, setFocus } = useForm();
  const onSubmit = ({ todo }: ITodo) => {
    setValue("todo", "");
    setTodos((prev) => {
      const newTodos = [
        ...prev,
        { todo, boardId: board.id, id: Date.now() },
      ].reverse();
      setItems(TODOS_KEY, JSON.stringify(newTodos));
      return newTodos;
    });
  };

  useEffect(() => {
    const loadedItems = getItem(TODOS_KEY);
    if (loadedItems !== null) {
      const parsedItems: ITodos[] = JSON.parse(loadedItems);
      parsedItems.forEach((todo) => {
        setTodos((prev) => {
          return [...prev, todo];
        });
      });
    } else {
      return;
    }

    setFocus("todo");
  }, [setFocus, setTodos]);

  return (
    <>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Input
          {...register("todo", { required: true })}
          placeholder="Write your todo"
        />
        <AddBtn>Add</AddBtn>
      </Form>

      <Category>
        <CategoryText>To Do ...</CategoryText>
        <CountText>
          Total :<Count>" {todos.length} "</Count>
        </CountText>
      </Category>
    </>
  );
};

export default TodoForm;
