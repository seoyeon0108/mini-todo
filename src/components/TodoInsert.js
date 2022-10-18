import React, { useEffect, useState } from "react";
import { MdAddCircle } from "react-icons/md";
import { TiTrash, TiPencil } from "react-icons/ti"
import './TodoInsert.css'

const TodoInsert = ({onInsertToggle, onInsertTodo, selectedTodo, onRemove}) => {
    const [value, setValue] = useState('');

    const onChange = (e) => {
        setValue(e.target.value);
    }

    const onSubmit = (e) => {
       e.preventDefault();
       onInsertTodo(value);
       setValue('') // 다시 값을 빈 문자열로 초기화
       onInsertToggle(); // 창이닫힘
    }

    // 간단하게 ;; 컴포넌트가 처음 렌더링되면 어떤 것을 실행하느냐를 여기서 처리한다고 이해하면 될것이다....
    useEffect(() => {
        if(selectedTodo){ // selectedTodo가 값이 있다면 초기값이 있는거다.
          setValue(selectedTodo.text)
        }
    },[selectedTodo]);

    return(
        <div>
            <div className="background" onClick={onInsertToggle}></div> 
            <form onSubmit={onSubmit}>
                <input placeholder="please type" value={value} onChange={onChange}></input>
                {/* 추가하는거와 수정하는 토글의  */}
                {selectedTodo ? (
                    <div className="rewrite">
                        <TiPencil />
                        <TiTrash 
                          onClick={() => {
                            onRemove(selectedTodo.id)
                          }}
                        />
                    </div>
                ) : (
                  <button type="submit">
                    <MdAddCircle />
                  </button>
                )}
            </form>
        </div>
    )
}

export default TodoInsert;