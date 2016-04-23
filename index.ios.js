/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {
  AppRegistry,
  Component,
  NavigatorIOS,
} from 'react-native';

import { Actions, Scene, Router } from 'react-native-router-flux';
const Realm = require('realm');

// Components
import { Servers } from './src/components/servers';
import { AddServer } from './src/components/add_server';
import { Server } from './src/components/server';
import { Builds } from './src/components/builds';

// Entities
import { ServerEntity } from './src/entities/server_entity';

const realm = new Realm({schema: [ServerEntity]});

class Drone extends Component {
  render() {
    return (
      <Router>
        <Scene key="root">
          <Scene key="servers" component={Servers} title="Servers" onRight={() => Actions.addServer()} rightTitle="Add" realm={realm}/>
          <Scene key="addServer" component={AddServer} title="Add Server" realm={realm}/>
          <Scene key="server" component={Server} title="Available repos"/>
          <Scene key="builds" component={Builds} title="Builds"/>
        </Scene>
      </Router>
    );
  }
}

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0"

AppRegistry.registerComponent('Builds', () => Builds);
AppRegistry.registerComponent('AddServer', () => AddServer);
AppRegistry.registerComponent('Servers', () => Servers);
AppRegistry.registerComponent('Server', () => Server);
AppRegistry.registerComponent('Drone', () => Drone);
