import React from "react";
import styled from "styled-components";

const PayBodyContainer = styled.div`
  display: grid;
  width: 100%;
  height: 100vh;
  grid-template-rows: 0.3fr 0.1fr 0.18fr 0.1fr 0.1fr 0.2fr;
  position: relative;
`;

const Image = styled.img`
  width: 100px;
  height: 100px;
  margin: auto;
  display: block;
`;

const Text1 = styled.div`
  text-align: center;
  font-size: 28px;
  font-weight: 900;
  color: #444444;
  span {
    color: #3562FF;
  }
`;

const Text3 = styled.div`
  text-align: center;
  font-size: 11px;
  font-weight: 900;
  color: #444444;
`;

const Text2 = styled.div`
  text-align: center;
  font-size: 19px;
  font-weight: 700;
  color: #444444;
  span {
    &.span1 {
      color: #F4DE13;
      font-size: 21px;
    }
    &.span2 {
      font-size: 24px;
    }
  }
  line-height: 2;
  margin-bottom: 2px;
`;

const Button1Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 10px 0;
`;

const Button1 = styled.button`
  background-color: #FFFFFF;
  color: 000000;
  border: none;
  border-radius: 21px;
  cursor: pointer;
  font-size: 11px;
  font-weight: 900;
  padding: 5px 15px;
  span {
    font-size: 20px;
  }
`;

const Button2Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

const Button2 = styled.button`
  background-color: #FFFFFF;
  color: 000000;
  padding: 10px;
  border: 1px solid #000000;
  border-radius: 29px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 900;
`;

function PayComplete() {
  return (
    <PayBodyContainer>
      <Image src="./image/payComplete.png" alt="Image" />
      <Text1>
        <span> 5,000원 </span> 결제 성공 !
      </Text1>
      <div>
      <Text2>
        상대방의 <span className="span1"> 카카오톡 아이디 </span>
      </Text2>
      <Button1Container>
          <Button1> <span>jwh1802</span> <br/> 카카오톡 아이디 복사하기</Button1>
        </Button1Container>
      </div>
      <div>
      <Button2Container>
          <Button2>홈으로 가기.</Button2>
        </Button2Container>
      </div>
    </PayBodyContainer>
  );
}

export default PayComplete;
