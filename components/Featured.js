import Center from "./Center";
import styled from "styled-components";
import Button from "./Button";
import ButtonLink from "./ButtonLink";

const Bg = styled.div`
background-color: #cccccc;
color:#000000;
padding: 50px 0;
`;

const Title = styled.h1`
margin:0;
font-weight:normal;
font-size:3rem;
`;


const Desc = styled.p`
color:#fff;
font-size:.8rem;
`;
const ColumnsWrapper = styled.div`
 display:grid;
 grid-template-columns: 1.1fr 0.9fr;
 gap:40px;
 img{
    max-width:100%;
 }
`;

const Column = styled.div`
  display: flex;
  align-items: center;
`;

const ButtonsWrapper = styled.div`
  display: flex;
  gap: 10px;
  margin-top:25px;
`;
export default function Featured({product}){
  return (
    <div>
      <Bg>
        <Center>
          <ColumnsWrapper>
            <Column>
              <div>
                <Title>{product.productName}</Title>
                <Desc>{product.description}</Desc>
                <ButtonsWrapper>
                  <ButtonLink
                    href={"/products/" + product.productId}
                    outline={1}
                    white={1}
                  >
                    Devamını oku
                  </ButtonLink>
                  <Button primary>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      class="w-6 h-6"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
                      />
                    </svg>
                    Sepete ekle
                  </Button>
                </ButtonsWrapper>
              </div>
            </Column>
            <Column>
              <img
                src="data:image/jpeg;base64,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"
                alt="resim"
              />
            </Column>
          </ColumnsWrapper>
        </Center>
      </Bg>
    </div>
  );
}