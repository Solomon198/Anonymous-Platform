import React from 'react';
import {SafeAreaView, StatusBar, Image} from 'react-native';
import createStyles from './style.css';
import {useTheme} from '../../theme';
import {useTranslation} from 'react-i18next';
import {Navigation} from 'react-native-navigation';
import {Screens} from '../../navigation';
import {Container, Text, Button} from '../../components';
type Props = {
  componentId: string;
};
export default function InitScreen(props: Props) {
  const gotoAuth = (isSignup: boolean) => {
    Navigation.push(props.componentId, {
      component: {
        name: Screens.AUTH_SCREEN,
        passProps: {
          isSignup,
        },
      },
    });
  };
  const theme = useTheme();
  const {styles} = createStyles(theme);
  const {t} = useTranslation();

  return (
    <SafeAreaView style={styles.mainContainer}>
      <StatusBar backgroundColor={theme.primary.main} />
      <Container style={styles.imgContainer}>
        <Image
          // @ts-ignore
          style={styles.img}
          accessibilityLabel="teenager image"
          source={require('../../../assets/media/images/image3.jpeg')}
        />
      </Container>
      <Container style={styles.contentContainer}>
        <Text style={styles.appTitle}>{t('common:intro-screen:text-1')}</Text>
        <Text style={styles.aboutApp}>{t('common:intro-screen:text-2')}</Text>

        <Container style={styles.btnGroup}>
          <Button
            value={t('common:register')}
            style={styles.btnLeft}
            btnTextStyle={styles.btnText}
            onPress={() => gotoAuth(true)}
          />
          <Button
            value={t('common:signin')}
            style={styles.btnRight}
            btnTextStyle={styles.btnText}
            onPress={() => gotoAuth(false)}
          />
        </Container>
      </Container>
    </SafeAreaView>
  );
}
