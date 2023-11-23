import React from 'react';
import {View} from 'react-native';
import {Heading} from 'native-base';
import {useTheme} from '../../theme';
import createStyle from './style.css';
import {useTranslation} from 'react-i18next';
import AuthHOC from '../HOCs/authHoc';
import {Button} from '../../components';

type Props = {
  componentId: string;
  isSignup: boolean;
};
const SocialVerification = (props: Props) => {
  const {t} = useTranslation();
  const theme = useTheme();
  const {styles} = createStyle(theme);
  const {isSignup} = props;

  return (
    <>
      <View style={[styles.loginsContainers]}>
        <Heading size="lg" style={styles.appTitle}>
          {t(isSignup ? 'common:signup-account' : 'common:signin')}
        </Heading>

        <Button
          style={styles.btnLeft}
          iconName="google"
          value={t(
            isSignup
              ? 'common:signup:google-sign-up'
              : 'common:login:google-sign-in',
          )}
          icoStyle={styles.googleIco as any}
          btnTextStyle={styles.btnText}
        />

        <Button
          style={styles.btnLeft}
          iconName="twitter"
          value={t(
            isSignup
              ? 'common:signup:twitter-sign-up'
              : 'common:login:twitter-sign-in',
          )}
          icoStyle={styles.twitter as any}
          btnTextStyle={styles.btnText}
        />

        <Button
          style={styles.btnLeft}
          iconName="facebook-square"
          value={t(
            isSignup
              ? 'common:signup:facebook-sign-up'
              : 'common:login:facebook-sign-in',
          )}
          icoStyle={styles.facebook as any}
          btnTextStyle={styles.btnText}
        />
      </View>
    </>
  );
};

export default AuthHOC(SocialVerification);
