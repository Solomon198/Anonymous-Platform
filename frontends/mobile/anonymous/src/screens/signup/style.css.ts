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
      fontWeight: '500',
      fontSize: 16,
      color: text.secondary,
      marginLeft: 10,
    },

    safeArea: {
      flex: 1,
      backgroundColor: backgrounds.appPrimary,
      justifyContent: 'space-evenly',
      alignContent: 'space-between',
    },

    img: {
      width: 170,
      height: 170,
      borderRadius: 200,
    },
    imgContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      alignContent: 'center',
      justifyContent: 'center',
    },
    drawLeft: {
      marginLeft: -40,
    },
    btnLeft: {
      backgroundColor: backgrounds.appSecondary,
      paddingVertical: 20,
      borderRadius: 30,
      width: width - 50,
      marginHorizontal: 20,
      justifyContent: 'center',
      alignContent: 'center',
      alignItems: 'center',
      flexDirection: 'row',
      marginVertical: 5,
    },
    googleIco: {
      color: '#DB4437',
    },
    twitter: {
      color: '#1DA1F2',
    },
    facebook: {
      color: '#4267B2',
    },
    loginsContainers: {
      justifyContent: 'center',
      alignItems: 'center',
      alignContent: 'center',
    },
    textContainer: {
      justifyContent: 'center',
      alignItems: 'center',
    },
    createAccountText: {
      fontSize: 16,
    },
    createAccountSubText: {
      fontWeight: 'bold',
      color: theme.primary.main,
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
