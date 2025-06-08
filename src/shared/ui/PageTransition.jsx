import styled, { keyframes } from 'styled-components';

// 페이지 접속 시 떠오르는 애니메이션
const slideUpFade = keyframes`
  from {
    opacity: 0;
    transform: translateY(50px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const AnimatedPageWrapper = styled.div`
  animation: ${slideUpFade} 0.8s ease-out both;
  width: 100%;
  min-height: 100vh;
  position: relative;
`;

export const PageTransition = ({ children, ...props }) => {
  return (
    <AnimatedPageWrapper {...props}>
      {children}
    </AnimatedPageWrapper>
  );
}; 
