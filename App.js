import React, {Component} from 'react';
import {
  StyleSheet,
  TextInput,
  View,
  Text,
  TouchableOpacity,
  CheckBox,
  ScrollView,
} from 'react-native';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formInput: {
        inputOne: '',
        inputTwo: '',
        inputThree: '',
      },
      checkInput: {
        isOneChecked: false,
        isTwoChecked: false,
        isThreeChecked: false,
      },
      result: '',
      errMsg: '',
    };
  }

  handleChange = (name, value) => {
    let newFormInput = {...this.state.formInput};
    newFormInput[name] = value;
    this.setState({
      formInput: newFormInput,
    });
  };

  toggleCheck = (name, value) => {
    const {checkInput} = this.state;
    let newCheck = {...checkInput};
    newCheck[name] = !value;
    this.setState({
      checkInput: newCheck,
    });
  };

  handleCount = operation => {
    const {checkInput, formInput} = this.state;
    let result = 0;
    result = parseFloat(result);
    let checked = 0;
    const inputOne = parseFloat(formInput.inputOne);
    const inputTwo = parseFloat(formInput.inputTwo);
    const inputThree = parseFloat(formInput.inputThree);
    let isValid1 = true;
    let isValid2 = true;
    let isValid3 = true;

    if (isNaN(formInput.inputOne)) isValid1 = false;
    if (isNaN(formInput.inputTwo)) isValid2 = false;
    if (isNaN(formInput.inputThree)) isValid3 = false;

    if (checkInput.isOneChecked) checked++;
    if (checkInput.isTwoChecked) checked++;
    if (checkInput.isThreeChecked) checked++;

    if (checked < 2) {
      this.setState({
        result: '',
        errMsg: 'Please check at least two fields!',
      });
    } else if (checked === 2) {
      if (!checkInput.isOneChecked) {
        if (isValid2 && isValid3) {
          if (operation == '+') result = inputTwo + inputThree;
          if (operation == '-') result = inputTwo - inputThree;
          if (operation == 'x') result = inputTwo * inputThree;
          if (operation == '/') result = inputTwo / inputThree;
        } else result = NaN;
      }
      if (!checkInput.isTwoChecked) {
        if (isValid1 && isValid3) {
          if (operation == '+') result = inputOne + inputThree;
          if (operation == '-') result = inputOne - inputThree;
          if (operation == 'x') result = inputOne * inputThree;
          if (operation == '/') result = inputOne / inputThree;
        } else result = NaN;
      }
      if (!checkInput.isThreeChecked) {
        if (isValid1 && isValid2) {
          if (operation == '+') result = inputOne + inputTwo;
          if (operation == '-') result = inputOne - inputTwo;
          if (operation == 'x') result = inputOne * inputTwo;
          if (operation == '/') result = inputOne / inputTwo;
        } else result = NaN;
      }

      if (isNaN(result)) this.setState({result: '', errMsg: 'Wrong Input!'});
      else this.setState({result, errMsg: ''});
    } else {
      if (isValid1 && isValid2 && isValid3) {
        if (operation == '+') result = inputOne + inputTwo + inputThree;
        if (operation == '-') result = inputOne - inputTwo - inputThree;
        if (operation == 'x') result = inputOne * inputTwo * inputThree;
        if (operation == '/') result = inputOne / inputTwo / inputThree;
      } else result = NaN;

      result = parseFloat(result);
      if (isNaN(result)) this.setState({result: '', errMsg: 'Wrong Input!'});
      else this.setState({result, errMsg: ''});
    }
  };

  render() {
    const {formInput, checkInput, result, errMsg} = this.state;
    return (
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          flexGrow: 1,
        }}>
        <View style={styles.container}>
          <View style={styles.content}>
            <View style={styles.inputContainer}>
              <View style={styles.inputWrapper}>
                <TextInput
                  placeholder="Input One"
                  style={styles.input}
                  keyboardType="number-pad"
                  disableFullscreenUI={true}
                  multiline={true}
                  onChangeText={number => this.handleChange('inputOne', number)}
                  value={formInput.inputOne}
                />
                <CheckBox
                  value={checkInput.isOneChecked}
                  onValueChange={() =>
                    this.toggleCheck('isOneChecked', checkInput.isOneChecked)
                  }
                />
              </View>
              <View style={styles.errInput}>
                <Text style={styles.errText}>
                  {isNaN(formInput.inputOne)
                    ? 'Please input a valid number!'
                    : ''}
                </Text>
              </View>
            </View>
            <View style={styles.inputContainer}>
              <View style={styles.inputWrapper}>
                <TextInput
                  placeholder="Input Two"
                  style={styles.input}
                  keyboardType="number-pad"
                  disableFullscreenUI={true}
                  onChangeText={number => this.handleChange('inputTwo', number)}
                  value={formInput.inputTwo}
                />
                <CheckBox
                  value={checkInput.isTwoChecked}
                  onValueChange={() =>
                    this.toggleCheck('isTwoChecked', checkInput.isTwoChecked)
                  }
                />
              </View>
              <View style={styles.errInput}>
                <Text style={styles.errText}>
                  {isNaN(formInput.inputTwo)
                    ? 'Please input a valid number!'
                    : ''}
                </Text>
              </View>
            </View>
            <View style={styles.inputContainer}>
              <View style={styles.inputWrapper}>
                <TextInput
                  placeholder="Input Three"
                  style={styles.input}
                  keyboardType="number-pad"
                  disableFullscreenUI={true}
                  onChangeText={number =>
                    this.handleChange('inputThree', number)
                  }
                  value={formInput.inputThree}
                />
                <CheckBox
                  value={checkInput.isThreeChecked}
                  onValueChange={() =>
                    this.toggleCheck(
                      'isThreeChecked',
                      checkInput.isThreeChecked,
                    )
                  }
                />
              </View>
              <View style={styles.errInput}>
                <Text style={styles.errText}>
                  {isNaN(formInput.inputThree)
                    ? 'Please input a valid number!'
                    : ''}
                </Text>
              </View>
            </View>
            <View style={styles.operatorContainer}>
              <TouchableOpacity
                activeOpacity={0.5}
                style={styles.btnOperator}
                onPress={() => this.handleCount('+')}>
                <Text style={styles.textOperator}>+</Text>
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={0.5}
                style={styles.btnOperator}
                onPress={() => this.handleCount('-')}>
                <Text style={styles.textOperator}>-</Text>
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={0.5}
                style={styles.btnOperator}
                onPress={() => this.handleCount('x')}>
                <Text style={styles.textOperator}>x</Text>
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={0.5}
                style={styles.btnOperator}
                onPress={() => this.handleCount('/')}>
                <Text style={styles.textOperator}>/</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.line} />
            <View style={styles.resultContainer}>
              <View style={styles.successResult}>
                <Text style={styles.textResult}>Hasil:</Text>
                <Text style={styles.textResult}>{result}</Text>
              </View>
              <View style={styles.errorResult}>
                <Text style={styles.errMsg}>{errMsg}</Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    marginHorizontal: 15,
  },
  content: {
    width: '100%',
  },
  inputContainer: {
    width: '100%',
    marginVertical: 10,
  },
  inputWrapper: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  errInput: {
    width: '80%',
  },
  errText: {
    color: 'red',
  },
  input: {
    width: '80%',
    borderColor: 'black',
    borderWidth: 2,
    padding: 10,
    fontSize: 20,
  },
  operatorContainer: {
    width: '80%',
    flexDirection: 'row',
    marginVertical: 20,
    justifyContent: 'space-between',
  },
  btnOperator: {
    backgroundColor: 'white',
    color: 'black',
    borderWidth: 2,
    borderColor: 'black',
    paddingVertical: 5,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  textOperator: {
    color: 'black',
    fontSize: 20,
  },
  line: {
    width: '80%',
    borderTopColor: '#333',
    borderTopWidth: 2,
    marginVertical: 20,
  },
  resultContainer: {
    width: '100%',
    marginVertical: 10,
  },
  successResult: {
    width: '80%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  errorResult: {
    width: '100%',
  },
  textResult: {
    fontSize: 25,
  },
  errMsg: {
    fontSize: 20,
    color: 'red',
  },
});
