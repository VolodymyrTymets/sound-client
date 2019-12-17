const { isEmpty, keys } = require('lodash');

class SocketClients  {
	constructor() {
	  this._clients = {};
	  this._lastClient = {};
  }
	isOneConnected() {
	  //return !isEmpty(this._clients);
		return !!this._lastClient
  }
  setClient(client) {
		if(this._lastClient) {
			delete this._lastClient;
		}
	  this._lastClient = client
    // this._clients = {
    //   //...this._clients,
    //   [client.id]: client,
    // }
  }
  removeClient(client) {
    //delete this._clients[client.id];
	  delete this._lastClient;
  }
}

const socketClients = new SocketClients();
module.exports = { socketClients };
