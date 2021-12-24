import React, { useState } from "react";
import { useSetRecoilState } from "recoil";
import styled from "styled-components";
import { ITodo, todoState } from "../../atoms";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBackspace } from "@fortawesome/free-solid-svg-icons";

const TodoLi = styled.li`
  padding: 1em 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5em;
  width: fit-content;
  h1 {
    word-spacing: normal;
    padding: 1em;
    cursor: pointer;
    font-size: 1.2rem;
    & :hover {
      color: red;
    }
  }
`;

const TodoTextPart = styled.div`
  width: 100%;
  position: relative;
`;

const Label = styled.label<{ complete: boolean }>`
  font-size: 1.2rem;
  color: ${(prop) => (prop.complete ? "rgba(0,0,0,0.3)" : "black")};
`;

const Complete = styled.div`
  position: absolute;
  width: 90%;
  top: 0;
  bottom: 0;
  margin: auto;
  height: 1px;
  background-color: rgba(0, 0, 0, 0.2);
`;

const Input = styled.input`
  height: 3em;
  width: 3em;
  margin-right: 1em;
  cursor: pointer;
`;

const DeleteBtn = styled.button`
  cursor: pointer;
  padding: 0.5em;
  font-size: 1.1rem;
  transition: all 0.2s ease-in-out;
  &:hover {
    transform: scale(1.2);
    color: ${(props) => props.theme.accentColor};
  }
`;

const ToDo = (todo: ITodo) => {
  const [complete, setComplete] = useState(false);
  const setTodo = useSetRecoilState(todoState);
  const onDelete = (id: number) => {
    setTodo((oldTodo) => {
      const newTodo = oldTodo.filter((todo) => todo.id !== id);
      return newTodo;
    });
  };

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setComplete((pre) => !pre);
  };

  return (
    <TodoLi>
      <TodoTextPart>
        <Label htmlFor={todo.todo} complete={complete}>
          {todo.todo}
        </Label>
        {complete ? <Complete /> : null}
      </TodoTextPart>
      <Input
        onChange={onChange}
        id={todo.todo}
        type="checkbox"
        name={todo.todo}
      />
      <DeleteBtn onClick={() => onDelete(todo.id)}>
        <FontAwesomeIcon icon={faBackspace} />
      </DeleteBtn>
    </TodoLi>
  );
};

export default ToDo;
