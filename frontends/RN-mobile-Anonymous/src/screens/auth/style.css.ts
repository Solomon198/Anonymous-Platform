import {StyleSheet, Dimensions} from 'react-native';
import {TTheme} from '../../../types';

const {width} = Dimensions.get('window');

const ScreenStyles = (theme: TTheme) => {
  const {backgrounds, text} = theme;
  const styles = StyleSheet.create({
    btn: {
      backgroundColor: backgrounds.appPrimary,
      borderColor: 'transparent',
      paddingVertical: 30,
      borderRadius: 10,
      opacity: 0.9,
    },

    btnText: {
      marginLeft: 10,
      color: text.secondary,
    },

    img: {
      width: 170,
      height: 170,
      borderRadius: 200,
    },

    drawLeft: {
      marginLeft: -40,
    },
    btnLeft: {
      backgroundColor: backgrounds.appSecondary,
      width: width - 50,
    },
    googleIco: {
      color: '#DB4437' as any,
    },
    twitter: {
      color: '#1DA1F2',
    },
    facebook: {
      color: '#4267B2',
    },
    input: {
      backgroundColor: backgrounds.appSecondary,
      marginVertical: 5,
      paddingHorizontal: 20,
      paddingVertical: 17,
      fontSize: 15,
      color: text.primary,
      borderRadius: 13,
      flexGrow: 1,
    },
    loginsContainers: {
      // justifyContent: 'center',
      // alignItems: 'center',
      // alignContent: 'center',
    },
    appTitle: {
      textAlign: 'center',
      fontWeight: 'bold',
      color: theme.primary.main,
      fontSize: 25,
      marginBottom: 10,
    },
  });

  return {styles};
};

export default ScreenStyles;
