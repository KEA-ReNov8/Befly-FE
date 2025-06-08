import { useState } from 'react';
import styled from 'styled-components';
import theme from '@app/styles/theme';
import WorryPost from '@my/components/WorryPost';
import DeleteModal from '@my/components/DeleteModal';
import { useChatSessionListQuery } from '@chat/feature/hooks/query/useChatSessionListQuery';

const WorryList = () => {

    const postsPerPage = 8;
    const [currentPage, setCurrentPage] = useState(1);
    const [activeTab, setActiveTab] = useState('전체');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [sessionToDelete, setSessionToDelete] = useState(null);

    const getStatusForQuery = (tab) => {
        switch (tab) {
            case '고민중': return 'true';
            case '고민해결': return 'false';
            default: return 'all';
        }
    };

    const { data: chatList, isLoading, error } = useChatSessionListQuery(getStatusForQuery(activeTab));

    const chatSessions = chatList?.result || [];

    const transformedPosts = chatSessions.map(session => ({
        id: session.session_id,
        session_id: session.session_id,
        category: session.category || '기타',
        status: session.status ? '고민중' : '고민해결',
        title: session.chat_title || '제목 없음',
        date: session.created_at ? new Date(session.created_at).toLocaleDateString('ko-KR') : '날짜 없음',
        time: session.created_at ? new Date(session.created_at).toLocaleTimeString('ko-KR', { 
            hour: '2-digit', 
            minute: '2-digit' 
        }) : '시간 없음'
    }));

    const totalPages = Math.ceil(transformedPosts.length / postsPerPage);
    const startIndex = (currentPage - 1) * postsPerPage;
    const endIndex = startIndex + postsPerPage;
    const visiblePosts = transformedPosts.slice(startIndex, endIndex);

    const handleTabChange = (tab) => {
        setActiveTab(tab);
        setCurrentPage(1);
    };
    const handleDeleteClick = (post) => {
        setIsModalOpen(true);
        setSessionToDelete(post);
    };
    const handleModalClose = () => {
        setIsModalOpen(false);
        setSessionToDelete(null);
    };

    return (
        <Container>
            <Header>
                <TabContainer>
                    <TabButton data-isActive={activeTab === '전체'} onClick={() => handleTabChange('전체')}>전체</TabButton>
                    <TabButton data-isActive={activeTab === '고민중'} onClick={() => handleTabChange('고민중')}>고민중</TabButton>
                    <TabButton data-isActive={activeTab === '고민해결'} onClick={() => handleTabChange('고민해결')}>고민해결</TabButton>
                </TabContainer>
            </Header>
            <CategoryContainer>
                <CategoryStatus>진행여부</CategoryStatus>
                <CategoryCategory>카테고리</CategoryCategory>
                <CategoryTitle>제목</CategoryTitle>
                <CategoryDate>날짜</CategoryDate>
            </CategoryContainer>
            <WorryPost 
                filteredPosts={visiblePosts} 
                onDeleteClick={handleDeleteClick} 
                activeTab={activeTab}
            />
            {visiblePosts.length === 0 && (
                <EmptyStateContainer>
                    <EmptyTitle>
                        {activeTab === '전체' ? '아직 고민이 없어요' : 
                         activeTab === '고민중' ? '진행 중인 고민이 없어요' : 
                         '해결된 고민이 없어요'}
                    </EmptyTitle>
                    <EmptyDescription>
                        {activeTab === '전체' ? '새로운 고민을 시작해보세요!' : 
                         activeTab === '고민중' ? '새로운 고민을 시작해보세요!' : 
                         '고민을 해결해보세요!'}
                    </EmptyDescription>
                </EmptyStateContainer>
            )}
            <Pagination>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <PageButton
                        key={page}
                        data-isOn={page === currentPage}
                        onClick={() => setCurrentPage(page)}
                    >
                        {page}
                    </PageButton>
                ))}
            </Pagination>
            {isModalOpen && <DeleteModal onClose={handleModalClose} sessionToDelete={sessionToDelete} />}
        </Container>
    );
};

const Container = styled.div`
    width: 1140px;
    height: 776px;
    display: flex;
    flex-direction: column;
    margin: 0 auto;
    align-items: center;
`;

const Header = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

const TabContainer = styled.div`
    width: 100%;
    display: flex;
    align-items: center;    
    margin-top: 30px;
    margin-left: 100px;
    gap: 30px;
`;

const TabButton = styled.button`
    width: 80px;
    height: 35px;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    padding: 10px;
    border: none;
    border-radius: 20px;
    border: 1px solid ${theme.colors.gray[400]};
    background-color: ${props => props['data-isActive'] ? theme.colors.green[800] : 'transparent'};
    color: ${props => props['data-isActive'] ? theme.colors.other.white : theme.colors.gray[900]};
    border: 1px solid ${props => props['data-isActive'] ? theme.colors.green.light : theme.colors.gray[400]};
    cursor: pointer;
    transition: all 0.3s;
    font-size: ${theme.fontSize.md};
    font-weight: ${theme.fontWeight.medium};
    
    &:hover {
        background-color: ${props => props['data-isActive'] ? theme.colors.green.hover : theme.colors.gray[300]};
    }
`;

const CategoryContainer = styled.div`
    width: 1140px;
    margin-top: 30px;
    display: flex;
    align-items: center;
    margin-right: auto;
    margin-left: 80px;
`;

const CategoryStatus = styled.div` 
    width: 110px;
    text-align: center;
    margin-left: 5px;
    font-size: ${theme.fontSize.lgMd};
    font-weight: ${theme.fontWeight.semibold};
    border-right: 1px solid ${theme.colors.gray[400]};
`;

const CategoryCategory = styled.div` 
    width: 110px;
    margin-left: 5px;
    text-align: center;
    font-size: ${theme.fontSize.lgMd};
    font-weight: ${theme.fontWeight.semibold};
    border-right: 1px solid ${theme.colors.gray[400]};
`;

const CategoryTitle = styled.div` 
    width: 550px;
    text-align: center;
    font-size: ${theme.fontSize.lgMd};
    font-weight: ${theme.fontWeight.semibold};
    border-right: 1px solid ${theme.colors.gray[400]};
`;

const CategoryDate = styled.div`
    width: 200px;
    margin-left: 80px;
    font-size: ${theme.fontSize.lgMd};
    font-weight: ${theme.fontWeight.semibold};
`;

const EmptyStateContainer = styled.div`
    width: 100%;
    height: 300px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 16px;
    margin: 40px 0;
`;

const EmptyTitle = styled.h3`
    font-size: ${theme.fontSize.lg};
    font-weight: ${theme.fontWeight.semibold};
    color: ${theme.colors.gray[600]};
    margin: 0;
`;

const EmptyDescription = styled.p`
    font-size: ${theme.fontSize.md};
    color: ${theme.colors.gray[500]};
    text-align: center;
    line-height: 1.5;
    margin: 0;
`;

const Pagination = styled.div`
    display: flex;
    justify-content: center;
    margin-top: 10px;
    gap: 10px;
`;

const PageButton = styled.button`
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: ${theme.fontSize.md};
  font-weight: ${theme.fontWeight.medium};
  text-decoration: ${props => props['data-isOn'] ? 'underline' : 'none'};
  text-decoration-color: ${theme.colors.green.main};
  color: ${props => props['data-isOn'] ? theme.colors.green.main : theme.colors.gray[900]};
  cursor: pointer;
`;

export default WorryList;
