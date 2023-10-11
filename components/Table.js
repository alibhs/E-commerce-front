import styled from "styled-components";

const StyledTable = styled.table`
width: 100%;
th{
    text-align:left;
    text-transform: uppercase;
    color:#E10514;
    font-weight: 600;
    font-size: .8rem;

}
td{
    border-top: 1px solid #E10514;
    font-weight:bold;
}
`;


export default function Table(props){
 return <StyledTable {...props} />
}