import React, { useEffect, useState } from "react";
import { MdAddCircle } from "react-icons/md";
import { TiTrash, TiPencil } from "react-icons/ti"
import styled from "styled-components";

const Background = styled.div`
    position: fixed;
    z-index: 980;
    top: 0;
    overflow: hidden;
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #6c567b;
    opacity: 0.8;
`

const InsertForm = styled.form`
    margin-left: 20px;
    position: fixed;
    top: 40%;
    display:  flex;
    flex-direction: column;
    align-items: center;
    z-index: 990;
    width: 300px;
    height: 150px;
    border-radius: 5px;
    box-shadow: 1px 2px 5px 1px #f67280;
    background: white;
`
const Input = styled.input`
    background: none;
    outline:  none;
    border:  none;
    border-bottom:  1px solid #f67280;

    margin-top: 30px;
    padding:  0.5rem;
    font-size: 1.125rem;
    line-height: 1.5;
`

const AddButton = styled.button`
    padding-top: 20px;
    background: none;
    outline: none;
    border: none;
    color: #f67280;
    padding-left: 1rem;
    padding-right: 1rem;
    font-size: 1.5rem;
    display: flex;
    align-items: center;
    cursor: pointer;
    transition: 0.1s background ease-in;
`
const Edit = styled.div`
    padding-top: 20px;
    color: #f67280;
    padding-left: 1rem;
    padding-right: 1rem;
    font-size:  1.5rem;
`




const TodoInsert = ({onInsertToggle, onInsertTodo, selectedTodo, onRemove, onUpdate}) => {
    const [value, setValue] = useState('');

    const onChange = (e) => {
        setValue(e.target.value);
    }
    
    // 새 할일 추가
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
            <Background className="background" onClick={onInsertToggle}></Background> 
            <InsertForm 
              onSubmit={ 
                selectedTodo 
                  ? () => {
                      onUpdate(selectedTodo.id, value)
                    } 
                  : onSubmit
              } /* 여기는 왜 삼항연산자를 사용하는지 모르겠음,,,TiPencil이 submit하는 것도 아닌데.. 왜 삼항 연산자가 필요하지?? 없애고 onSubmit만 해도 잘되는데...
                 --> 왜냐면 enter로도 등록되길 원해서!!@~!@ */
            >
              <Input placeholder="please type" value={value} onChange={onChange}></Input>
                {/* 추가하는거와 수정하는 토글의  */}
                {selectedTodo ? (
                    <Edit>
                        <TiPencil 
                          onClick={() => {
                            onUpdate(selectedTodo.id, value)
                          }}
                        />
                        <TiTrash 
                          onClick={() => {
                            onRemove(selectedTodo.id)
                          }}
                        />
                    </Edit>
                ) : (
                  <AddButton type="submit">
                    <MdAddCircle />
                  </AddButton>
                )}
            </InsertForm>
        </div>
    )
}

export default TodoInsert;