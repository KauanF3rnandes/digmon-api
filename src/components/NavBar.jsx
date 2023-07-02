import { Text, Image, Box, Input } from '@chakra-ui/react'
import './NavBar.css'
import { useNavigate } from 'react-router-dom';

const NavBar = () => {

    const navigate = useNavigate()

    return (
        <header className='headerBg'>
            <nav className='navBar'>
                <Box>
                    <Image className='imgNavBar' src='/assets/Digimon_Logo.svg.png' alt='Digmon Logo'
                    sx={{ cursor: 'pointer' }} onClick={() => navigate("/")} />
                </Box>
                <Box>
                    <Input placeholder='Search' className='inputSearch'/>
                </Box>
            </nav>
        </header>
    );
}

export default NavBar;