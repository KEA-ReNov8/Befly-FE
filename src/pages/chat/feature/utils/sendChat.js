export const sendChat = async (message, sessionId, sendChatMutation) => {
    try {
        const body = {
            content: message,
            session_id: sessionId,
        };

        return sendChatMutation.mutate(body);
    } catch (error) {
        console.error('채팅 전송 중 오류 발생:', error);
    }
};
