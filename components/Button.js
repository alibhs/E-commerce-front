import styled, { css } from "styled-components";
import { primary } from "./lib/colors";

export const ButtonStyle = css`
border:0;
padding: 5px 15px;
border-radius: 5px;
cursor: pointer;
display: inline-flex;
align-items:center;
text-decoration:none;
font-family:'Poppins',sans-serif;
font-weight: 600;
svg{
    height: 16px;
    margin-right: 5px;
}
${props => props.block && css `
display:block;
width:100%;
`}
${props=> props.white && !props.outline && css`
background-color: #fff;
color:#000;
`}
${props=> props.black && !props.outline && css`
background-color: #000;
color:#fff;
`}
${props=> props.white && props.outline && css`
background-color: transparent;
color: ${primary};
border: 1px solid  ${primary};
`}
${props=> props.primary && !props.outline && css`
background-color: ${primary};
border: 1px solid  ${primary};
color:#fff;
`}

${props=> props.primary && props.outline && css`
background-color:transparent;
border: 1px solid  ${primary};
color: ${primary};
`}

${props => props.size === 'l' && css`
    font-size:1.2rem;
    padding: 10px 20px;
    svg{
        height: 20px;
    }
`}
`;

const StyledButton = styled.button`
    ${ButtonStyle};
`;

export default function Button({children,...rest}){
    //...rest size i ekleme ve başka propertyleri eklerken tek tek yazmak yerine toplu yazmaya yarar

    return(
        <StyledButton {...rest}>{children}</StyledButton>
    );
}