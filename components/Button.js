import styled, { css } from "styled-components";

export const ButtonStyle = css`
border:0;
padding: 5px 15px;
border-radius: 5px;
cursor: pointer;
display: inline-flex;
align-items:center;
text-decoration:none;
svg{
    height: 16px;
    margin-right: 5px;
}
${props=> props.white && !props.outline && css`
background-color: #fff;
color:#000;
`}
${props=> props.white && props.outline && css`
background-color: transparent;
color:#C90003;
border: 1px solid #C90003;
`}
${props=> props.primary && css`
background-color:#C90003;
border: 1px solid #C90003;
color:#fff;
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