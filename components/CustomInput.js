import styled from "styled-components"

const StyledInput = styled.input`
width: 100%;
padding:6px;
margin-buttom: 5px;
border: 1px solid #ccc;
border-radius: 5px;
box-sizing:border-box;
margin:1px;

`;

export default function CustomInput(props){
    return <StyledInput {...props}/>
} 