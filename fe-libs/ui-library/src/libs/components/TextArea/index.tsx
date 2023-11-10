import React from 'react'
import { type TextareaAutosizeProps } from '@mui/base'
import { StyledTextarea } from './default.style'

export interface ITextArea extends TextareaAutosizeProps {}

const TextArea: React.FC<ITextArea> = (props: ITextArea): JSX.Element => {
    return <StyledTextarea {...props} />
}

export default TextArea
