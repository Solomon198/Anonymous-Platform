import { useTranslation } from 'react-i18next'
import { routes } from '../const'

export const useNavTranslatedValues = (): string[] => {
    const { t } = useTranslation()
    const links = routes.map(
        (link) => `${t(`common:navigationWidget:${link}`)}`
    )
    return links
}
