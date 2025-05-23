import PropTypes from 'prop-types';
import styled from 'styled-components';
import theme from '@app/styles/theme';
import ChatMenu from '@shared/assets/icons/ChatMenuicon.svg';
import SideBarButton from '@chat/components/SideBarButton';

const SideBar = ({ isOpen, onClose }) => {
    return (
        <SideBarContainer data-isOpen={isOpen}>
            <SideBarHeader>
                <MenuButton onClick={onClose}>
                    <img src={ChatMenu} alt="close" />
                </MenuButton>
            </SideBarHeader>
            <SideBarContent>
                <SideBarButton active/>
                <SideBarButton active={false}/>
                <SideBarButton active={false}/>
                <SideBarButton active={false}/>
                <SideBarButton active={false}/>
                <SideBarButton active={false}/>
            </SideBarContent>
        </SideBarContainer>
    );
};

const SideBarContainer = styled.div`
    width: 250px;
    height: 100%;
    display: flex;
    flex-direction: column;
    border-right: 1px solid ${theme.colors.gray[200]};
    background-color: ${theme.colors.gray[200]};
`;

const SideBarHeader = styled.div`
    height: 120px;
    display: flex;
    align-items: center;
    border-bottom: 1px solid ${theme.colors.gray[500]};
`;

const MenuButton = styled.button`
    padding-left: 30px;
    margin-top: 5px;
    background: none;
    border: none;
    cursor: pointer;
`;

const SideBarContent = styled.div`
    flex: 1;
    overflow-y: auto;
    list-style: none;
    padding: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    gap: 10px;
`;

export default SideBar;
