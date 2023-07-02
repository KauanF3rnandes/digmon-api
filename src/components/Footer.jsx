import './Footer.css'
import { Text, Box } from '@chakra-ui/react'

const Footer = () => {
    return (
        <footer className="footerBg">
            <Box className='boxCenter'>
                <Text>
                    Digmon-Api
                </Text>
            </Box>
        </footer>
    );
}

export default Footer;