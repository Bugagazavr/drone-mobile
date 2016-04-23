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
  TouchableOpacity,
  View,
  ListView,
  TouchableWithoutFeedback,
} from 'react-native';

import { Actions } from 'react-native-router-flux';

import { styles } from './../styles'

const TEXT_INPUT_REF = 'urlInput';

export class Server extends Component {
  constructor(props){
    super(props);

    this.state = {
      dataSource: new ListView.DataSource({
        rowHasChanged(a, b) {
          return a !== b;
        }
      }),
      loaded: false,
    };
  }

  componentDidMount() {
    this.fetchData();
  }

  fetchData() {
    fetch(this.props.server.serverUrl + '/api/user/repos', {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + this.props.server.token
      }
    })
      .then((response) => response.json())
      .then((responseData) => {
        this.setState({
          dataSource: this.state.dataSource.cloneWithRows(responseData),
          loaded: true,
        })
      })
      .catch((err) => console.log(err))
      .done();
  };

  render() {
    if (!this.state.loaded) {
      return this.renderLoadingView();
    }

    return (
      <View style={styles.container}>
        <View style={styles.wrapper}>
          <ListView
            dataSource={this.state.dataSource}
            renderRow={(item) => this._renderRow(item, this.props.server)}
          />
        </View>
      </View>
    );
  }

  renderLoadingView() {
    return (
      <View style={styles.container}>
        <View style={styles.wrapper}>
          <Text>
            Loading repos...
          </Text>
        </View>
      </View>
    );
  };

  _renderRow(item, server) {
    return (
      <TouchableWithoutFeedback style={styles.wrapper} onPress={() => Actions.builds({server: server, repo: item})}>
        <View style={styles.listItemLeftSide}>
          <View>
            <Text style={styles.listItemText}>
              {item.full_name}
            </Text>
          </View>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}