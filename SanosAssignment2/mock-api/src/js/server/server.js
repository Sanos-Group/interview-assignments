const express = require('express');
const { BaseError } = require('./base-error');

const bearerExtractor = /^\s*Bearer\s+(\S+)$/i;

const extractSession = (authHeader) => {
    if (!authHeader) {
        return null;
    }

    const match = bearerExtractor.exec(authHeader);
    if (!match) {
        throw new BaseError(400, 'InvalidAuthHeader', 'Authorization header should be of the form "Bearer <token>"');
    }

    return match[1];
};

const baseHandler = (handlerFunc) => async (req, res) => {
    const contentType = req.headers?.['content-type'];
    const auth = req.headers?.authorization;

    const { body } = req;

    const defaultHeaders = {
        'Content-Type': 'application/json'
    };

    try {
        if (contentType !== 'application/json') {
            throw new BaseError(415, 'InvalidContentType', 'only application/json is accepted');
        }

        const { status, result } = await handlerFunc({ body, sessionId: extractSession(auth) });
        res.status(status).set(defaultHeaders);
        res.end(JSON.stringify(result));
    } catch (err) {
        console.error(err);
        res.status(err?.errorStatus ?? 500).set(defaultHeaders);
        res.end(JSON.stringify({
            success: false,
            error: err?.errorBody ?? {
                type: 'InternalServerError',
                info: {
                    error: err.message
                }
            }
        }));
    }
};

const authHandler = (authService) => baseHandler(authService.auth);

const chatHandler = (chatService) => baseHandler(chatService.respond);

function newServer(authService, chatService) {
    if (!authService) {
        throw new Error('missing authService');
    }
    if (!chatService) {
        throw new Error('missing chatService');
    }

    const app = express();

    app.use(express.json());

    app.post(
        '/v1/auth',
        authHandler(authService)
    );
    app.post(
        '/v1/responses',
        chatHandler(chatService)
    );

    return app;
}

module.exports = {
    newServer
};
