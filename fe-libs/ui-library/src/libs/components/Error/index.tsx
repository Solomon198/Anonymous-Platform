import Text from '../Text'

export interface IError {
    touched: boolean
    error: boolean

    name: string

    required: boolean
}
const Error = (props: IError): JSX.Element => {
    const { touched, error, name, required } = props
    if (touched && error && required) {
        return (
            <Text color="red" variant="caption">
                Invalid {name}
            </Text>
        )
    }
    return <></>
}

export default Error
