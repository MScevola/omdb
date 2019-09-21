import React from 'react';
import styled from 'styled-components';

const InputContainer = styled.label`
    position: relative;
    display: block;
    width: 100%;

    input{
        position: relative;
        display: block;
        width: 100%;
        box-sizing: border-box;
        background: white;
        border: #999 solid thin;
        border-radius: 6px;
        padding: 14px;
        font-size: 18px;
        box-sizing: border-box;
        color: #999;

        &:focus{
            outline: rgba(255, 255, 255, .5);
        }
    }

    .placeholder{
        position: relative;
        display: block;
        font-size: 12px;
        margin: 0 0 6px;
    }
`

const Input = ({type, name, value, placeholder, onChange, onClick}) => {
    return(
        <InputContainer>
            <span className="placeholder">{placeholder}</span>
            <input type={type} name={name} value={value} onChange={onChange} onClick={onClick} />
        </InputContainer>
    )
}

export default Input;
