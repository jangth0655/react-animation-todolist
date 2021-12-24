import React from "react";
import styled from "styled-components";
import BoardCreateForm from "./components/board-list/BoardForm";
import BoardList from "./components/board-list/BoardList";

const Main = styled.main`
  padding: 2em;
  height: 31em;
  width: 45em;
  background-color: white;
  margin: auto;
  border-radius: 10px;
  -webkit-box-shadow: 1px 6px 12px -1px #000000;
  box-shadow: 1px 6px 12px -1px #000000;
  @media only screen and (max-width: 43em) {
    font-size: 0.6rem;
  }
`;

function App() {
  return (
    <Main>
      <BoardCreateForm />
      <BoardList />
    </Main>
  );
}

export default App;
