import {Container, Col, Card, Button, Stack} from 'react-bootstrap';
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from 'react';
import { api } from '../utilities'


export default function UserInterests() {
    const styles = {
        header: {
            color:'#DF355F',
            justifyContent: 'center',
        }
    }

    const [interestCategories, setInterestCategories] = useState([]);
    const [userInterests, setUserInterests] = useState([]);
    // const [userSubmittedInterestCategory, setUserSubmittedInterestCategory] = useState("");
    const navigate = useNavigate();

    console.log('interestCats:', interestCategories)
    console.log('userInterests:', userInterests)

    const getInterestCategories = async() => {
        const response = await api.get("interests/");
        setInterestCategories(response.data)
    };

    const postUserInterests = async() => {
        let response = await api.post('/userprofile/user_interests/', {
            'interests': userInterests,
        });
        console.log(response.data)
        console.log(response.status)
        if (response.status === 200) {
            navigate('/profile')
        } else {
            console.log('error:', response.data)
        }
    }

    useEffect(() => {
        getInterestCategories();
    }, [])

    function handleSubmit(e) {
        e.preventDefault();
        postUserInterests();
    }


    return (
        
        <Container>
            <Stack gap={2}>
            <div className="p-2">
                <h1 style={styles.header}>Please select your areas of interest:</h1>
            </div>
            <div className="p-2">
                <select 
                    multiple={true} 
                    value={userInterests}
                    onChange={e => {
                        const options = [...e.target.selectedOptions];
                        const values = options.map(option => option.value);
                        setUserInterests(values);}}
                    >
                    {interestCategories && interestCategories.map(category => (
                    <option key={category.id} value={category.id}>{category.category}</option>
                    ))}
                </select>
            </div>
            <div className="p-2">
                <Button type="button" onClick={handleSubmit}>Update Interests</Button>
            </div>
            </Stack>
            
            {/* 
            <label>Other:
                <textarea divs={1} cols={60} style={{borderWidth: 2}} name='userSubmittedInterestCategory' 
                value={userSubmittedInterestCategory} 
                onChange={e => setUserSubmittedInterestCategory(e.target.value)} />
            </label>
            */}
            {/* <Button style={{margin:'1rem'}} type="reset" onClick={() => {useEffect}}>Reset Selection</Button> */}

        </Container>
    )
}