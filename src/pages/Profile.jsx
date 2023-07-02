import NavBar from "../components/NavBar";
import { useCallback, useEffect, useState } from "react";
import axios from 'axios';
import { Card, CardBody, CardFooter, Box, Container, Center, Text } from '@chakra-ui/react'
import { Image, SimpleGrid, Spinner, Divider } from '@chakra-ui/react'
import './Profile.css';
import Footer from "../components/Footer";

const Profile = () => {
    const [digimonData, setDigimonData] = useState()
    const [loading, setLoading] = useState(true)


    const axiosDigimonData = useCallback(async () => {
        try {
            setLoading(true)
            const { data } = await axios.get('https://digimon-api.vercel.app/api/digimon')
            setDigimonData(data)
        } catch (error) {
            console.error(error)
        } finally {
            setLoading(false)
        }
    }, [])

    useEffect(() => {
        axiosDigimonData()
    }, [])

    const getDigimonData = () => {
        if (loading) {
            return (
                <Center>
                    <Spinner />
                </Center>
            )
        }
        return (
            <Box className="BoxAlign" bgGradient={[
                'linear(to-tr, teal.300, yellow.400)',
                'linear(to-t, blue.200, teal.500)',
                'linear(to-b, orange.100, purple.300)',
              ]}>
                {digimonData.map(digimon => (
                    <SimpleGrid>
                        <Container>
                            <Card maxW='sm' border='2px' borderColor='black.500' className="cardEdit">
                                <CardBody> 
                                    <Center>
                                        <Image src={digimon.img} alt="Imagens Digimon" boxSize='100px'/>
                                    </Center>
                                    <Divider/>
                                </CardBody>
                                <Center>
                                    <CardFooter>
                                        <Text as='b'>{digimon.name}</Text>
                                    </CardFooter>
                                </Center>
                            </Card>
                        </Container>
                    </SimpleGrid>
                ))}
            </Box>
        )
    }

    return (
        <Box>
            <NavBar/>
            {getDigimonData()}
            <Footer/>
        </Box>
    );
}

export default Profile;