import React from "react";
import { MdCheckBox, MdCheckBoxOutlineBlank } from 'react-icons/md';
import "./TodoItem.css"

const TodoItem = ({todo, onCheckToggle, onInsertToggle, onChangeSelectedTodo}) =>{
    const { id, text, checked } = todo; // 구조분해 통해서 텍스트만 뽑기?
    return (
        <div className="TodoItem">
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
        </div>
    )
};

export default TodoItem;