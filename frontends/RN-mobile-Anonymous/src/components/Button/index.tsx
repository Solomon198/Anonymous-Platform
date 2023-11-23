import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  StyleProp,
  ViewStyle,
} from 'react-native';
// @ts-ignore
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useTheme} from '../../theme';

interface Props {
  value: string;
  iconName: string;

  disabled?: boolean;
  icoStyle?: StyleProp<ViewStyle>;
  style?: StyleProp<ViewStyle>;
  btnTextStyle?: StyleProp<ViewStyle>;
}

const Button = ({
  value,
  iconName,
  btnTextStyle,
  icoStyle,
  style,
  disabled,
}: Props) => {
  const {text} = useTheme();
  return (
    <TouchableOpacity disabled={disabled} style={[styles.btn, style]}>
      <AntDesign
        size={26}
        name={iconName}
        style={[{color: text.secondary}, icoStyle]}
      />
      <Text style={[styles.btnText, btnTextStyle]}>{value}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  btnText: {
    fontWeight: '500',
    fontSize: 16,
  },
  btn: {
    paddingVertical: 20,
    borderRadius: 30,
    marginHorizontal: 20,
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    marginVertical: 5,
  },
});

export default Button;
