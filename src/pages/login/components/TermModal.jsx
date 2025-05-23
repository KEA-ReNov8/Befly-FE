import styled from "styled-components";
import theme from "@app/styles/theme";
import closeIcon from '@shared/assets/icons/Xmark.svg';

const TermModal = ( {onClose} ) => {

    const TermList = [
        {
            title: '서비스 이용약관',
            content: `
                    제 1 조 (목적)
                    이 약관은 BeFly(이하 "회사")가 제공하는 서비스의 이용과 관련하여 회사와 이용자의 권리, 의무 및 책임사항 등을 규정함을 목적으로 합니다.

                    제 2 조 (용어의 정의)
                    1. "서비스"라 함은 회사가 제공하는 모든 웹사이트, 모바일 애플리케이션 및 기타 관련 서비스를 의미합니다.
                    2. "이용자"란 본 약관에 따라 회사가 제공하는 서비스를 이용하는 자를 의미합니다.
                    3. "회원"이란 회사와 서비스 이용계약을 체결하고 아이디(ID)를 부여받은 자를 말합니다.

                    제 3 조 (약관의 게시 및 변경)
                    1. 본 약관은 회사 웹사이트 또는 앱을 통해 게시되며, 이용자가 언제든지 확인할 수 있습니다.
                    2. 회사는 관련 법령을 위반하지 않는 범위에서 약관을 개정할 수 있으며, 변경 시 공지합니다.

                    제 4 조 (서비스 이용 계약의 성립)
                    1. 서비스 이용계약은 이용자의 서비스 이용 신청에 대해 회사가 승낙함으로써 성립합니다.
                    2. 회사는 신청자의 정보를 확인한 후 서비스 이용을 승낙할 수 있으며, 사유가 있을 경우 승낙을 거절할 수 있습니다.

                    제 5 조 (서비스의 제공 및 변경)
                    1. 회사는 연중무휴, 1일 24시간 서비스를 제공합니다. 다만 시스템 점검 등으로 일시 중단될 수 있습니다.
                    2. 회사는 서비스의 내용, 운영 기술 등을 변경할 수 있으며, 그 내용을 사전에 공지합니다.

                    제 6 조 (이용자의 의무)
                    1. 이용자는 본 약관 및 관계 법령을 준수해야 하며, 다음 행위를 해서는 안 됩니다:
                    - 타인의 정보 도용
                    - 서비스 운영을 방해하는 행위
                    - 불법적인 정보 등록 및 유포

                    제 7 조 (계약 해지 및 이용 제한)
                    1. 이용자는 언제든지 서비스 탈퇴를 요청할 수 있습니다.
                    2. 회사는 이용자가 본 약관을 위반하거나 법령을 위반할 경우 사전 통보 없이 이용을 제한하거나 계약을 해지할 수 있습니다.

                    제 8 조 (면책조항)
                    1. 회사는 천재지변, 불가항력적 사유로 인해 서비스를 제공할 수 없는 경우 책임을 지지 않습니다.
                    2. 이용자의 귀책사유로 인한 서비스 이용 장애에 대해서 회사는 책임을 지지 않습니다.

                    제 9 조 (준거법 및 재판관할)
                    본 약관은 대한민국 법에 따라 해석되며, 분쟁 발생 시 회사의 본사 소재지 관할 법원을 제1심 관할법원으로 합니다.
                    `,
        },
        {
            title: '개인정보 처리방침',
            content: `
                    BeFly(이하 "회사")는 이용자의 개인정보를 중요하게 생각하며, 「개인정보 보호법」 등 관련 법령을 준수하여 개인정보를 안전하게 관리합니다.

                    1. 수집하는 개인정보 항목
                    회사는 다음과 같은 정보를 수집할 수 있습니다:
                    - 필수항목: 이름, 이메일, 비밀번호
                    - 선택항목: 닉네임, 생년월일, 성별 등
                    - 자동 수집 항목: IP 주소, 쿠키, 접속 기록 등

                    2. 개인정보 수집 및 이용 목적
                    - 회원가입 및 관리
                    - 서비스 제공 및 맞춤형 콘텐츠 제공
                    - 고객 문의 응대 및 민원 처리
                    - 서비스 이용 통계 및 분석

                    3. 개인정보 보유 및 이용 기간
                    - 회원 탈퇴 시까지 보관하며, 관련 법령에 따라 보존이 필요한 경우 해당 법령 기준에 따릅니다.
                    (예: 전자상거래법상 거래기록 5년 보관 등)

                    4. 개인정보 제3자 제공
                    회사는 이용자의 개인정보를 원칙적으로 외부에 제공하지 않습니다. 단, 다음의 경우 예외로 합니다:
                    - 이용자가 사전에 동의한 경우
                    - 법령에 따른 요청이 있는 경우

                    5. 개인정보의 파기
                    - 보유 기간이 경과하거나 처리 목적이 달성된 경우, 지체 없이 파기합니다.
                    - 전자 파일: 복구 불가능한 기술적 방법으로 파기
                    - 문서: 분쇄 또는 소각

                    6. 이용자의 권리와 행사 방법
                    - 개인정보 열람, 정정, 삭제, 처리정지 요청 가능
                    - 마이페이지 또는 고객센터를 통해 언제든지 권리 행사 가능

                    7. 개인정보 보호책임자
                    - 이름: 김동윤
                    - 이메일: contact@befly.ai
                    - 담당부서: 개인정보 보호팀

                    8. 쿠키(cookie) 사용
                    회사는 웹사이트 운영을 위해 쿠키를 사용하며, 브라우저 설정을 통해 거부할 수 있습니다.

                    9. 정책 변경 고지
                    이 개인정보처리방침은 법령이나 내부 정책 변경에 따라 수정될 수 있으며, 변경 시 서비스 내 공지사항을 통해 안내합니다.`,
        },  
    ];

    return (
        <ModalOverlay>
            <Container>
                <CloseButton onClick={onClose}>
                    <img src={closeIcon} alt="close" />
                </CloseButton>
                <ContentWrapper>
                    {TermList.map((term) => (
                        <div key={term.title}>
                            <Title>{term.title}</Title>
                            <ContentText>{term.content}</ContentText>
                        </div>
                    ))}
                </ContentWrapper>
            </Container>
        </ModalOverlay> 
    );
};

const ModalOverlay = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 1000;
    background-color: rgba(0, 0, 0, 0.5);
`;

const Container = styled.div`
    height: 500px;
    background-color: ${theme.colors.other.white};
    display: flex;
    flex-direction: column;
    padding: 30px;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
    border-radius: 8px;
    position: relative;
`;

const CloseButton = styled.button`
    position: absolute;
    top: 16px;
    right: 20px;
    background: none;
    border: none;
    cursor: pointer;
`;

const ContentWrapper = styled.div`
    margin-top: 10px;
    overflow-y: auto;
    height: 100%;
`;

const Title = styled.h2`
    margin-top: 10px;
    font-family: ${theme.fontFamily.pretendard};
    font-weight: 600;
    font-size: 18px;
    margin-bottom: 10px;
`;

const ContentText = styled.p`
    font-size: 14px;
    white-space: pre-wrap;
    line-height: 1.6;
    font-family: ${theme.fontFamily.pretendard};
    color: ${theme.colors.gray[800]};
`;

export default TermModal;
