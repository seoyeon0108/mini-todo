import React from "react";
import styled from 'styled-components';

const TemplateBlock = styled.div`
   padding: 20px;
   max-height: 100vh;
   .title{
    width: 90vw;
    margin-left: auto;
    margin-right: auto;

    padding-bottom: 20px;
    font-size: 1.5rem;
    font-weight: bold;
    color: #6c567b;
    }
`

const Template = ({children, todoLength}) => {
    return (
        <TemplateBlock>
            <div className="title">오늘의 할 일 ({todoLength})</div>
            <div>{children}</div>
        </TemplateBlock>
    )
} 

export default Template;