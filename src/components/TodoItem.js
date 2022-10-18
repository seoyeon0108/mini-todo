import React from "react";
import { MdCheckBox, MdCheckBoxOutlineBlank } from 'react-icons/md';
import "./TodoItem.css"
import styled from "styled-components";

const TodoItemBlock = styled.div`
    margin-left: auto;
    margin-right: auto;
    margin-top: 20px;
    border-radius: 5px;
    box-shadow: 1px 2px 5px 1px #f67280;
    padding: 1rem;
    display: flex;
    align-items: center;
`

const TodoItem = ({todo, onCheckToggle, onInsertToggle, onChangeSelectedTodo}) =>{
    const { id, text, checked } = todo; // 구조분해 통해서 텍스트만 뽑기?
    return (
        <TodoItemBlock>
            <div className={`content ${checked ? 'checked' : ''}`}>
                {checked ? (
                    <MdCheckBox
                      onClick={()=>{
                        onCheckToggle(id)
                      }}  
                    />
                ) : (
                  <MdCheckBoxOutlineBlank
                   onClick={()=>{
                     onCheckToggle(id)
                    }}  
                   />
                )}
                <div 
                  className="text"
                  onClick={() => {
                    onChangeSelectedTodo(todo)  // ;;todo 객체를 넣어줌
                    onInsertToggle()
                  }}
                >
                  {text}
                </div>
            </div>
        </TodoItemBlock>
    )
};

export default TodoItem;