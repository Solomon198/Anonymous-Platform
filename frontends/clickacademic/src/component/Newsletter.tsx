import newsletterImg from '../assets/dizzy-sending-messages 1.png'
import { Button, Input, Text } from '@dixre/ui-library'
import { Container, Box } from '@mui/material'

const Newsletter = (): JSX.Element => {
    return (
        <Container
            sx={{
                display: {
                    xl: 'flex',
                    lg: 'flex',
                    sm: 'block',
                    xs: 'block',
                },
                alignContent: 'center',
                alignItems: 'center',
                width: {
                    lg: '1151px',
                    sm: '640px',
                },
            }}
        >
            <img
                src={newsletterImg}
                alt="Newsletter Image"
                style={{ maxWidth: '100%', marginBottom: "1rem" }}
            />
            <Container>
                <Text variant="h3" color="primary">
                    Stay Tuned!
                </Text>
                <Text
                    variant="subtitle1"
                    color="primary"
                    style={{ textAlign: 'justify' }}
                >
                    Get the latest articles and business updates that you need
                    to know, you’ll even get special recommendations weekly.
                </Text>
                <Box
                    sx={{
                        backgroundColor: {
                            lg: '#f6f6f6',
                            sm: "none",
                        },
                        borderRadius: '15px',
                        display: {
                        lg: 'flex',
                        sm: "block",
                        },
                        marginTop: "1rem"
                    }}
                >
                    <Input
                        style={{
                            width: 300,
                            border: 'none',
                            backgroundColor: '#f6f6f6',
                        }}
                        placeholder="Your Email"
                    />
                    <Button
                        text="Subscribe"
                        variant="contained"
                        size="large"
                        sx={{
                            borderRadius: {
                                lg:'0px 12px 12px 28px',
                                xs: "0px 10px 10px 20px"
                            },
                            marginTop: {
                                lg: 0,
                                xs: "1rem"
                            },
                            background: '#FF2F4F',
                            display: "flex",
                        }}
                    />
                </Box>
            </Container>
        </Container>
    )
}

export default Newsletter
