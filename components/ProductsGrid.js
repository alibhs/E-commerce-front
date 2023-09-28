import styled from "styled-components";
import ProductBox from "./ProductBox";

const StyledProductsGrid = styled.div`
display: grid;
grid-template-columns: 1fr 1fr 1fr 1fr;
gap: 20px;
padding-top:30px;
`;

export default function ProductsGrid({products}){
    return (
      <StyledProductsGrid>
        {products.map((p) => (
          <ProductBox key={p.productId} {...p} />
        ))}
      </StyledProductsGrid>
    );
}   