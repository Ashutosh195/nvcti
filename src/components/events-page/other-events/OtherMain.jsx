import React, { useState, useEffect, Fragment, Suspense } from "react";
import Events from "../event";
// import Loading from "../components/common/Loading";
import Event from "../event";
import { Col } from "react-bootstrap";
import Loader from "../../common/loader";

const url = 'http://127.0.0.1:8000/api/OthersList';

function FlagshipMain() {

    const [tours, setTours] = useState([]);
    const [loading,setLoading]= useState(true);
    const fetchTours = async () => {
        try {
            const response = await fetch(url);
            const tours = await response.json();
            setTours(tours);
            setLoading(false);
            console.log(tours);

        } catch (error) {
            console.log(`error: ${error}`);
        }

    };
    useEffect(() => {
        fetchTours();
    }, []);

    return (

        <Fragment>
            <Col className="justify-align-center">
                <h1 className="display-3">Other Events</h1>
            </Col>
            {loading ? ( <div
                    style={{ marginTop: '40px', marginBottom: '20px' }}
                    className="justify-align-center my-3">
                    <Loader
                      variant="dark"
                      message="Getting Event Details...."
                      extraStyle={{ fontSize: '20px' }}
                    />
                  </div> ):
                            ((tours.length===0) ?<div
                            style={{ marginTop: '40px', marginBottom: '20px' }}
                            className="justify-align-center my-3">
                            <h4 >No Enents In this Category </h4>
                          </div>
                             :
                            <Event events={tours} />)}

        </Fragment >

    );
}

export default FlagshipMain;