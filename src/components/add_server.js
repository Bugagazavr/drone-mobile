/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {
  AppRegistry,
  Component,
  Text,
  TextInput,
  TouchableHighlight,
  View,
} from 'react-native';

import { Actions } from 'react-native-router-flux'
import { FloatLabelTextInput } from 'react-native-floating-label-text-input'

import { styles } from './../styles'

const INPUT_SERVER_NAME = 'serverName';
const INPUT_SERVER_URL = 'serverUrl';
const INPUT_TOKEN = 'token';

export class AddServer extends Component {
  constructor(props){
    super(props);

    this.state = {
      serverName: '',
      serverUrl: '',
      token: '',
    }
  }

  commitServer(data) {
    this.props.realm.write(() =>
      this.props.realm.create('Server', {
        serverName: data.serverName,
        serverUrl: data.serverUrl,
        token: data.token,
      })
    )

    Actions.servers()
  }

  validateAndSave(data) {
    fetch(data.serverUrl + '/api/user', {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + data.token
      }
    })
      .then((res) => this.commitServer(data))
      .catch((err) => console.log(err))
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.wrapper}>
          <TextInput 
            ref={INPUT_SERVER_NAME}
            style={{height: 40}}
            onSubmitEditing={() => this.refs.serverUrl.focus()}
            onChange={(text) => this.setState({serverName: text.nativeEvent.text})}
            defaultValue={this.state.serverName}
            autoCapitalize="none"
            clearButtonMode="while-editing"
          />
          <TextInput 
            ref={INPUT_SERVER_URL}
            style={{height: 40}}
            onSubmitEditing={() => () => Actions.authorize(this.state)}
            onChange={(text) => this.setState({serverUrl: text.nativeEvent.text})}
            defaultValue={this.state.serverUrl}
            autoCapitalize="none"
            clearButtonMode="while-editing"
          />
          <TextInput 
            ref={INPUT_TOKEN}
            style={{height: 40}}
            onSubmitEditing={() => this.refs.token.focus()}
            onChange={(text) => this.setState({token: text.nativeEvent.text})}
            defaultValue={this.state.token}
            autoCapitalize="none"
            clearButtonMode="while-editing"
          />
          <TouchableHighlight onPress={() => this.validateAndSave(this.state)}>
            <Text>Save</Text>
          </TouchableHighlight>
        </View>
      </View>
    );
  }
}