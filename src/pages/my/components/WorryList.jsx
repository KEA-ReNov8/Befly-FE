import { useState } from 'react';
import styled from 'styled-components';
import theme from '@app/styles/theme';
import WorryPost from '@my/components/WorryPost';
import DeleteModal from '@my/components/DeleteModal';
import { SearchBar } from '@post/components/postlist/SearchBar';

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
            <Header>
                <TabContainer>
                        <TabButton data-isActive={activeTab === '전체'} onClick={() => handleTabChange('전체')}>전체</TabButton>
                        <TabButton data-isActive={activeTab === '고민중'} onClick={() => handleTabChange('고민중')}>고민중</TabButton>
                        <TabButton data-isActive={activeTab === '고민해결'} onClick={() => handleTabChange('고민해결')}>고민해결</TabButton>
                </TabContainer>
                <SearchContainer>
                    <SearchBar />
                </SearchContainer>
            </Header>
            <CategoryContainer>
                <CategoryStatus>진행여부</CategoryStatus>
                {activeTab !== '고민해결' ? (
                    <CategoryCategory>카테고리</CategoryCategory>
                    ) : (
                    <CategoryCategory style={{ visibility: 'hidden', opacity: 0 }}>카테고리</CategoryCategory>
                    )}
                <CategoryTitle>제목</CategoryTitle>
                <CategoryDate>날짜</CategoryDate>
            </CategoryContainer>
            <WorryPost filteredPosts={visiblePosts} onDeleteClick={handleDeleteClick} activeTab={activeTab}/>
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
            {isModalOpen && <DeleteModal onClose={handleModalClose} />}
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

const SearchContainer = styled.div`
    margin-top: 20px;
    display: flex;
    align-items: center;
    margin-bottom: 10px;
    margin-right: 75px;
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
    background-color: ${props => props['data-isActive'] ? theme.colors.green.main : 'transparent'};
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
