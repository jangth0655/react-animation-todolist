import React from "react";
import styled from "styled-components";
import BoardCreateForm from "./components/board-list/BoardForm";
import BoardList from "./components/board-list/BoardList";

const Main = styled.main`
  padding: 2em;
  position: relative;
  top: 6em;
  height: 31em;
  width: 36em;
  margin: auto;
  border-radius: 10px;
  background-color: white;
  -webkit-box-shadow: 1px 6px 12px -1px #000000;
  box-shadow: 1px 6px 12px -1px #000000;
  @media only screen and (max-width: 40em) {
    font-size: 0.6rem;
  }
`;

export const setItems = (key: string, value: any) => {
  return localStorage.setItem(key, value);
};

export const getItem = (key: string) => {
  return localStorage.getItem(key);
};

export const removeItem = (key: string) => {
  return localStorage.removeItem(key);
};

function App() {
  return (
    <Main>
      <BoardCreateForm />
      <BoardList />
    </Main>
  );
}

export default App;
