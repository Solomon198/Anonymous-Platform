import React, {useState} from 'react';
import {TextInput, TextInputProps, View, StyleSheet, Text} from 'react-native';
// @ts-ignore
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useTheme} from '../../theme';

interface Input extends TextInputProps {
  inputDetails?: string;

  error?: string | undefined;
}

const Input = (props: Input) => {
  const {onChangeText, error, inputDetails, ...restProps} = props;
  const {error: errorColor, backgrounds, text} = useTheme();
  const [inputValue, setValue] = useState<string>('');

  const handleInputChange = (textValue: string) => {
    if (onChangeText) {
      onChangeText(textValue);
    }
    setValue(textValue);
  };

  return (
    <View style={styles.mainContainer}>
      <View style={styles.inputContainer}>
        <TextInput
          placeholderTextColor={text.secondary}
          {...restProps}
          onChangeText={handleInputChange}
        />
        {inputValue && (
          <AntDesign
            name={error === undefined ? 'checkcircle' : 'closecircle'}
            size={20}
            style={[
              styles.ico,
              {
                color:
                  error === undefined ? backgrounds.success : errorColor.main,
              },
            ]}
          />
        )}
      </View>
      {inputValue && inputDetails && error && (
        <Text style={[styles.inputDescription, {color: text.secondary}]}>
          {inputDetails}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  inputDescription: {
    fontSize: 10,
    marginTop: 2,
  },
  mainContainer: {
    marginHorizontal: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ico: {
    marginLeft: 5,
  },
});
export default Input;
