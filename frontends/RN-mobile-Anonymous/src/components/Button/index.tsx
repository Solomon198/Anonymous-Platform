import React from 'react';
import {
  TouchableOpacity,
  TouchableOpacityProps,
  StyleSheet,
  StyleProp,
  ViewStyle,
  TextStyle,
} from 'react-native';
import {useTheme} from '../../theme';
import {Text, Icon, Container, ActivityIndicator} from '..';

export interface Props extends TouchableOpacityProps {
  value: string;
  iconName?: string;

  disabled?: boolean;
  icoStyle?: StyleProp<TextStyle> | any;
  style?: StyleProp<ViewStyle>;
  btnTextStyle?: StyleProp<TextStyle>;
  iconTestID?: string;
  isLoading?: boolean;
  loaderSize?: number | 'small' | 'large' | undefined;
  loaderColor?: string;
}

const Button = ({
  value,
  iconName,
  btnTextStyle,
  icoStyle,
  iconTestID,
  disabled,
  style,
  isLoading,
  loaderSize,
  loaderColor,
  ...props
}: Props) => {
  const {text} = useTheme();
  return (
    <TouchableOpacity
      accessibilityRole="button"
      disabled={disabled}
      {...props}
      style={[styles.btn, style]}>
      <Container style={styles.icoContainer}>
        {iconName && (
          <Icon
            size={26}
            testID={iconTestID}
            name={iconName}
            type="AntDesign"
            style={[{color: text.secondary}, icoStyle]}
          />
        )}
      </Container>
      <Text style={[styles.btnText, btnTextStyle]}>{value}</Text>
      <Container>
        {isLoading && (
          <ActivityIndicator
            accessibilityLabel="progressbar"
            color={loaderColor}
            size={loaderSize || 'large'}
          />
        )}
      </Container>
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
    justifyContent: 'space-evenly',
    alignContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    marginVertical: 5,
  },
  icoContainer: {
    backgroundColor: 'transparent',
  },
});

export default Button;
