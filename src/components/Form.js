import { StyleSheet, View, Text, TextInput } from 'react-native';

const Form = (props) => (
  <View style={styles.header}>
    <Text style={styles.title}>Open Weather App</Text>
    <TextInput 
      style={styles.textInput} 
      placeholder="Input a city name" 
      keyboardAppearance='dark'
      onChangeText={props.onChangeText}
      onEndEditing={props.onSubmit}
    />
  </View>
);

export default Form;

const styles = StyleSheet.create({
  header: {
    display: 'flex',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50,
    width: '100%',
  },
  textInput: {
    width: 300,
    height: 40,
    borderColor: 'gray',
    borderWidth: 2,
    padding: 5
  },
  title: {
    fontSize: 35,
    fontWeight: 'bold',
    marginBottom: 50
  }
});
