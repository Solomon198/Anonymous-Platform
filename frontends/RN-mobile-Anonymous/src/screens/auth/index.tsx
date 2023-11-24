import React from 'react';
import {Button, Input} from '../../components';
import {Text, Container} from '../../components';
import {useTheme} from '../../theme';
import {Navigation} from 'react-native-navigation';
import createStyle from './style.css';
// @ts-ignore
import {useTranslation} from 'react-i18next';
import AuthHOC from '../HOCs/authHoc';
import {Formik} from 'formik';
import * as Yup from 'yup';
import {Screens} from '../../navigation';

const AuthSchema = Yup.object().shape({
  password: Yup.string()
    .required()
    .min(8)
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/),
  email: Yup.string().email().required(),
});

type Props = {
  componentId: string;
  isSignup: boolean;
};
const Auth = (props: Props) => {
  const {t} = useTranslation();
  const theme = useTheme();
  const {styles} = createStyle(theme);
  const {isSignup} = props;

  const gotoVerification = () => {
    Navigation.push(props.componentId, {
      component: {
        name: Screens.SOCIAL_VERIFICATION,
        passProps: {
          hideBottomLink: true,
        },
      },
    });
  };

  const handleIsValid = (
    isValid: boolean,
    values: {email: string; password: string},
  ) => {
    return isValid && values.email?.trim() && values.password?.trim();
  };
  return (
    <>
      <Container style={[styles.loginsContainers]}>
        <Text style={styles.appTitle}>
          {t(isSignup ? 'common:signup-account' : 'common:signin')}
        </Text>
        <Formik
          onSubmit={values => {
            console.log(values);
          }}
          validateOnMount
          validationSchema={AuthSchema}
          initialValues={{email: '', password: ''}}>
          {({handleBlur, handleChange, errors, isValid, values}) => (
            <>
              <Input
                error={errors.email}
                onBlur={handleBlur('email')}
                onChangeText={handleChange('email')}
                editable={true}
                placeholder={t('common:email-placeholder')}
                style={styles.input}
              />

              <Input
                error={errors.password}
                onBlur={handleBlur('password')}
                onChangeText={handleChange('password')}
                editable={true}
                placeholder={t('common:password-placeholder')}
                style={styles.input}
                inputDetails={t('common:password-description')}
              />

              <Button
                style={{
                  ...styles.btnLeft,
                  backgroundColor: handleIsValid(isValid, values)
                    ? theme.primary.main
                    : theme.backgrounds.inputColor,
                }}
                onPress={gotoVerification}
                disabled={!isValid}
                iconName="login"
                icoStyle={
                  {
                    color: handleIsValid(isValid, values)
                      ? theme.backgrounds.webPrimary
                      : theme.text.secondary,
                  } as any
                }
                value={t('common:auth-continue-btn')}
                btnTextStyle={
                  {
                    ...styles.btnText,
                    color: handleIsValid(isValid, values)
                      ? theme.backgrounds.webPrimary
                      : theme.text.secondary,
                  } as any
                }
              />
            </>
          )}
        </Formik>
      </Container>
    </>
  );
};

export default AuthHOC(Auth);
