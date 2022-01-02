import React, { useState, useEffect } from 'react'
import { Row, Col, Modal, Form, InputGroup, FormControl, FormGroup } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faObjectUngroup, faLightbulb, faHeading, faEdit, faPaste, faInfoCircle } from '@fortawesome/free-solid-svg-icons'
import Loader from '../common/loader'
import store from '../../store'


const IdeaSubmissionModal = ({ show, submitApplication, onHide, editDetails, details }) => {
  const currUser = store.getState().user

  const [data, setData] = useState({
    idea_details: 'SSMM',
    application_category: 'INTERNAL UG/PG STUDENTS',
    nvtil_unit: 'MECHANICAL AND RAPID PROTOTYPING UNIT',
    title_of_project: '',
    name: '',
    institute: '',
    objective_of_project: '',
    nameOfMentor: '',
    number_of_members: '',
    source_of_funding: '',
    file_link: '',
    email: currUser.userId
  })
  useEffect(() => {
    let mounted = true
    if (editDetails && mounted) {
      const {
        idea_details,
        application_category,
        nvtil_unit,
        title_of_project,
        name,
        institute,
        objective_of_project,
        number_of_members,
        source_of_funding,
        file_link
      } = details
      setData({
        ...data,
        idea_details,
        application_category,
        nvtil_unit,
        title_of_project,
        name,
        institute,
        objective_of_project,
        number_of_members,
        source_of_funding,
        file_link
      })
    }
    return () => (mounted = false)
    // eslint-disable-next-line
  }, [details])
  const [pitchFile, setPitchFile] = useState()
  const [loading, setLoading] = useState(false)

  const callback = () => {
    setTimeout(() => {
      setLoading(false)
      setTimeout(() => onHide(), 1000)
    }, 2000)
  }

  const handleChange = (e) => {
    if (e.target.name === 'objective_of_project') {
      var len = e.target.value.split(/[\s]+/)
      if (len.length > 250) {
        alert(
          'You cannot put more than 250 words.'
        )
      } else {
        setData({ ...data, [e.target.name]: e.target.value })
      }
    } else {
      setData({ ...data, [e.target.name]: e.target.value })
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setLoading(true)
    const formData = data

    if (editDetails)
      submitApplication(formData, callback, details);
    else
      submitApplication(formData, callback);
  }

  const checkDisabled = () => {
    const {
      idea_details,
      application_category,
      nvtil_unit,
      title_of_project,
      name,
      institute,
      objective_of_project,
      number_of_members,
      source_of_funding,
      file_link

    } = data
    if (
      idea_details &&
      application_category &&
      nvtil_unit &&
      title_of_project &&
      name &&
      institute &&
      objective_of_project &&
      number_of_members &&
      source_of_funding &&
      file_link
    ) {
      return true
    } else {
      return false
    }
  }

  const handleFileUpload = (e) => setPitchFile(e.target.files[0])

  return (
    <Modal
      show={show}
      onHide={onHide}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          {editDetails ? 'Update Details ' : 'Application Form '}
          {!editDetails ? <FontAwesomeIcon icon={faLightbulb} /> : null}
        </Modal.Title>
      </Modal.Header>


      {console.log(currUser)}


      <Modal.Body>
        {editDetails ? (
          <p className="py-2" style={{ fontStyle: 'italic' }}>
            <strong>Remarks: {data.remarks || details.remarks}</strong>
          </p>
        ) : (
          <p className="py-2">
            Please submit your application by filling out the form below to the
            NVTI Lab.
          </p>
        )}
        <form onSubmit={handleSubmit}>
          <FormGroup controlId="category">
            <Form.Label>
              <strong>Application Category*</strong>
            </Form.Label>
            <InputGroup>
              <InputGroup.Prepend>
                <InputGroup.Text id="basic-addon1">
                  <FontAwesomeIcon icon={faObjectUngroup}></FontAwesomeIcon>
                </InputGroup.Text>
              </InputGroup.Prepend>
              <FormControl
                as="select"
                required
                value={data.application_category}
                name="application_category"
                onChange={handleChange}>
                {[
                  'COMMERCIAL',
                  'R&D INSTITUTE',
                  'RESEARCH STUDENT',
                  'INTERNAL UG/PG STUDENTS'
                ].map((item) => (
                  <option value={item} key={item}>
                    {item}
                  </option>
                ))}
              </FormControl>
            </InputGroup>
          </FormGroup>
          <FormGroup controlId="unit">
            <Form.Label>
              <strong>NVTIL UNIT</strong>
            </Form.Label>
            <InputGroup>
              <InputGroup.Prepend>
                <InputGroup.Text id="basic-addon1">
                  <FontAwesomeIcon icon={faObjectUngroup}></FontAwesomeIcon>
                </InputGroup.Text>
              </InputGroup.Prepend>
              <FormControl
                as="select"
                required
                value={data.nvtil_unit}
                name="nvtil_unit"
                onChange={handleChange}>
                {[
                  'MECHANICAL AND RAPID PROTOTYPING UNIT',
                  'ELECTRONICS CIRCUITS AND IOT UNIT',
                  'GAMING AND ANIMATION DESIGN UNIT',
                  'POUCH BATTERY CELL ASSEMBLY UNIT',
                  'ROBOTICS AND AUTOMATION UNIT'
                ].map((item) => (
                  <option value={item} key={item}>
                    {item}
                  </option>
                ))}
              </FormControl>
            </InputGroup>
          </FormGroup>
          <FormGroup controlId="title" className="mt-4">
            <InputGroup>
              <InputGroup.Prepend>
                <InputGroup.Text id="basic-addon1">
                  <FontAwesomeIcon icon={faHeading}></FontAwesomeIcon>
                </InputGroup.Text>
              </InputGroup.Prepend>
              <Form.Control
                required
                value={data.title_of_project}
                name="title_of_project"
                onChange={handleChange}
                placeholder="Title of the Project/Job"
              />
            </InputGroup>
          </FormGroup>
          <FormGroup controlId="name" className="mt-4">
            <InputGroup>
              <InputGroup.Prepend>
                <InputGroup.Text id="basic-addon1">
                  <FontAwesomeIcon icon={faHeading}></FontAwesomeIcon>
                </InputGroup.Text>
              </InputGroup.Prepend>
              <Form.Control
                required
                value={data.name}
                name="name"
                onChange={handleChange}
                placeholder="Applicant's Name"
              />
            </InputGroup>
          </FormGroup>
          <FormGroup controlId="name" className="mt-4">
            <InputGroup>
              <InputGroup.Prepend>
                <InputGroup.Text id="basic-addon1">
                  <FontAwesomeIcon icon={faHeading}></FontAwesomeIcon>
                </InputGroup.Text>
              </InputGroup.Prepend>
              <Form.Control
                required
                value={data.institute}
                name="institute"
                onChange={handleChange}
                placeholder="Institute's Name"
              />
            </InputGroup>
          </FormGroup>
          <FormGroup controlId="objective">
            <Form.Label>
              <strong>Objective of the Project/Job</strong>
            </Form.Label>
            <InputGroup>
              <Form.Control
                required
                value={data.objective_of_project}
                name="objective_of_project"
                onChange={handleChange}
                as="textarea"
                rows={5}
                placeholder="Max. 250 words"
              />
            </InputGroup>
          </FormGroup>
          <FormGroup controlId="mentor" className="mt-4">
            <InputGroup>
              <InputGroup.Prepend>
                <InputGroup.Text id="basic-addon1">
                  <FontAwesomeIcon icon={faEdit}></FontAwesomeIcon>
                </InputGroup.Text>
              </InputGroup.Prepend>
              <Form.Control
                value={
                  data.nameOfMentor !== 'null' && data.nameOfMentor
                    ? data.nameOfMentor
                    : undefined
                }
                name="nameOfMentor"
                onChange={handleChange}
                placeholder="Name of Mentor (if any)"
              />
            </InputGroup>
          </FormGroup>
          <FormGroup controlId="members" className="mt-4">
            <InputGroup>
              <InputGroup.Prepend>
                <InputGroup.Text id="basic-addon1">
                  <FontAwesomeIcon icon={faEdit}></FontAwesomeIcon>
                </InputGroup.Text>
              </InputGroup.Prepend>
              <Form.Control
                required
                type="number"
                value={data.number_of_members}
                name="number_of_members"
                onChange={handleChange}
                placeholder="Number of Members"
              />
            </InputGroup>
          </FormGroup>
          <FormGroup controlId="source" className="mt-4">
            <InputGroup>
              <InputGroup.Prepend>
                <InputGroup.Text id="basic-addon1">
                  <FontAwesomeIcon icon={faEdit}></FontAwesomeIcon>
                </InputGroup.Text>
              </InputGroup.Prepend>
              <Form.Control
                value={data.source_of_funding}
                name="source_of_funding"
                onChange={handleChange}
                placeholder="Source of Funding"
              />
            </InputGroup>
          </FormGroup>
          <FormGroup controlId="source" className="mt-4">
            <InputGroup>
              <InputGroup.Prepend>
                <InputGroup.Text id="basic-addon1">
                  <FontAwesomeIcon icon={faPaste}></FontAwesomeIcon>
                </InputGroup.Text>
              </InputGroup.Prepend>
              <Form.Control
                value={data.file_link}
                name="file_link"
                onChange={handleChange}
                placeholder="paste google drive link after uploading your file there"
              />
            </InputGroup>
          </FormGroup>
          {/* <Form.Group>
            <Form.File
              id="pitchFile"
              label="Pitch/Idea of the Project/Job"
              onChange={handleFileUpload}
            />
          </Form.Group> */}
          <p style={{ color: 'red' }}>
            *Category I to III are on payment basis
          </p>
          <Form.Group as={Row}>
            <Col>
              <button
                disabled={!checkDisabled()}
                className="mt-2 submitApplication"
                type="submit"
                style={{ fontSize: '13px' }}>
                {loading ? (
                  <Loader variant="light" />
                ) : !editDetails ? (
                  'Submit'
                ) : (
                  'Update'
                )}
              </button>
            </Col>
          </Form.Group>
        </form>
      </Modal.Body>
      {!editDetails ? (
        <Modal.Footer>
          <Row>
            <Col md={12} lg={12} sm={12} xs={12}>
              <div className="form-tip">
                <FontAwesomeIcon icon={faInfoCircle} className="pr-1" />
                All fields are required
              </div>
            </Col>
          </Row>
        </Modal.Footer>
      ) : null}
    </Modal>
  )
}

export default IdeaSubmissionModal
