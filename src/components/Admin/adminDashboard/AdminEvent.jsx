import React, { useState, useEffect } from 'react';
import {Container, InputGroup, FormControl, Form, Button, Table, Modal } from "react-bootstrap";
import base from '../../../redux/base'

function AdminEvent() {
    const [eventModal, setEventModal] = useState(false)
    const OpenEventModal = () => setEventModal(true)
    const CloseEventModal = () => setEventModal(false)

    // ----------------------------
    const [deleteId, setDeleteId] = useState('');
    const [editBtn, seteditBtn] = useState(false);
    const [name, setName] = useState('');
    const [image_path, setImage_path] = useState('');
    const [pdf_link, setPdf] = useState('');
    const [form_link, setForm] = useState('');
    const [description, setdescription] = useState('');
    const [category, setCategory] = useState('');
    const [tags, setTags] = useState('');
    async function addEvent() {
        console.log(name, description, image_path, pdf_link, form_link);
        const formData = new FormData();
        formData.append('name', name);
        formData.append('image_path', image_path);
        formData.append('pdf_link', pdf_link);
        formData.append('form_link', form_link);
        formData.append('description', description);
        formData.append('category', category);
        formData.append('tags', tags);
        let result = await fetch(base() + '/addEvents', {
            method: 'POST',
            body: formData
        });
        console.log(result);
        // alert(result);
        alert('Data has been saved');
        window.location.reload(false);
    }

    const url = base() + '/list';
    const [tours, setTours] = useState([]);
    const fetchTours = async () => {
        try {
            const response = await fetch(url);
            const tours = await response.json();
            setTours(tours);
            console.log(tours);

        } catch (error) {
            console.log(`error: ${error}`);
        }
    };
    useEffect(() => {
        fetchTours();
    }, []);
    async function deleteOperation(id) {
        let result = await fetch(base() + "/delete/" + id, { method: 'DELETE' });
        // result = await result.json();
        // console.log(result);
        console.log(result);
        console.log(id);
        window.location.reload(false);
    }
    function editOperation(event) {
        console.log(event);
        setName(event.name);
        setdescription(event.description);
        setForm(event.form_link);
        setPdf(event.pdf_link);
        setTags(event.tags);
        setCategory(event.category);
        setImage_path(event.image_path)
        seteditBtn(true);
        setDeleteId(event.id);
    }
    async function editEvent() {
        console.log(deleteId);
        const formData = new FormData();
        formData.append('name', name);
        formData.append('image_path', image_path);
        formData.append('pdf_link', pdf_link);
        formData.append('form_link', form_link);
        formData.append('description', description);
        formData.append('category', category);
        formData.append('tags', tags);
        // let result = await fetch(base() + '/updateProduct/'+deleteId+"?_method=PUT", {
        //     method: 'PUT',
        //     body: formData
        // });
        // let result = await fetch('http://127.0.0.1:8000/api/updateProduct/'+deleteId+"?_method=PUT", {
        //     method: 'PUT',
        //     body: formData
        // });
        // console.log(result);
        // alert('Data has been Updated');
        // window.location.reload(false);
        await deleteOperation(deleteId);
        await addEvent();
    }
    return (
        <Container className='my-3'>
            <Button className="my-3"
                variant="outline-success"
                style={{ width: 'fit-content' }}
                onClick={OpenEventModal}>
                Add Event
            </Button>
            {/* events table for admin */}
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Name</th>
                        <th>Category</th>
                        <th>Tags</th>
                        <th>Options</th>
                    </tr>
                </thead>
                <tbody>
                    {tours.map((event) => {
                        return (
                            <tr>
                                <td>{event.id}</td>
                                <td>{event.name}</td>
                                <td>{event.category}</td>
                                <td>{event.tags}</td>
                                <td><Button className="mx-3" variant="outline-danger" onClick={() => { deleteOperation(event.id) }} size="sm">Delete</Button>
                                    <Button variant="outline-primary" onClick={() => { editOperation(event);OpenEventModal();}} size="sm">Edit</Button></td>
                            </tr>
                        )
                    }
                    )}
                </tbody>
            </Table>
            <Modal
                show={eventModal}
                onHide={CloseEventModal}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered>
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Add Event
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <InputGroup className="mb-3">
                        <InputGroup.Text id="basic-addon1">Name</InputGroup.Text>
                        <FormControl
                            placeholder="Name"
                            aria-label="Username"
                            aria-describedby="basic-addon1"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            />
                    </InputGroup>

                    <InputGroup className="mb-3">
                        <InputGroup.Text>Description</InputGroup.Text>
                        <FormControl as="textarea" aria-label="With textarea" value={description} onChange={(e) => setdescription(e.target.value)}
                        />
                    </InputGroup>
                    <InputGroup className="mb-3">
                        <InputGroup.Text id="basic-addon1">Form link</InputGroup.Text>
                        <FormControl
                            placeholder="Paste google form link here"
                            aria-label="Username"
                            aria-describedby="basic-addon1"
                            value={form_link}
                            onChange={(e) => setForm(e.target.value)}
                        />
                    </InputGroup>

                    <InputGroup className="mb-3">
                        <InputGroup.Text id="basic-addon1">Pdf link</InputGroup.Text>
                        <FormControl
                            placeholder="Paste PDF link here"
                            aria-label="Username"
                            aria-describedby="basic-addon1"
                            value={pdf_link}
                            onChange={(e) => setPdf(e.target.value)}

                            />
                    </InputGroup>

                    <InputGroup className="mb-3">
                        <InputGroup.Text id="basic-addon1">Category</InputGroup.Text>
                        <select aria-label="Default select example" value={category} onChange={(e) => setCategory(e.target.value)}>
                            <option>Open this select menu</option>
                            <option value="Flagship">Flagship</option>
                            <option value="MIC">MIC</option>
                            <option value="Others">Others</option>
                        </select>
                    </InputGroup>

                    <InputGroup className="mb-3">
                        <InputGroup.Text id="basic-addon1">Tags</InputGroup.Text>
                        <select aria-label="Default select example" value={tags} onChange={(e) => setTags(e.target.value)}>
                            <option>Open this select menu</option>
                            <option value="Ongoing">Ongoing</option>
                            <option value="Upcoming">Upcoming</option>
                            <option value="Past">Past</option>
                        </select>
                    </InputGroup>

                    <InputGroup className="mb-3">
                        <InputGroup.Text id="basic-addon1">Image link</InputGroup.Text>
                        <FormControl
                            placeholder="Paste PDF link here"
                            aria-label="Username"
                            aria-describedby="basic-addon1"
                            value={image_path}
                            onChange={(e) => setImage_path(e.target.value)}
                            />
                    </InputGroup>

                    {/* <Form.Group controlId="formFile" className="mb-3">
                        <Form.Label>Enter Event Image</Form.Label>
                        <Form.Control type="file" onChange={(e) => setImage(e.target.files[0])} />
                    </Form.Group> */}

                    {editBtn ?
                            <Button onClick={() => {
                                editEvent();
                                seteditBtn(!editBtn);
                                    CloseEventModal();
                                }} className="mb-3" variant="outline-primary">SAVE CHANGES
                            </Button> :
                            <Button onClick={()=>{addEvent();CloseEventModal();}} className="mb-3" variant="outline-success">ADD</Button>}
                </Modal.Body>
            </Modal>
        </Container>

    );
}
export default AdminEvent