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
        {notifications.length === 0 ? (
          <EmptyStateContainer>
            <EmptyTitle>새로운 알림이 없어요</EmptyTitle>
            <EmptyDescription>새로운 소식이 있으면 알려드릴게요!</EmptyDescription>
          </EmptyStateContainer>
        ) : (
          notifications.map((notification, index) => (
            <NotificationItem key={index} content={notification} />
          ))
        )}
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

const EmptyStateContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;
  margin-top: 60px;
`;

const EmptyTitle = styled.h4`
  font-size: ${theme.fontSize.md};
  font-weight: ${theme.fontWeight.semibold};
  color: ${theme.colors.gray[600]};
  margin: 0;
  text-align: center;
`;

const EmptyDescription = styled.p`
  font-size: ${theme.fontSize.sm};
  color: ${theme.colors.gray[500]};
  text-align: center;
  line-height: 1.4;
  margin: 0;
`;
