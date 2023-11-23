import React from 'react';
import {View} from 'react-native';
import {Button, Input} from '../../components';
import {Heading} from 'native-base';
import {useTheme} from '../../theme';
import createStyle from './style.css';
// @ts-ignore
import {useTranslation} from 'react-i18next';
import AuthHOC from '../HOCs/authHoc';
import {Formik} from 'formik';
import * as Yup from 'yup';

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

  return (
    <>
      <View style={[styles.loginsContainers]}>
        <Heading size="lg" style={styles.appTitle}>
          {t(isSignup ? 'common:signup-account' : 'common:signin')}
        </Heading>
        <Formik
          onSubmit={values => {
            console.log(values);
          }}
          validateOnMount
          validationSchema={AuthSchema}
          initialValues={{email: '', password: ''}}>
          {({handleBlur, handleChange, errors, isValid}) => (
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
                  backgroundColor: isValid
                    ? theme.primary.main
                    : theme.backgrounds.inputColor,
                }}
                disabled={!isValid}
                iconName="login"
                icoStyle={
                  {
                    color: isValid
                      ? theme.backgrounds.webPrimary
                      : theme.text.secondary,
                  } as any
                }
                value={t('common:auth-continue-btn')}
                btnTextStyle={
                  {
                    ...styles.btnText,
                    color: isValid
                      ? theme.backgrounds.webPrimary
                      : theme.text.secondary,
                  } as any
                }
              />
            </>
          )}
        </Formik>
      </View>
    </>
  );
};

export default AuthHOC(Auth);
