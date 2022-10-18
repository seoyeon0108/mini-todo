import React from "react";
import TodoItem from "./TodoItem";
import styled from "styled-components";

const TodoListBlock = styled.div`
    width: 90vw;
    margin-left: auto;
    margin-right: auto;
    padding-bottom: 29px;
`

const TodoList = ({ todos, onCheckToggle, onInsertToggle, onChangeSelectedTodo }) => {
  return (
    <TodoListBlock>
      {todos.map((todo) => (
        <TodoItem 
          todo={todo} 
          key={todo.id} 
          onCheckToggle={onCheckToggle} 
          onInsertToggle={onInsertToggle}
          onChangeSelectedTodo={onChangeSelectedTodo}
        />
      ))}
    </TodoListBlock>
  );
};

export default TodoList;
