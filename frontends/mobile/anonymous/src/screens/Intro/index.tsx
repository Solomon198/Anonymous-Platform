import React from 'react';
import {
  SafeAreaView,
  View,
  TouchableOpacity,
  StatusBar,
  Image,
} from 'react-native';
import {Text, Container, Heading} from 'native-base';
import createStyles from './style.css';
import {useTheme} from '../../theme';
import {useTranslation} from 'react-i18next';

export default function InitScreen() {
  const createAccount = () => {
    // Navigation.push(this.props.componentId, {
    //   component: {
    //     id: NavigationScreens.SIGNUP_SCREEN,
    //     name: NavigationScreens.SIGNUP_SCREEN,
    //   },
    // });
  };

  const login = () => {
    // Navigation.push(this.props.componentId, {
    //   component: {
    //     id: NavigationScreens.LOGIN_SCREEN,
    //     name: NavigationScreens.LOGIN_SCREEN,
    //   },
    // });
  };
  const theme = useTheme();
  const {styles} = createStyles(theme);
  const {t} = useTranslation();

  return (
    <SafeAreaView style={styles.mainContainer}>
      <StatusBar backgroundColor={theme.backgrounds.appPrimary} />
      <Image
        // @ts-ignore
        style={styles.img}
        source={require('../../../assets/media/images/hanwok.png')}
      />
      <Container style={styles.contentContainer}>
        <Heading size="lg" style={styles.appTitle}>
          {t('common:intro-screen:text-1')}
        </Heading>
        <Text style={styles.aboutApp}>{t('common:intro-screen:text-2')}</Text>

        <View style={styles.btnGroup}>
          <TouchableOpacity
            onPress={() => createAccount()}
            style={styles.btnLeft}>
            <Text style={styles.btnText}>{t('common:register')}</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => login()} style={styles.btnRight}>
            <Text style={styles.btnText}>{t('common:signin')}</Text>
          </TouchableOpacity>
        </View>
      </Container>
    </SafeAreaView>
  );
}
