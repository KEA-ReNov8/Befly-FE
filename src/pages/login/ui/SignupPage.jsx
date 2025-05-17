import SignUpForm from '@login/components/SignUpForm';
import ConfirmModal from '@login/components/ConfirmModal';
import { useState } from 'react';
import styled from 'styled-components';

export const SignupPage = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    //아마 훅으로 연결하면 될 듯
    const handleFormSubmit = (e) => {
        e.preventDefault();
        setIsModalOpen(true);
    };
    
    const handleModalClose = () => {
        setIsModalOpen(false);
    };

    return (
        <Wrapper>
            <SignUpForm onSubmit={handleFormSubmit}/>
            {isModalOpen && (
                <ModalOverlay>
                    <ModalContainer>
                        <ConfirmModal onClose={handleModalClose}/>
                    </ModalContainer>
                </ModalOverlay>
            )}
        </Wrapper>
    );
};

const Wrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 5%;
`;

const ModalOverlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
`;

const ModalContainer = styled.div`
    background-color: white;
    padding: 1rem;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    z-index: 1001;
`;
