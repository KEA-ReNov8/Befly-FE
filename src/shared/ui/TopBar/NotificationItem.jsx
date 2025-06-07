import styled from 'styled-components';
import theme from '@app/styles/theme';
const NotificationTem = ({ content}) => {
  return (
    <ItemWrapper>
      <Message>{content}</Message>
    </ItemWrapper>
  );
};

export default NotificationTem;

const ItemWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding:15px 0;
  font-size: ${theme.fontSize.smMd};
  color: ${theme.colors.gray[800]};
  border-bottom: 1px solid ${theme.colors.gray[300]};

  &:last-child {
    border-bottom: none;
  }
`;

const Message = styled.span`
  flex: 1;
`;

const Time = styled.span`
  flex-shrink: 0;
  font-size: ${theme.fontSize.sm};
  color: ${theme.colors.gray[600]};
  margin-left: 10px;
`;
