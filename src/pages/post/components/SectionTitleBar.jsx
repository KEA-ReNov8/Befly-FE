import styled from 'styled-components';
import theme from '@app/styles/theme';
export const SectionTitleBar = ({ title }) => {
  return <Wrapper>{title}</Wrapper>;
};

const Wrapper = styled.div`
  width: 1440px;
  height: 66px;
  background-color: ${theme.colors.green.main};
  color: #fff;
  font-size: 24px;
  font-weight: 700;
  display: flex;
  align-items: center;
  padding-left: 200px;
`;
