import React, {useState, useEffect} from 'react';
import {SafeAreaView, StatusBar, Image} from 'react-native';
import {useTheme} from '../../theme';
import createStyle from './style.css';
// @ts-ignore
import {useTranslation} from 'react-i18next';
import {AuthMode} from '../../../utils';
import {Text, Container, Link} from '../../components';

interface Props {
  isSignup: boolean;
}

const useAuthHocUtilsHook = ({isSignup}: Props) => {
  const {t} = useTranslation();
  const theme = useTheme();
  const {styles} = createStyle(theme);
  const [authMode, setAuthMode] = useState<AuthMode>(AuthMode.SIGNUP);
  useEffect(() => {
    // Intializes auth mode base on button pressed in intial screen
    setAuthMode(isSignup ? AuthMode.SIGNUP : AuthMode.SIGNIN);
  }, [isSignup]);
  return {t, theme, styles, authMode, setAuthMode};
};

const AuthHOC = (AuthComponent: any) => {
  return function (props: any) {
    const {t, theme, styles, authMode, setAuthMode} =
      // eslint-disable-next-line react-hooks/rules-of-hooks
      useAuthHocUtilsHook(props);
    const isSignup = authMode === AuthMode.SIGNUP;
    const combinedProps = {...props, isSignup};

    const handleAuthMode = () => {
      setAuthMode(isSignup ? AuthMode.SIGNIN : AuthMode.SIGNUP);
    };

    return (
      <SafeAreaView style={styles.safeArea}>
        <StatusBar backgroundColor={theme.primary.main} />
        <Container style={styles.imgContainer}>
          <Image
            resizeMethod="resize"
            resizeMode="contain"
            style={styles.img}
            accessibilityLabel="adult Image"
            source={require('../../../assets/media/images/image3.jpeg')}
          />

          <Image
            resizeMethod="resize"
            resizeMode="contain"
            accessibilityLabel="teanager Image"
            style={[styles.img, styles.drawLeft]}
            source={require('../../../assets/media/images/man.jpeg')}
          />
        </Container>

        <AuthComponent {...combinedProps} />

        {!props.hideBottomLink && (
          <Container style={styles.textContainer}>
            <Text style={styles.createAccountText}>
              {t(
                isSignup
                  ? 'common:signup:have-account'
                  : 'common:login:no-account',
              )}
            </Text>
            <Link style={styles.link} onPress={handleAuthMode}>
              {t(isSignup ? 'common:signin' : 'common:create-account')}
            </Link>
          </Container>
        )}
      </SafeAreaView>
    );
  };
};

export default AuthHOC;
