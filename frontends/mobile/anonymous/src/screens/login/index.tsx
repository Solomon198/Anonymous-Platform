import React from 'react';
import {
  SafeAreaView,
  StatusBar,
  Image,
  View,
  TouchableOpacity,
  TouchableNativeFeedback,
} from 'react-native';
import {Text, Heading} from 'native-base';
import {useTheme} from '../../theme';
import createStyle from './style.css';
// @ts-ignore
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useTranslation} from 'react-i18next';

const Login = () => {
  const {t} = useTranslation();
  const theme = useTheme();
  const {styles} = createStyle(theme);

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar backgroundColor={theme.primary.main} />
      <View style={styles.imgContainer}>
        <Image
          resizeMethod="resize"
          resizeMode="contain"
          style={styles.img}
          source={require('../../../assets/media/images/image3.jpeg')}
        />

        <Image
          resizeMethod="resize"
          resizeMode="contain"
          style={[styles.img, styles.drawLeft]}
          source={require('../../../assets/media/images/man.jpeg')}
        />
      </View>
      <View style={[styles.loginsContainers]}>
        <Heading size="lg" style={styles.appTitle}>
          {t('common:signin')}
        </Heading>
        <TouchableOpacity style={styles.btnLeft}>
          <AntDesign size={26} name="google" style={styles.googleIco} />
          <Text style={styles.btnText}>{t('common:login:google-sign-in')}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btnLeft}>
          <AntDesign size={26} name="twitter" style={styles.twitter} />
          <Text style={styles.btnText}>
            {t('common:login:twitter-sign-in')}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btnLeft}>
          <AntDesign size={26} name="facebook-square" style={styles.facebook} />
          <Text style={styles.btnText}>
            {t('common:login:facebook-sign-in')}
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.createAccountText}>
          {t('common:login:no-account')}
          <TouchableNativeFeedback>
            <Text style={styles.createAccountSubText}>
              {t('common:create-account')}
            </Text>
          </TouchableNativeFeedback>
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default Login;
