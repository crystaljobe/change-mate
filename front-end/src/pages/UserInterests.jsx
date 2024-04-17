import {Container,Row,Col,Card} from 'react-bootstrap';
import { useEffect, useState } from 'react';
import { api } from '../utilities'


export default function interestCategories() {
    const [interestCategories, setInterestCategories] = useState(null);
    const [userInterests, setUserInterests] = useState(null);

    const getInterestCategories = async() => {
        const response = await api.get("interests/");
        console.log(response.data)
        // let categories = response.data.results
    };
    
    useEffect(() => {
        getInterestCategories();
    }, []);

    return (
        
        <Container id="user-interests-page">
            <h1 style={{color:'#DF355F'}}>Please select your areas of interest:</h1>
            <Row>
            {interestCategories && interestCategories.map(category=>(
            <Col key={interestCategories.id} className='p-2'>
                <Card key={interestCategories.id} style={{ width: '18rem' }}>
                    <Card.Body>
                        <Card.Title>
                        {interestCategories.category}
                        </Card.Title>
                    </Card.Body>
                </Card>
            </Col>))}
            </Row>

        </Container>
    )
}