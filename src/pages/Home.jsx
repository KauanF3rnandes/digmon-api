import { useCallback, useEffect, useState } from "react";
import axios from 'axios';
import { Card, CardBody, CardFooter, Box, Container, Center, Text } from '@chakra-ui/react'
import { Image, SimpleGrid, Spinner, Divider, Button } from '@chakra-ui/react'
import './Home.css';
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";

const Home = () => {

    const [digimonData, setDigimonData] = useState([])
    const [loading, setLoading] = useState(true)
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [totalItems, setTotalItems] = useState(0);

    const navigate = useNavigate()

    const axiosDigimonData = useCallback(async () => {
        try {
            setLoading(true)
            const { data } = await axios.get('https://digimon-api.vercel.app/api/digimon')
            setDigimonData(data)
            setTotalItems(data.length);
        } catch (error) {
            console.error(error)
        } finally {
            setLoading(false)
        }
    }, [])

    useEffect(() => {
        axiosDigimonData()
    }, [])

    const digimonPickHandler = () => {
        navigate("/profile")
    }

    const indexOfLastItem = currentPage * itemsPerPage;

    const indexOfFirstItem = indexOfLastItem - itemsPerPage;

    const currentItems = digimonData.slice(indexOfFirstItem, indexOfLastItem);

    const totalPages = Math.ceil(totalItems / itemsPerPage);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);


    const getDigimonData = () => {
        if (loading) {
            return (
                <Center>
                    <Spinner />
                </Center>
            )
        }
        return (
            <Box className="BoxAlign">
                {currentItems.map((digimon, index) => (
                    <SimpleGrid>
                        <Container key={index}>
                            <Card maxW='sm' boxSize='300px' border='1px' borderColor='black.300' className="card" boxShadow='2xl'>
                                <CardBody> 
                                    <Box key={index}>
                                        <Center>
                                            <Image src={digimon.img} alt="Imagens Digimon" boxSize='100px'/>
                                        </Center>
                                        <Text as='b'>{digimon.name}</Text>
                                        <Text id="colorText">{digimon.level}</Text>
                                        <Divider/>
                                    </Box>
                                </CardBody>
                                <Center>
                                    <CardFooter>
                                        <Button onClick={() => digimonPickHandler()} colorScheme='blue'>Detalhes</Button>
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
            <SimpleGrid>
                <div className="paginacao">
                    <ul>
                        {Array.from({ length: totalPages }).map((_, index) => (
                        <li key={index}>
                            <button onClick={() => paginate(index + 1)}>{index + 1}</button>
                        </li>
                        ))}
                    </ul>
                </div>
            </SimpleGrid>
            <Footer/>
        </Box>
    );
}

export default Home;