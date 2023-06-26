import { useTranslation } from 'react-i18next'

export const useNavTranslatedValues = (): string[] => {
    const { t } = useTranslation()
    const links = [
        `${t('common:navigationWidget:home')}`,
        `${t('common:navigationWidget:features')}`,
        `${t('common:navigationWidget:courses')}`,
        `${t('common:navigationWidget:about')}`,
        `${t('common:navigationWidget:support')}`,
        `${t('common:navigationWidget:login')}`,
    ]
    return links
}
