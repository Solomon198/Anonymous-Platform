import { type TextareaAutosizeProps } from '@mui/base/TextareaAutosize'
import { StyledTextarea } from './default.style'

export interface ITextArea extends TextareaAutosizeProps {}

const TextArea = (props: ITextArea): JSX.Element => {
    return <StyledTextarea {...props} />
}

export default TextArea
