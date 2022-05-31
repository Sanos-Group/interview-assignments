const { newServer } = require('./server/server');
const { newChatService } = require('./service/chat/chat');
const { newAuthService } = require('./service/auth/auth');

const chatService = newChatService();
const authService = newAuthService(chatService);

const app = newServer(authService, chatService);

const PORT = process.env?.PORT ?? 8888;
app.listen(PORT, () => console.log(`Listening on port: ${PORT}`));
