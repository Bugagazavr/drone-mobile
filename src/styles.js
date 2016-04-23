import React, {
  StyleSheet,
} from 'react-native';

// Inputs
const INPUT_BACKGROUND_COLOR = '#eff1f5';
const INPUT_TEXT_COLOR = '#747C84';

// Login button
const LOGGIN_BUTTON_BACKGROUND_COLOR = '#2b303b';
const LOGGIN_BUTTON_TEXT_COLOR = '#FFF';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  wrapper: {
    flex: 1,
    marginTop: 80,
  },
  authorizationText: {
    marginTop: 10,
  },
  loginButton: {
    marginTop: 10,
    width: 140,
    textAlign: 'center',
    padding: 5,
    backgroundColor: LOGGIN_BUTTON_BACKGROUND_COLOR,
    color: LOGGIN_BUTTON_TEXT_COLOR,
  },
  listItemLeftSide: {
    flexDirection: 'column',
    height: 30,
  },
  listItemText: {
    textAlign: 'left',
  },
  textInput: {
    marginLeft: 10,
    marginRight: 10,
    paddingLeft: 5,
    paddingRight: 5,
    height: 24,
    fontSize: 14,
    backgroundColor: INPUT_BACKGROUND_COLOR,
    color: INPUT_TEXT_COLOR,
    textAlign: 'left',
  }
});

export { styles };