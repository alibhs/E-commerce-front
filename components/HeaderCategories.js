import Link from "next/link";
import styled from "styled-components";
import Center from "./Center";
import {useState,useEffect } from "react";
import axios from "axios";

const StyledHeader = styled.header`
background-color: #1B1B1B;

`;

const Wrapper = styled.div`
display:flex;
justify-content: space-between;
padding: 20px 0;
`;
const StyledCategory = styled.div`
display: flex;
gap: 15px;
`;
const CategoryName = styled(Link)`
padding:0;
margin:0;
color:#fff; 
text-decoration:none;
`;




export default function HeaderCategories(){
  const [categories,setCategories] = useState([]);
  useEffect(()=>{
   axios.get("https://localhost:44374/api/Categories/getall").then(response =>{
       setCategories(response.data);
   })
  },[]);

    return (
      <StyledHeader>
        <Center>
          <Wrapper>
            <StyledCategory>
              {categories.map((c) => (
                <CategoryName href={"/category/"+c.categoryId} key={c.categoryId}>{c.categoryName}</CategoryName>
              ))}
            </StyledCategory>
          </Wrapper>
        </Center>
      </StyledHeader>
    );
}