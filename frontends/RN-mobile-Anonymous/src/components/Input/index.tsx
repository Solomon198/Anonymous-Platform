import React, {useState} from 'react';
import {TextInput, TextInputProps, StyleSheet} from 'react-native';
import {Text, Container} from '..';
import {useTheme} from '../../theme';
import {Icon} from '..';

export interface Props extends TextInputProps {
  inputDetails?: string;

  error?: string | undefined;
  inputTestID?: string;
  iconTestID?: string;
}

const Input = (props: Props) => {
  const {
    onChangeText,
    error,
    inputDetails,
    inputTestID,
    testID,
    iconTestID,
    value,
    ...restProps
  } = props;
  const {error: errorColor, backgrounds, text} = useTheme();
  const [inputValue, setValue] = useState<string>('');

  const handleInputChange = (textValue: string) => {
    if (onChangeText) {
      onChangeText(textValue);
    }
    setValue(textValue);
  };

  //1. Input component don't maintain internal state and we need to pass control of value to user
  //2. Doing this gives the component a behaviour of internal state and controlled input
  const textInputValue = value || inputValue;

  return (
    <Container testID={testID} style={styles.mainContainer}>
      <Container style={styles.inputContainer}>
        <TextInput
          value={textInputValue}
          testID={inputTestID}
          placeholderTextColor={text.secondary}
          {...restProps}
          onChangeText={handleInputChange}
        />
        {textInputValue && (
          <Icon
            name={error === undefined ? 'checkcircle' : 'closecircle'}
            type="AntDesign"
            size={20}
            testID={iconTestID}
            style={[
              styles.ico,
              {
                color:
                  error === undefined ? backgrounds.success : errorColor.main,
              },
            ]}
          />
        )}
      </Container>
      {textInputValue && inputDetails && error && (
        <Text style={[styles.inputDescription, {color: text.secondary}]}>
          {inputDetails}
        </Text>
      )}
    </Container>
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
