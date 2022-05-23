const SESSION_ID_LENGTH = 16;

function makeId(length) {
    const result = Array.from({ length }, () => 0);
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;

    return result.map(() => characters.charAt(Math.floor(Math.random() * charactersLength))).join('');
}

const newAuthService = (chatService) => ({
    auth: () => {
        const newSession = makeId(SESSION_ID_LENGTH);
        return {
            status: 200,
            result: {
                sessionId: newSession,
                question: chatService.initial({ sessionId: newSession })
            }
        };
    }
});

module.exports = {
    newAuthService
};
