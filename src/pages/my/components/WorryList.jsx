import { useState } from 'react';
import styled from 'styled-components';
import theme from '@app/styles/theme';
import WorryPost from '@my/components/WorryPost';
import DeleteModal from '@my/components/DeleteModal';
const WorryList = () => {

    const postsPerPage = 8;
    const [currentPage, setCurrentPage] = useState(1);
    const [activeTab, setActiveTab] = useState('전체');
    const [isModalOpen, setIsModalOpen] = useState(false);
    
    // 이 부분은 실제 데이터를 가져오는 API 호출 부분으로 대체될 수 있습니다
    const dummyPosts = [
        { id: 1, category: '불안', status: '고민중', title: '오늘 너무 피곤해서 잠만 잤어요', date: '2023/11/24', time: '12:00' },
        { id: 2, category: '진로', status: '고민해결', title: '오늘 너무 피곤해서 잠만 잤어요', date: '2023/11/23', time: '12:00' },
        { id: 3, category: '진로', status: '고민중', title: '오늘 너무 피곤해서 잠만 잤어요', date: '2023/11/22', time: '12:00' },
        { id: 4, category: '진로', status: '고민해결', title: '오늘 너무 피곤해서 잠만 잤어요', date: '2023/11/21', time: '12:00' },
        { id: 5, category: '진로', status: '고민중', title: '오늘 너무 피곤해서 잠만 잤어요', date: '2023/11/20', time: '12:00' },
        { id: 6, category: '진로', status: '고민중', title: '오늘 너무 피곤해서 잠만 잤어요', date: '2023/11/19', time: '12:00' },
        { id: 7, category: '진로', status: '고민해결', title: '오늘 너무 피곤해서 잠만 잤어요', date: '2023/11/18', time: '12:00' },
        { id: 8, category: '진로', status: '고민중', title: '오늘 너무 피곤해서 잠만 잤어요', date: '2023/11/17', time: '12:00' },
        { id: 9, category: '진로', status: '고민해결', title: '오늘 너무 피곤해서 잠만 잤어요', date: '2023/11/16', time: '12:00' },
        { id: 10, category: '진로', status: '고민중', title: '오늘 너무 피곤해서 잠만 잤어요', date: '2023/11/15', time: '12:00' },
        { id: 11, category: '진로', status: '고민중', title: '오늘 너무 피곤해서 잠만 잤어요', date: '2023/11/14', time: '12:00' },
        { id: 12, category: '진로', status: '고민중', title: '오늘 너무 피곤해서 잠만 잤어요', date: '2023/11/13', time: '12:00' },
        { id: 13, category: '진로', status: '고민중', title: '오늘 너무 피곤해서 잠만 잤어요', date: '2023/11/12', time: '12:00' },
        { id: 14, category: '진로', status: '고민중', title: '오늘 너무 피곤해서 잠만 잤어요', date: '2023/11/11', time: '12:00' },
        { id: 15, category: '진로', status: '고민중', title: '오늘 너무 피곤해서 잠만 잤어요', date: '2023/11/10', time: '12:00' },
    ];

    const filteredPosts = activeTab === '전체' 
        ? dummyPosts 
        : dummyPosts.filter(post => post.status === activeTab);

    const totalPages = Math.ceil(filteredPosts.length / postsPerPage);
    const startIndex = (currentPage - 1) * postsPerPage;
    const endIndex = startIndex + postsPerPage;
    const visiblePosts = filteredPosts.slice(startIndex, endIndex);

    const handleTabChange = (tab) => {
        setActiveTab(tab);
        setCurrentPage(1);
    };
    const handleDeleteClick = () => {
        setIsModalOpen(true);
    };
    const handleModalClose = () => {
        setIsModalOpen(false);
    };

    return (
        <Container>
            <TabContainer>
                    <TabButton data-isActive={activeTab === '전체'} onClick={() => handleTabChange('전체')}>전체</TabButton>
                    <TabButton data-isActive={activeTab === '고민중'} onClick={() => handleTabChange('고민중')}>고민중</TabButton>
                    <TabButton data-isActive={activeTab === '고민해결'} onClick={() => handleTabChange('고민해결')}>고민해결</TabButton>
            </TabContainer>
            <WorryPost filteredPosts={visiblePosts} onDeleteClick={handleDeleteClick}/>
            <Pagination>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <PageButton key={page} data-isActive={page === currentPage} onClick={() => setCurrentPage(page)}> {page} </PageButton>
                ))}
            </Pagination>
            {isModalOpen && <DeleteModal onClose={handleModalClose} />}
        </Container>
    );
};

const Container = styled.div`
    width: 1044px;
    height: 776px;
    display: flex;
    flex-direction: column;
    margin: 0 auto;
    background-color: ${theme.colors.other.white};
    box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
    margin-bottom: 100px;
    align-items: center;
`;

const TabContainer = styled.div`
    margin-top: 20px;
    margin-right: 60%;
    width: 282px;
    height: 32px;
    display: flex;
    background-color: ${theme.colors.gray[100]};
    border-radius: 4px;
    overflow: hidden;
    box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
    align-items: center;
    justify-content: center;
`;

const TabButton = styled.button`
    flex: 1;
    padding: 10px;
    border: none;
    background-color: ${props => props['data-isActive'] ? '#00C192' : 'transparent'};
    color: ${props => props['data-isActive'] ? theme.colors.other.white : theme.colors.gray[900]};
    cursor: pointer;
    transition: all 0.3s;
    
    &:hover {
        background-color: ${props => props['data-isActive'] ? '#00C192' : theme.colors.gray[300]};
        transition: scale(1.05);
    }
`;

const Pagination = styled.div`
    display: flex;
    justify-content: center;
    margin-top: 20px;
`;

const PageButton = styled.button`
    width: 30px;
    height: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    border: none;
    background-color: ${props => props['data-isActive'] ? '#00C192' : theme.colors.other.white};
    color: ${props => props['data-isActive'] ? theme.colors.other.white : theme.colors.gray[900]};
    margin: 0 5px;
    border-radius: 4px;
    cursor: pointer;
    
    &:hover {
        background-color: ${props => props['data-isActive'] ? '#00C192' : theme.colors.gray[300]};
    }
`;

export default WorryList;
