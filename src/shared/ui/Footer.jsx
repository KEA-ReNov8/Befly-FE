import styled from 'styled-components';
import theme from '@app/styles/theme';

const Footer = () => {
    return (
      <FooterContainer>
        <FooterText>© 2025 BeFly. All rights reserved.</FooterText>
      </FooterContainer>
    );
  };

const FooterContainer = styled.footer`
  width: 100%;
  padding: 20px 0;
  text-align: center;
  background-color: ${theme.colors.gray[300]};
  color: ${theme.colors.gray[600]};
  font-family: ${theme.fontFamily.pretendard};
  font-size: 14px;
  position: relative;
  bottom: 0;
`;

const FooterText = styled.p`
  margin: 0;
`;
  
export default Footer;