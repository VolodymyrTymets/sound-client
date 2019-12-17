const { isEmpty, keys } = require('lodash');

class SocketClients  {
	constructor() {
		this._clients = {};
	}
	isOneConnected() {
		return !isEmpty(this._clients);
	}
	setClient(client) {
		this._clients = {
			...this._clients,
			[client.id]: client,
		}
	}
	removeClient(client) {
		delete this._clients[client.id];
	}
}

const socketClients = new SocketClients();
module.exports = { socketClients };
