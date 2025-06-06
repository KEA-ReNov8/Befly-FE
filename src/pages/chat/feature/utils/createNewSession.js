export const createNewSession = async (title, category,createNewChatMutation) => {
    try {
        const body = {
            chat_title: title,
            category: category,
        };

        return createNewChatMutation.mutate(body);
    } catch (error) {
        console.error('세션 생성 실패:', error);
        return null;
    }
};
