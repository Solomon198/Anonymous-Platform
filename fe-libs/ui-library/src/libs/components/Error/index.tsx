import Text from '../Text'

export interface IError {
    touched: boolean
    error: string

    required: boolean
}
const Error = (props: IError): JSX.Element => {
    const { touched, error, required } = props
    if (touched && Boolean(error) && required) {
        return (
            <Text color="red" variant="caption">
                {error}
            </Text>
        )
    }
    return <></>
}

export default Error
