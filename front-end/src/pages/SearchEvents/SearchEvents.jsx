import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './SearchEvents.css'; // Assuming you add a CSS file for extra styles

function SearchEvents() {
    return (
        <div className="search-events">
            {/* Search Bar */}
            <div className="container-fluid mt-5">
                <div className="row">
                    <div className="col">
                        <form className="d-flex search-form">
                            <input className="form-control me-2" type="search" placeholder="Search for events" aria-label="Search" />
                            <button className="btn btn-outline-primary" type="submit">Search</button>
                        </form>
                    </div>
                </div>
            </div>

            {/* Popular Events */}
            <div className="container-fluid mt-5">
                <h2 className="mb-3 text-center">Popular Events</h2>
                <div className="row row-cols-1 row-cols-lg-4 g-4">
                    {[1, 2, 3, 4].map((event, index) => (
                        <div key={index} className="col">
                            <div className="card h-100 shadow-sm card-hover">
                                <img src={`https://picsum.photos/400/300?random=${index}`} className="card-img-top" alt="Event" />
                                <div className="card-body">
                                    <h5 className="card-title">Event Title {index}</h5>
                                    <p className="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                                    <a href="#" className="btn btn-primary">Learn More</a>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Events Needing Volunteers */}
            <div className="container-fluid mt-5 mb-5">
                <h2 className="mb-3 text-center">Events Needing Volunteers</h2>
                <div className="row row-cols-1 row-cols-lg-4 g-4">
                    {[5, 6, 7, 8].map((event, index) => (
                        <div key={index} className="col">
                            <div className="card h-100 shadow-sm card-hover">
                                <img src={`https://picsum.photos/400/300?random=${index+4}`} className="card-img-top" alt="Event" />
                                <div className="card-body">
                                    <h5 className="card-title">Event Title {index + 4}</h5>
                                    <p className="card-text">Additional volunteers needed to help with the upcoming community efforts.</p>
                                    <a href="#" className="btn btn-warning">Volunteer</a>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default SearchEvents;
