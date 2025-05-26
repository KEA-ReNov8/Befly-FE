import { Outlet } from 'react-router'
import theme from '@app/styles/theme'
import styled from 'styled-components';
import Footer from '@shared/ui/Footer';

export default function RootLayout() {
    return (
        <Wrapper>
            <Outlet />
            <Footer />
        </Wrapper>
    )
}

const Wrapper = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: 0 auto;
    background-color: ${theme.colors.other.white};
  //padding: env(safe-area-inset-top) env(safe-area-inset-right) env(safe-area-inset-bottom) env(safe-area-inset-left);
`;
