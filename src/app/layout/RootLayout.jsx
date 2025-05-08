import { Outlet } from 'react-router'
import theme from '@app/styles/theme'
import styled from 'styled-components';

export default function RootLayout() {
    return (
        <Wrapper>
            <Outlet />
        </Wrapper>
    )
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 1280px; //조정 필요
  height: 100vh;
  margin: 0 auto;
  background-color: ${theme.color};
  //padding: env(safe-area-inset-top) env(safe-area-inset-right) env(safe-area-inset-bottom) env(safe-area-inset-left);
`;