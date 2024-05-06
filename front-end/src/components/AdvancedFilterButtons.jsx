import React, { useState, useEffect } from 'react';
import { Container, Row, Col, DropdownButton, Dropdown, Form, Button } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { getInterestCategories } from '../utilities/InterestCategoriesUtilities';
import { startOfWeek, endOfWeek } from 'date-fns';

const DropdownComponent = ({setSelectedCategory, setSelectedStartDate, setSelectedEndDate, setDistance}) => {
    const [interestCategories, setInterestCategories] = useState([]);
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [startDate, setStartDate] = useState(new Date()); 
    const [endDate, setEndDate] = useState(new Date()); 

    const proximityOptions = ['5', '10', '25', '50', '100'];

    // Get interest categories using utility function to set options available
    const fetchInterestCategories = async () => {
        const categories = await getInterestCategories();
        setInterestCategories(categories);
    };

    useEffect(() => {
        fetchInterestCategories();
    }, []);

    // Function to format date to "YYYY-MM-DD" format
    const formatDate = (date) => {
        // Get the individual components of the date
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Month is zero-based
        const year = date.getFullYear();

        // Return the formatted date
        return `${year}-${month}-${day}`;
    };

    // Function to get dates of current week
    const handleThisWeekSelection = () => {
        const today = new Date();
        const startOfWeekDate = startOfWeek(today); // Start of the current week
        const endOfWeekDate = endOfWeek(today); // End of the current week
    
        setSelectedStartDate(formatDate(startOfWeekDate));
        setSelectedEndDate(formatDate(endOfWeekDate));
    };

    // Function to get the start date of the current month
    const getStartOfMonth = (date) => {
        return new Date(date.getFullYear(), date.getMonth(), 1);
    };
    
    // Function to get the end date of the current month
    const getEndOfMonth = (date) => {
        return new Date(date.getFullYear(), date.getMonth() + 1, 0);
    };
    
    // Sets the start of the month to the selectedStartDate and the end of the month to the selectedEndDate
    const handleThisMonthSelection = () => {
        const today = new Date();
        const startOfMonthDate = getStartOfMonth(today); // Start of the current month
        const endOfMonthDate = getEndOfMonth(today); // End of the current month
    
        setSelectedStartDate(formatDate(startOfMonthDate));
        setSelectedEndDate(formatDate(endOfMonthDate));
    };

    // Resets filtere data and re-calls search with original parameters
    const handleFilterReset = async (e) => {
        e.preventDefault()
        setSelectedCategory('')
        setSelectedStartDate('')
        setSelectedEndDate('')
        setDistance(100)
    }

    return (
        <Container fluid className="mt-5">
            <Row className="justify-content-center mt-4">
                <Col xs={12} style={{ display: 'flex', justifyContent: 'center', gap: '20px', padding: '10px 0', flexWrap:'wrap'}}>
                    {/* Proximity Dropdown Filter */}
                    <DropdownButton id="proximity-dropdown" title="Filter by Proximity" variant="secondary">
                        {proximityOptions.map(option => (
                            <Dropdown.Item key={option} as="button" onClick={() => setDistance(parseInt(option))}>
                                {option} miles
                            </Dropdown.Item>
                        ))}
                    </DropdownButton>
                    
                    {/* Category Dropdown Filter */}
                    <DropdownButton id="category-dropdown" title="Filter by Category" variant="secondary">
                        {interestCategories.map(option => (
                            <Dropdown.Item key={option.id} as="button" onClick={() => setSelectedCategory(option.category)}>
                                {option.category}
                            </Dropdown.Item>
                        ))}
                    </DropdownButton>
                    
                    {/* Date Dropdown Filter */}
                    <DropdownButton id="date-dropdown" title="Filter by Day" variant="secondary">
                        <Dropdown.Item as="button" onClick={() => setShowDatePicker(!showDatePicker && true)}>Custom Range</Dropdown.Item>
                        <Dropdown.Item as="button" onClick={() => {
                            // Set the start and end date to today
                            const today = new Date();
                            setSelectedStartDate(formatDate(today));
                            setSelectedEndDate(formatDate(today));
                        }}>Today</Dropdown.Item>
                        <Dropdown.Item as="button" onClick={() => handleThisWeekSelection()}>This Week</Dropdown.Item>
                        <Dropdown.Item as="button" onClick={() => handleThisMonthSelection()}>This Month</Dropdown.Item>
                    </DropdownButton>
                    
                    {/* Date Picker Filter */}
                    {showDatePicker && (
                        <Form>
                            <DatePicker
                                selected={startDate}
                                onChange={(date) => {
                                    if (Array.isArray(date)) {
                                        // Both dates are selected, set both start and end date
                                        const [start, end] = date;
                                        setStartDate(start);
                                        setEndDate(end);
                                    } else {
                                        // Only one date is selected, set both start and end date to the clicked date
                                        setStartDate(date);
                                        setEndDate(date);
                                    }
                                }}
                                startDate={startDate}
                                endDate={endDate}
                                selectsRange
                                inline
                                highlightDates={[{
                                    "startDate": startDate,
                                    "endDate": endDate,
                                    "key": "selection"
                                }]}
                            />
                            <Button variant="primary" onClick={() => {
                                setSelectedStartDate(formatDate(startDate));
                                setSelectedEndDate(formatDate(endDate));
                                setShowDatePicker(false); // Hide the DatePicker when the update is clicked
                            }}>Update</Button>
                        </Form>
                    )}
                </Col>
            </Row>
            <Row>
                <Button variant='link'  onClick={(e) => handleFilterReset(e)}>Reset Filters</Button>
            </Row>
        </Container>
    );
};

export default DropdownComponent;