module.exports = {
	serverURL: process.env.NODE_ENV === 'production' ? 'http://127.0.0.1:3000' : 'http://localhost:3000',
	frontServerUrl: 'https://front.a-bots.com',
	backServerUrl: 'https://back.a-bots.com',
};
