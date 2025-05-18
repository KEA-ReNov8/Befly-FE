import styled from 'styled-components';
import theme from '@app/styles/theme';
const NotificationTem = ({ content, time }) => {
  return (
    <ItemWrapper>
      <Message>{content}</Message>
      <Time>{time}</Time>
    </ItemWrapper>
  );
};

export default NotificationTem;

const ItemWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0;
  font-size: 12px;
  color: ${theme.colors.gray[600]};
  border-bottom: 1px solid ${theme.colors.gray[200]};

  &:last-child {
    border-bottom: none;
  }
`;

const Message = styled.span`
  flex: 1;
`;

const Time = styled.span`
  flex-shrink: 0;
  font-size: 11px;
  color: ${theme.colors.gray[500]};
  margin-left: 10px;
`;
