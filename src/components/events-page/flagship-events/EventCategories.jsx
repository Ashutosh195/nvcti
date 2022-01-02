import React from 'react'
import { Link } from 'react-router-dom'
import { Col, Container, Row } from 'react-bootstrap'
import { Fade } from 'react-reveal'

const FacilitiesComponent = (props) => {
  const data = props.categories || []
  console.log(data);
  return (
    <Fade cascade>
      <Container className="h-100 fluid m-0" style={{ maxWidth: '100%' }}>
        <Row className="content">
          {data.map((item, i) => (
            <Col
              key={item.id}
              lg={3}
              md={4}
              sm={12}
              className="d-flex justify-center">
              <Link to={'/flagship-events/' + item.title} className="card2">
                <h4>{item.description}</h4>

                <div className="go-corner">
                  <div className="go-arrow">→</div>
                </div>
              </Link>
            </Col>
          ))}
        </Row>
      </Container>
    </Fade>
  )
}

export default FacilitiesComponent
