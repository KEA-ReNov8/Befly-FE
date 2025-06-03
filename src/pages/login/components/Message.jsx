import styled from 'styled-components';
import theme from '@app/styles/theme';

const Message = ({ isValid, message }) => {
    return <MessageStyle isValid={isValid}>{message}</MessageStyle>
}

const MessageStyle = styled.div`
    color: ${({ isValid }) => isValid ? theme.colors.green.main : theme.colors.red.main};
    font-size: ${theme.fontSize.sm};
    font-weight: ${theme.fontWeight.light};
    align-self: flex-start;
    margin-left: 0.4rem;
    margin-bottom: 5px;
`;

export default Message;
