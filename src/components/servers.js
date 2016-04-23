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

import { Actions } from 'react-native-router-flux'
import { styles } from './../styles'

const TEXT_INPUT_REF = 'urlInput';

export class Servers extends Component {
  constructor(props){
    super(props);

    ds = new ListView.DataSource({
      rowHasChanged(a, b) {
        return a.done !== b.done || a.text !== b.text || a.items || b.items;
      }
    });

    let items = this.props.realm.objects('Server');
    this.state = {
      dataSource: ds.cloneWithRows(Array.from(items))
    }

    this.renderRow = this.renderRow.bind(this)
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.wrapper}>
          <ListView
            dataSource={this.state.dataSource}
            renderRow={this.renderRow}/>
        </View>
      </View>
    );
  }

  renderRow(item, sectionIndex, rowIndex) {
    let RowClass;
    let editing = false;

    return (
      <TouchableWithoutFeedback style={styles.wrapper} onPress={() => Actions.server({server: item})}>
        <View style={styles.listItemLeftSide}>
          <View>
            <Text style={styles.listItemText}>
              {item.serverName}
            </Text>
          </View>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}