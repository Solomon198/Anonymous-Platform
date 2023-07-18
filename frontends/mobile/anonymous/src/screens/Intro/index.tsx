import React from 'react';
import {
  SafeAreaView,
  View,
  TouchableOpacity,
  StatusBar,
  Image,
} from 'react-native';
import {Text, Heading} from 'native-base';
import createStyles from './style.css';
import {useTheme} from '../../theme';
import {useTranslation} from 'react-i18next';
import {Navigation} from 'react-native-navigation';
import {Screens} from '../../navigation';
type Props = {
  componentId: string;
};
export default function InitScreen(props: Props) {
  const createAccount = () => {
    Navigation.push(props.componentId, {
      component: {
        name: Screens.SIGNUP_SCREEN,
      },
    });
  };

  const login = () => {
    Navigation.push(props.componentId, {
      component: {
        name: Screens.LOGIN_SCREEN,
      },
    });
  };
  const theme = useTheme();
  const {styles} = createStyles(theme);
  const {t} = useTranslation();

  return (
    <SafeAreaView style={styles.mainContainer}>
      <StatusBar backgroundColor={theme.primary.main} />
      <View style={styles.imgContainer}>
        <Image
          // @ts-ignore
          style={styles.img}
          source={require('../../../assets/media/images/image3.jpeg')}
        />
      </View>
      <View style={styles.contentContainer}>
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
      </View>
    </SafeAreaView>
  );
}
