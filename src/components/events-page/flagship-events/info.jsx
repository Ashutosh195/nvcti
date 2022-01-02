import React, { useEffect, useState, lazy, Suspense } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import base from "../../../redux/base"
import { Fade } from 'react-reveal'
import {toast} from 'react-toastify'
// import Events from "./event";
import Loader from '../../common/loader'

// const url=base()+'/events';
// const token = localStorage.getItem('jwtToken')

// const printError = (err) => {
//   alert(`Error: ${err}`);
//   console.log(`Error: ${err}`);
//   toast.error(err + ' 🤥', {
//     position: 'top-right',
//     autoClose: 3000,
//     hideProgressBar: false,
//     closeOnClick: true,
//     pauseOnHover: true,
//     draggable: true,
//     progress: undefined
//   })
// }

const FlagshipInfo = () => {

//   const [eventData, seteventData] = useState([])
//   const [message, setmessage] = useState(" Hold on a little 😃, we're getting the information!")

//   const getAllevents= async () =>{
//     try {
//         const response = await fetch(url,{headers: {
//           'Authorization': 'Bearer ' + token,
//         }});
//         const res = await response.json();
//         if(res.success)
//           seteventData(res.data);
//         else {
//           printError(res); 
//           setmessage("Sorry, Unable to fetch 🤥")
//         }
//       } catch (error) {
//         alert(`runtime error: ${error}`);
//         setmessage("Sorry, Unable to fetch 🤥")
//     }
//   };

//   useEffect(()=>{
//     token ? getAllevents() : setmessage(" You're not logged in");
//   },[]);

  return (
    <Suspense
      fallback={
        <div style={{ margin: '100px 0' }} className="justify-align-center">
          <Loader
            extraStyle={{
              height: '2rem',
              width: '2rem',
              borderWidth: '0.3rem'
            }}
          />
        </div>
      }>
      <section className="events single">
        <Container>
          <Row style={{ justifyContent: 'center' }}>
            <Col md={12} sm={12} lg={12}>
              <Fade cascade>
                <div>
                  <p
                    className="text mt-4"
                    style={{ fontSize: '20px', textAlign: 'justify' }}>
                    NVCTI, as the tinkering and innovation centre of IIT (ISM)
                    Dhanbad, organises a{' '}
                    <strong>
                      series of encouraging and educational flagship events
                    </strong>{' '}
                    around the year. Dialogue Series and Innovative Leader Talk
                    Series are two of our main flagship events conducted
                    regularly throughout the academic calendar year. NVCTI has
                    also proposed a hackathon,
                    <strong> Aavishkar</strong>, for school students around
                    Dhanbad area to help mend their thinking process and lead
                    them towards innovations. NVCTI truly believes that an early
                    start goes a long way to shape an individual’s thought
                    process. Our flagship events are specifically designed to
                    cater to this belief and help students in the long run.
                  </p>
                </div>
              </Fade>
            </Col>
          </Row>
          <hr/>
          {/* <Row style={{ justifyContent: 'center' }}>
            {eventData.length !== 0 ? (
              <Events events={eventData} />
            ) : (
              <div
                style={{ marginTop: '100px' }}
                className="justify-align-center">
                <Loader
                  variant="dark"
                  message={message}
                  extraStyle={{ fontSize: '20px' }}
                />
              </div>
            )}
          </Row> */}
        </Container>
      </section>
    </Suspense>
  )
}

export default FlagshipInfo
