class SocketClients  {
	constructor() {
	  this._lastClient = {};
  }
	isOneConnected() {
		return !!this._lastClient
  }
  setClient(client) {
		if(this._lastClient) {
			delete this._lastClient;
		}
	  this._lastClient = client
  }
  removeClient() {
	  delete this._lastClient;
  }
}

const socketClients = new SocketClients();
module.exports = { socketClients };
