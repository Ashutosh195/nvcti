import React, { useState, useEffect, lazy } from 'react'
import { Row, Col } from 'react-bootstrap'
import axios from 'axios'
import base from '../../../redux/base'
const LabInchargeTable = lazy(() => import('./labInchargeTable'))
const Feed = lazy(() => import('./feed'))

const LabinchargeMain = () => {
  const [loading, setLoading] = useState(false)
  const [pending, setpending] = useState([])
  const [approved, setapproved] = useState([])
  const [rejected, setrejected] = useState([])

  useEffect(() => {
    setLoading(true)

    const token = localStorage.getItem('labinchargeToken')
    axios
    .get(base()+'/applications', {
      headers: { Authorization: `Bearer ${token}` }
    }).then((res) => {
      
      const {data} = res;
      let Rpending = [], Rapproved = [], Rrejected = [];
      for(let i=0;i<data.length;i++) {
        if(data[i].application_verdict == "PENDING")
        Rpending.push(data[i]);
        else if(data[i].application_verdict == "APPROVED" || data[i].application_verdict == "Admin_PENDING")
        Rapproved.push(data[i]);
        else if(data[i].application_verdict == "REJECTED")
        Rrejected.push(data[i]);
      }
  
      setpending(Rpending);
      setapproved(Rapproved);
      setrejected(Rrejected);
      setLoading(false)
      
    }).catch(e => console.log(e))

    return () => {
      setLoading(false)
    }
  }, [])

  return (
    <section className="profile-main">
      <Row className="mb-3">
        <Col md={7} lg={8} sm={12}>
          <LabInchargeTable
            title="Pending Applications"
            extraClassName="pending"
            ismApplications={pending}
            loading={loading}
          />
        </Col>
        <Col md={5} lg={4} sm={12}>
        <Feed data={{pending,approved,rejected}} />
        </Col>
      </Row>
      <Row>
        <Col sm={12} lg={6} md={6}>
          <LabInchargeTable
            title="Accepted Applications"
            extraClassName="approved"
            ismApplications={approved}
            loading={loading}
          />
        </Col>
        <Col sm={12} lg={6} md={6}>
          <LabInchargeTable
            title="Rejected Applications"
            extraClassName="rejected"
            ismApplications={rejected}
            loading={loading}
          />
        </Col>
      </Row>
    </section>
  )
}

export default LabinchargeMain
