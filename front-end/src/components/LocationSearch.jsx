import React from 'react';
import ReactDOM from 'react-dom';
import { AddressAutofill } from '@mapbox/search-js-react';
import { useEffect, useState, useConfirmAddress, config } from 'react';
import { Form } from 'react-bootstrap';
 
export default function LocationSearch() {
    const [locationInput, setLocationInput] = useState("")
    console.log("loc", locationInput)

    return (
        <Form.Group className="mb-3" controlId="formLocationSearch">
            <Form.Label>Enter your area:
            <br/>
            <AddressAutofill 
                accessToken="pk.eyJ1IjoibWNyZXlub2xkc2giLCJhIjoiY2x2MzFuNzN6MGhoOTJycnd5ZHQ3eWR4ayJ9.QKI5tsCAXhuzNb2XzhyjOg">
                <input
                name="city"
                placeholder="city"
                autoComplete="address-level2"
                value={locationInput}
                type="text"
                size={40}
                onChange={(e) => setLocationInput(e.target.value)}
                />
            </AddressAutofill>
            </Form.Label>
        </Form.Group>
    )
}

{/* <input
                name="state" 
                placeholder="State" 
                type="text"
                autoComplete="address-level1"
                /> */}
{/* <input name="address" placeholder="Address" type="text" />
<input name="unit" placeholder="Unit number" type="text" />
<input name="city" placeholder="City" type="text" />
<input name="state" placeholder="State" type="text" />
<input name="country" placeholder="Country" type="text" />
<input name="postcode" placeholder="Postcode" type="text" /> */}