import {StyleSheet} from 'react-native';
import {TTheme} from '../../../types';

const ScreenStyles = (theme: TTheme) => {
  const {backgrounds} = theme;
  const styles = StyleSheet.create({
    safeArea: {
      flex: 1,
      backgroundColor: backgrounds.appPrimary,
      justifyContent: 'space-evenly',
      alignContent: 'space-between',
    },
    imgContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      alignContent: 'center',
      justifyContent: 'center',
    },
    img: {
      width: 150,
      height: 150,
      borderRadius: 200,
    },
    drawLeft: {
      marginLeft: -40,
    },
    textContainer: {
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'row',
    },
    createAccountText: {
      fontSize: 15,
    },
    link: {
      fontWeight: 'bold',
      color: theme.primary.main,
    },
  });

  return {styles};
};

export default ScreenStyles;
