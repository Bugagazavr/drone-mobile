export class ServerEntity {}
ServerEntity.schema = {
  name: 'Server',
  properties: {
    serverUrl: 'string',
    serverName: 'string',
    token: 'string',
  }
}