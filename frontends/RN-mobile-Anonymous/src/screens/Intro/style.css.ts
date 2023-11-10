import {StyleSheet} from 'react-native';
import {TTheme} from '../../../types';

const ScreenStyles = (theme: TTheme) => {
  const {backgrounds, text} = theme;
  const styles = StyleSheet.create({
    mainContainer: {
      backgroundColor: backgrounds.appPrimary,
      color: text.primary,
      flex: 1,
      padding: 3,
    },
    appTitle: {
      textAlign: 'center',
      fontWeight: 'bold',
      color: text.primary,
      fontSize: 25,
      width: 300,
    },
    aboutApp: {
      color: text.primary,
      fontSize: 14,
      textAlign: 'center',
      marginVertical: 15,
    },
    imgContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    img: {
      borderRadius: 200,
      // @ts-ignore
      width: 300,
      height: 300,
    },
    contentContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      alignContent: 'center',
      paddingHorizontal: 40,
      backgroundColor: backgrounds.appPrimary,
    },
    btnGroup: {flexDirection: 'row', marginTop: 25},
    btnLeft: {
      flexGrow: 1,
      backgroundColor: backgrounds.appSecondary,
      paddingVertical: 20,
      borderRadius: 17,
      marginRight: -15,
    },
    btnRight: {
      flexGrow: 1,
      paddingVertical: 20,
      borderColor: backgrounds.appSecondary,
      borderWidth: 1,
      borderTopRightRadius: 20,
      borderBottomRightRadius: 20,
    },
    btnText: {
      textAlign: 'center',
      fontWeight: '900',
      color: text.secondary,
    },
  });

  return {styles};
};

export default ScreenStyles;
