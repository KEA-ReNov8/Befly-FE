import styled from 'styled-components';
import NotificationItem from './NotificationItem';
import theme from '@/app/styles/theme';
// 임시 목데이터
const dummyNotifications = [
  { id: 1, content: 'OOO님이 댓글을 달았습니다.', time: '0분전' },
  { id: 2, content: 'OOO님이 댓글을 달았습니다.', time: '0분전' },
  { id: 3, content: 'OOO님이 댓글을 달았습니다.', time: '0분전' },
  { id: 4, content: 'OOO님이 댓글을 달았습니다.', time: '0분전' },
  { id: 5, content: 'OOO님이 댓글을 달았습니다.', time: '0분전' },
  { id: 6, content: 'OOO님이 댓글을 달았습니다.', time: '0분전' },
  { id: 7, content: 'OOO님이 댓글을 달았습니다.', time: '0분전' },
  { id: 8, content: 'OOO님이 댓글을 달았습니다.', time: '0분전' },
  { id: 9, content: 'OOO님이 댓글을 달았습니다.', time: '0분전' },
];

const NotificationModal = () => {
  // 알람 세부 기능은 백 연결하고 추가
  return (
    <Wrapper>
      <ItemList>
        {dummyNotifications.map((item) => (
          <NotificationItem key={item.id} content={item.content} time={item.time} />
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
