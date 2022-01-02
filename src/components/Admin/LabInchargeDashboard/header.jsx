import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";
import Logo from "../../../assets/logo/nvcti-white.png";
import { uploadSign } from '../../../redux/actions/applicationActions'
import { addEvent } from '../../../redux/actions/adminActions'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import * as icons from '@fortawesome/free-solid-svg-icons'
import { connect } from 'react-redux'
import { logoutUser } from '../../../redux/actions/authActions'
import PropTypes from 'prop-types'
import { Navbar, Modal, Form, Button, Nav, FormControl, InputGroup,FormGroup } from 'react-bootstrap'
import Loader from '../../common/loader'
import { Fade } from "react-reveal";


const LabinchargeHeader = ({ uploadSign }) => {

  const [sign, setSign] = useState()
  const [signModal, setSignModal] = useState(false)
  const [signUploadPending, setSignUploadPending] = useState(false)

  const OpenSignModal = () => setSignModal(true)
  const CloseSignModal = () => setSignModal(false)

    // const [event, setEvent] = useState({})
    // const [eventModal, setEventModal] = useState(false)
    // const OpenEventModal = () => setEventModal(true)
    // const CloseEventModal = () => setEventModal(false)
    const handleLogout = (e) => {
      e.preventDefault()
      logoutUser()
      window.location.pathname = '/'
    }

  const handleSignUpload = (e) => setSign(e.target.files[0])

  const SignCallback = () => {
    setSignUploadPending(false)
    setSign('')
    setSignModal(false)
  }

  const handleSubmitSign = (e) => {
    e.preventDefault()
    setSignUploadPending(true)
    const formData = new FormData()
    if (typeof sign !== 'undefined') {
      formData.append('signature', sign, sign.name)
    }
    uploadSign(formData, SignCallback, true)
  }

  const event_title = useRef(null);
  const event_description = useRef(null);
  const event_link = useRef(null);
  const event_otherlink = useRef(null);

  const eventCallback = (res) => {
    if (!res)
      return alert("event not added!");
    event_title.current.value = ''
    event_description.current.value = ''
    event_link.current.value = ''
    event_otherlink.current.value = ''
  }
  const handleSubmitEvent = (e) => {
    e.preventDefault()
    addEvent({
      title: event_title.current.value,
      description: event_description.current.value,
      links: event_link.current.value,
      other: event_otherlink.current.value,
    }, eventCallback);
  }

  return (
    <Navbar
      className="admin-nav"
      collapseOnSelect
      expand="lg"
      bg="primary"
      variant="dark">
      <Navbar.Brand href="#home">
        <Fade>
          <Link to="/" className="brand-name ml-2 navbar-brand">
            <img
              src={Logo}
              width="auto"
              height="50"
              className="d-inline-block align-top"
              alt="logo"
            />
          </Link>
        </Fade>
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse
        id="responsive-navbar-nav"
        className="justify-content-end admin_header">
      <Nav>
        <Fade>
          <Button
            variant="light"
            style={{ width: 'fit-content' }}
            onClick={handleLogout}>
            Logout
          </Button>
        </Fade>
      </Nav>
      <div>
      &nbsp;&nbsp;
      </div>
        <Nav>
          <Fade>
            <Button
              variant="light"
              style={{ width: 'fit-content' }}
              onClick={OpenSignModal}>
              Upload Signature
            </Button>
          </Fade>
        </Nav>
      </Navbar.Collapse>
      <Modal
        show={signModal}
        onHide={CloseSignModal}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered>
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Upload Signature
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSubmitSign}>
            <Form.Group>
              <Form.File
                id="sign"
                onChange={handleSignUpload}
                required
                accept="image/*"
              />
            </Form.Group>
            <button
              type="submit"
              className="styleme"
              style={{ padding: '6px 15px', marginTop: '10px' }}>
              {signUploadPending ? <Loader variant="light" /> : 'Submit'}
            </button>
          </form>
        </Modal.Body>
      </Modal>
      <Modal
        // show={eventModal}
        // onHide={CloseEventModal}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered>
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Add Event
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSubmitEvent}>
            <Form.Group>

              {/* Category field start*/}
              <FormGroup controlId="hostel">
                <Form.Label>Category</Form.Label>
                <InputGroup>
                  <InputGroup.Prepend>
                    <InputGroup.Text id="basic-addon1">
                      <FontAwesomeIcon icon={icons.faList}></FontAwesomeIcon>
                    </InputGroup.Text>
                  </InputGroup.Prepend>
                  <FormControl
                    as="select"
                    required="true"
                    name="category">
                    <option value="0" disabled>
                      Select Category
                    </option>
                    <option value="Flagship">Flagship</option>
                    <option value="MIC">MIC</option>
                    <option value="Others">Others</option>
                  </FormControl>
                </InputGroup>
              </FormGroup>
              {/* category field ends */}


              {/* title field */}
              <InputGroup className="mb-3">
                <InputGroup.Prepend>
                  <InputGroup.Text id="basic-addon1">
                    <FontAwesomeIcon
                      icon={icons.faHeading}></FontAwesomeIcon>
                  </InputGroup.Text>
                </InputGroup.Prepend>
                <FormControl
                  placeholder="TITLE"
                  aria-label="Username"
                  aria-describedby="basic-addon1"
                  name="title"
                  type='text'
                  required="true"
                  ref={event_title}
                />
              </InputGroup>
              {/* title field ends  */}



              {/* description field  */}
              <Form.Label>
                <strong>Description</strong>
              </Form.Label>
              <InputGroup>
                <Form.Control
                  required
                  name="objectiveOfProject"
                  as="textarea"
                  rows={5}
                  ref={event_description}
                />
              </InputGroup>
              {/*description field ends  */}



              <br />

              {/* Image link field  */}
              <InputGroup className="mb-3">
                <InputGroup.Prepend>
                  <InputGroup.Text id="basic-addon1">
                    <FontAwesomeIcon
                      icon={icons.faImage}></FontAwesomeIcon>
                  </InputGroup.Text>
                </InputGroup.Prepend>
                <FormControl
                  placeholder="Link to Image"
                  aria-label="Username"
                  aria-describedby="basic-addon1"
                  name="link"
                  type='text'
                  required="true"
                  ref={event_link}
                />
              </InputGroup>
              {/* image field ends  */}


              {/* pdf field starts */}
              <InputGroup className="mb-3">
                <InputGroup.Prepend>
                  <InputGroup.Text id="basic-addon1">
                    <FontAwesomeIcon
                      icon={icons.faFilePdf}></FontAwesomeIcon>
                  </InputGroup.Text>
                </InputGroup.Prepend>
                <FormControl
                  placeholder="Link to PDF"
                  aria-label="Username"
                  aria-describedby="basic-addon1"
                  name="otherlink"
                  type='text'
                  required="true"
                  ref={event_otherlink}
                />
              </InputGroup>
              {/* pdf field ends  */}


              {/* registration form link starts  */}
              <InputGroup className="mb-3">
                <InputGroup.Prepend>
                  <InputGroup.Text id="basic-addon1">
                    <FontAwesomeIcon
                      icon={icons.faRegistered}></FontAwesomeIcon>
                  </InputGroup.Text>
                </InputGroup.Prepend>
                <FormControl
                  placeholder="Registration form link"
                  aria-label="Username"
                  aria-describedby="basic-addon1"
                  name="otherlink"
                  type='text'
                  required="true"
                  ref={event_otherlink}
                />
              </InputGroup>
              {/* registration field ends  */}
            </Form.Group>


            <button
              type="submit"
              className="styleme"
              style={{ padding: '6px 15px', marginTop: '10px' }}>
              Submit
            </button>


          </form>
        </Modal.Body>
      </Modal>
    </Navbar>
  )
}

LabinchargeHeader.propTypes = {
  uploadSign: PropTypes.func.isRequired
}

export default connect(null, { uploadSign })(LabinchargeHeader)
