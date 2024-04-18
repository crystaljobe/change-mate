import { useNavigate, useOutletContext, useParams } from "react-router-dom";
import { useEffect, useState } from 'react';
import { api } from '../utilities'
import LocationSearch from "../components/LocationSearch";
import {Container, Row, Col, Card, Button, Form} from 'react-bootstrap';

export default function CreateEvent() {
    return (
        <div>
        <h1>Event Creation Page</h1>
        <Form method="post" action="/events">
        <input type="text" name="title" />
        <input type="text" name="description" />
        <button type="submit">Create</button>
      </Form>
      </div>
    )
}