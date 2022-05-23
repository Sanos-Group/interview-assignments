const { BaseError } = require('../../server/base-error');
const { root } = require('../../config/base-tree');

const newChatService = () => {
    const sessions = {};
    return {
        initial: ({ sessionId }) => {
            if (sessions?.[sessionId]) {
                throw new BaseError(403, 'SessionAlreadyInUse', 'Session already in use');
            }

            sessions[sessionId] = root;

            return {
                greeting: sessions[sessionId]?.getGreeting?.(),
                question: sessions[sessionId].question.getQuestion(),
                answers: sessions[sessionId].question.getAnswers()
            };
        },
        respond: ({ body, sessionId }) => {
            if (!sessionId || !sessions?.[sessionId]) {
                throw new BaseError(403, 'Forbidden', 'No access to given session');
            }
            if (!body || !body.responseId) {
                throw new BaseError(400, 'InvalidResponseId', 'empty response id');
            }
            const { responseId } = body;

            const answers = sessions[sessionId].question.getAnswers();

            if (!answers?.[responseId]) {
                throw new BaseError(400, 'InvalidResponseId', 'unknown response id');
            }

            sessions[sessionId] = answers[responseId]?.getChild?.() ?? {};

            if (!sessions[sessionId] || !sessions[sessionId].question) {
                return {
                    status: 404,
                    result: {
                        message: 'No more questions'
                    }
                };
            }

            return {
                status: 200,
                result: {
                    response: sessions[sessionId]?.response,
                    greeting: sessions[sessionId]?.getGreeting?.(),
                    question: sessions[sessionId].question?.getQuestion?.(),
                    answers: sessions[sessionId].question?.getAnswers?.()
                }
            };
        }
    };
};

module.exports = {
    newChatService
};
