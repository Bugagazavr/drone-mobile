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

export class Builds extends Component {
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
    fetch(this.props.server.serverUrl + '/api/repos/' + this.props.repo.full_name + '/builds', {
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
            renderRow={this.renderRow}
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

  renderRow(item, sectionIndex, rowIndex) {
    return (
      <TouchableWithoutFeedback style={styles.wrapper}>
        <View style={styles.listItemLeftSide}>
          <View>
            <Text style={styles.listItemText}>
              {item.number}
            </Text>
          </View>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}