import styled from 'styled-components';
import theme from '@app/styles/theme';
import { useNavigate, useParams } from 'react-router-dom';
import closeIcon from '@shared/assets/icons/Xmark.svg';
import { useConsultResultQuery } from '@chat/feature/hooks/query/useConsultResultQuery';


const SuccessModal = ({ onClose }) => {

    const navigate = useNavigate();
    const { sessionId } = useParams();
    const consultResultQuery = useConsultResultQuery(sessionId);

    const handleReportClick = async () => {
        if(!sessionId) {
            alert('세션 정보를 찾을 수 없습니다.');
            return;
        }

        try {
            await consultResultQuery.refetch();

            navigate(`/report/${sessionId}`);
        } catch (error) {
            console.error('평가 API 호출 실패:', error);
        }
    };

    const handleListClick = async () => {
        if(!sessionId) {
            alert('세션 정보를 찾을 수 없습니다.');
            return;
        }

        try {
            await consultResultQuery.refetch();

            navigate('/my/myworry');
        } catch (error) {
            console.error('평가 API 호출 실패:', error);
        }
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
                    <ListButton 
                        onClick={handleListClick}
                        disabled={consultResultQuery.isLoading}
                    >
                        {consultResultQuery.isLoading ? '처리 중...' : '목록으로 가기'}
                    </ListButton>
                    <ReportButton 
                        onClick={handleReportClick}
                        disabled={consultResultQuery.isLoading}
                    >
                        {consultResultQuery.isLoading ? '처리 중...' : '분석 보기'}
                    </ReportButton>
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
    border-radius: 8px;
    background-color: white;
    border: 1px solid ${theme.colors.gray[400]};
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
    margin-top: 20px;
    font-size: ${theme.fontSize.lg};
    font-weight: ${theme.fontWeight.medium};
`;

const ButtonContainer = styled.div`
    display: flex;
    margin-top: 30px;
    gap: 15px;
`;

const ReportButton = styled.button`
    width: 134px;
    height: 40px;
    border-radius: 8px;
    cursor: pointer;
    border: none;
    cursor: pointer;
    color: ${theme.colors.other.white};
    background-color: ${theme.colors.green.main};
    font-size: ${theme.fontSize.md};
    font-weight: ${theme.fontWeight.medium};
    transition: background-color 0.2s ease;
    
    &:hover:not(:disabled) {
        background-color: ${theme.colors.green.hover};
    }

    &:disabled {
        background-color: ${theme.colors.gray[300]};
        color: ${theme.colors.gray[500]};
        cursor: not-allowed;
        opacity: 0.6;
    }
`;

const ListButton = styled.button`
    width: 134px;
    height: 40px;
    border-radius: 8px;
    cursor: pointer;
    border: none;
    background-color: white;
    border: 1px solid ${theme.colors.gray[500]};
    color: ${theme.colors.other.black};
    font-size: ${theme.fontSize.md};
    font-weight: ${theme.fontWeight.medium};
    transition: background-color 0.2s ease;

    &:hover:not(:disabled) {
        background-color: ${theme.colors.gray[500]};
    }

    &:disabled {
        background-color: ${theme.colors.gray[200]};
        color: ${theme.colors.gray[400]};
        border-color: ${theme.colors.gray[300]};
        cursor: not-allowed;
        opacity: 0.6;
    }
`;

export default SuccessModal;
