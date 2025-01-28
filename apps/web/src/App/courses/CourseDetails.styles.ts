import styled from "styled-components";
import { Button } from 'antd';

export const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  padding: 20px;
  flex-direction: column;
  align-items: center;
`;
export const Title = styled.h1`
  text-align: center;
`;

export const TitleBar = styled.div`
  width: 100%;
  background-color: #f5f5f5;
  padding: 10px 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  position: relative;
`;

export const TitleBarButton = styled(Button)`
position: absolute;
left: 20px;
background-color: white;
border-radius: 5px;
`;