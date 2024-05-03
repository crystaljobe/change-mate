import React, { useState } from 'react';
import { Container, Row, Col, DropdownButton, Dropdown, Form, Button } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const DropdownComponent = () => {

    const [showProximityDropdown, setShowProximityDropdown] = useState(false);
    const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());

    const proximityOptions = ['5', '10', '25', '50', '100'];
    const categoryOptions = [
        "Advocacy",
        "Animal Welfare",
        "Arts & Culture",
        "Children & Youth",
        "Community Improvement",
        "Criminal Justice",
        "Disaster Relief",
        "Economic Development",
        "Education & Learning",
        "Environment, Sustainability, & Climate Change",
        "Food & Hunger",
        "Government & Politics",
        "Health, Wellnes, & Care",
        "Homeless & Housing",
        "Immigration, Refugee, & Human Rights",
        "Labor Rights",
        "LGBTQIA",
        "People with Disabilities",
        "Poverty & Low-income",
        "Race, Identity, & Equality",
        "Science & Technology",
        "Seniors & Elderly",
        "Veterans & Military Families",
        "Women & Equality",
    ];

    const handleDateFilterChange = (option) => {
        if (option === 'Custom Range') {
            setShowDatePicker(true);
        } else {
            setShowDatePicker(false);
            // handle other date filter options here
        }
    };

    const updateEventsForDateRange = () => {
        // Implement the logic to update events based on the selected date range
    };

    return (
        <Container fluid className="mt-5">
            <Row className="justify-content-center mt-4 mb-4">
                <Col xs={12} style={{ display: 'flex', justifyContent: 'center', gap: '20px', padding: '10px 0' }}>
                    <DropdownButton id="proximity-dropdown" title="Proximity" variant="secondary">
                        {proximityOptions.map(option => (
                            <Dropdown.Item key={option} as="button" onClick={() => console.log(`${option} miles selected`)}>
                                {option} miles
                            </Dropdown.Item>
                        ))}
                    </DropdownButton>

                    <DropdownButton id="category-dropdown" title="By Category" variant="secondary">
                        {categoryOptions.map(option => (
                            <Dropdown.Item key={option} as="button" onClick={() => console.log(`${option} selected`)}>
                                {option}
                            </Dropdown.Item>
                        ))}
                    </DropdownButton>

                    <DropdownButton id="date-dropdown" title="Filter by Day" variant="secondary">
                        <Dropdown.Item as="button" onClick={() => setShowDatePicker(!showDatePicker && true)}>Custom Range</Dropdown.Item>
                        <Dropdown.Item as="button" onClick={() => console.log('Today Selected')}>Today</Dropdown.Item>
                        <Dropdown.Item as="button" onClick={() => console.log('This Week Selected')}>This Week</Dropdown.Item>
                        <Dropdown.Item as="button" onClick={() => console.log('This Month Selected')}>This Month</Dropdown.Item>
                    </DropdownButton>

                    {showDatePicker && (
                        <Form>
                            <DatePicker
                                selected={startDate}
                                onChange={(dates) => {
                                    const [start, end] = dates;
                                    if (start) setStartDate(start);
                                    if (end) setEndDate(end);
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
                                console.log('Date Range Updated');
                                setShowDatePicker(false); // Hide the DatePicker when the update is clicked
                            }}>Update</Button>
                        </Form>
                    )}
                </Col>
            </Row>
        </Container>
    );
};

export default DropdownComponent;