import styled from 'styled-components';
import NotificationItem from './NotificationItem';
import theme from '@/app/styles/theme';
import { useGetNotificationQuery } from '@shared/hooks/useGetNotificationQuery';

const NotificationModal = () => {
  const { data: notifications = [] } = useGetNotificationQuery();
  
  console.log('NotificationModal에서 받은 notifications:', notifications);
  
  // 알람 세부 기능은 백 연결하고 추가
  return (
    <Wrapper>
      <ItemList>
        {notifications.map((notification, index) => (
          <NotificationItem key={index} content={notification} />
        ))}
      </ItemList>
    </Wrapper>
  );
};

export default NotificationModal;

const Wrapper = styled.div`
  width: 330px;
  height: 195px;
  position: absolute;
  top: 55px;
  left: 50%;
  transform: translateX(-20%);
  background-color: ${theme.colors.other.white};
  border-radius: 8px;
  border: 1px solid ${theme.colors.gray[400]};
  overflow-y: auto;
  overflow-x: auto;
  padding: 10px 16px;
  box-sizing: border-box;
  z-index: 1000;
`;

const ItemList = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;
