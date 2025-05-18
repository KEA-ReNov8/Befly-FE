import styled from 'styled-components';
import theme from '@app/styles/theme';
import { useNavigate } from 'react-router-dom';
import closeIcon from '@shared/assets/icons/Xmark.svg';


const SuccessModal = ({ onClose }) => {

    const navigate = useNavigate();

    const handleReportClick = () => {
        navigate('/report');
    };

    const handleListClick = () => {
        navigate('/list');
    };

    return (
        <ModalOverlay>
            <ModalContainer>
                <CloseButton onClick={onClose}>
                    <img src={closeIcon} alt="close" />
                </CloseButton>
                <Img />
                <TitleContainer>
                    <Title>마음의 짐이 덜어졌나요?</Title>
                    <Title>분석을 통해 자기 이해를 해보세요!</Title>
                </TitleContainer>
                <ButtonContainer>
                    <ListButton onClick={handleListClick}>목록으로 가기</ListButton>
                    <ReportButton onClick={handleReportClick}>분석 보기</ReportButton>
                </ButtonContainer>
            </ModalContainer>
        </ModalOverlay>
    );
};

const ModalOverlay = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1000;
    background-color: rgba(0, 0, 0, 0.5);
`;

const ModalContainer = styled.div`
    width: 344px;
    height: 420px;   
    display: flex;
    align-items: center;
    flex-direction: column;
    overflow: hidden;
    z-index: 1001;
    border-radius: 15px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
    background-color: white;
`;

const CloseButton = styled.button`
    margin-top: 10px;
    margin-left: 85%;
    background: none;
    border: none;
    cursor: pointer;
`;

const Img = styled.img`
    margin-top: 30px;
    width: 150px;
    height: 150px;
    border-radius: 50%;
    background-color: ${theme.colors.gray[500]};
`;

const TitleContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-top: 20px;
`;

const Title = styled.h2`
    margin-top: 10px;
    font-size: ${theme.fontSize.smallMedium};
    font-family: ${theme.fontFamily.pretendard};
`;

const ButtonContainer = styled.div`
    display: flex;
    margin-top: 30px;
    gap: 15px;
`;

const ReportButton = styled.button`
    width: 134px;
    height: 40px;
    border-radius: 10px;
    cursor: pointer;
    border: none;
    cursor: pointer;
    color: white;
    background-color: ${theme.colors.green.main};
    font-family: ${theme.fontFamily.pretendard};
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    
    &:hover {
        background-color: ${theme.colors.green[80]};
    }
`;

const ListButton = styled.button`
    width: 134px;
    height: 40px;
    border-radius: 10px;
    cursor: pointer;
    border: none;
    background-color: white;
    border: 1px solid ${theme.colors.gray[500]};
    font-family: ${theme.fontFamily.pretendard};
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);

    &:hover {
        background-color: ${theme.colors.gray[500]};
    }
`;

export default SuccessModal;
