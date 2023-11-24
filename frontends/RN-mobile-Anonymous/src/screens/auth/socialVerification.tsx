import React from 'react';
import {Container, Text} from '../../components';
import {useTheme} from '../../theme';
import createStyle from './style.css';
import {useTranslation} from 'react-i18next';
import AuthHOC from '../HOCs/authHoc';
import {Button} from '../../components';

const SocialVerification = () => {
  const {t} = useTranslation();
  const theme = useTheme();
  const {styles} = createStyle(theme);

  return (
    <>
      <Container style={[styles.loginsContainers]}>
        <Text style={styles.appTitle}>{t('common:verify-account')}</Text>

        <Button
          style={styles.btnLeft}
          iconName="google"
          value={t('common:verification:google-sign-in')}
          icoStyle={styles.googleIco}
          btnTextStyle={styles.btnText}
        />

        <Button
          style={styles.btnLeft}
          iconName="twitter"
          value={t('common:verification:twitter-sign-in')}
          icoStyle={styles.twitter}
          btnTextStyle={styles.btnText}
        />

        <Button
          style={styles.btnLeft}
          iconName="facebook-square"
          value={t('common:verification:facebook-sign-in')}
          icoStyle={styles.facebook}
          btnTextStyle={styles.btnText}
        />
      </Container>
    </>
  );
};

export default AuthHOC(SocialVerification);
