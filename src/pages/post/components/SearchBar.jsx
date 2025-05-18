import styled from 'styled-components';
import SearchIcon from '@shared/assets/icons/search.svg';
import theme from '@app/styles/theme';

export const SearchBar = () => {
  return (
    <Wrapper>
      <Input type="text" placeholder="검색어를 입력해주세요." />
      <SearchButton>
        <img src={SearchIcon} alt="search" width={25} height={25} />
      </SearchButton>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 480px;
  height: 35px;
  margin-top: 20px;
  display: flex;
  align-items: center;
  border: 1.5px solid ${theme.colors.gray[300]};
  border-radius: 10px;
  overflow: hidden;
`;

const Input = styled.input`
  width: 480px;
  height: 100%;
  border: none;
  padding: 0 16px;
  font-size: 14px;
  &:focus {
    outline: none;
  }
`;

const SearchButton = styled.button`
  width: 35px;
  height: 100%;
  border: none;
  background-color: #fff;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
`;
