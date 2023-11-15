import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useEffect, useState } from 'react';
import axios from "axios";
import Header from './Header';
import Footer from './Footer';
import { useNavigate } from 'react-router-dom';

function Ebooking() {

    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            // Redirect to admin login if adminToken is not present
            navigate('/login');
        }
    }, [navigate]);

    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [pincode, setPincode] = useState('');
    const [carname, setCarname] = useState('');
    const [carcolor, setCarcolor] = useState('');

    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState('');

    const resetForm = () => {
        setName('');
        setCarcolor('');
        setCarname('');
        setPincode('');
        setAddress('');
        setEmail('');
        setPhone('');
        setUsername('');
    }

    const [validated, setValidated] = useState(false);

    const handleSubmit = (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }

        setValidated(true);
    };

    const validatePhoneNumber = (number) => {
        return /^\d{10}$/.test(number);
    };

    const validateEmail = (email) => {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    };

    const submit = async (e) => {
        e.preventDefault();

        if (!name || !email || !username || !phone || !address || !pincode || !carname || !carcolor) {
            setErrorMessage("All fields are required!");
            return;
        }

        if (!validatePhoneNumber(phone)) {
            setErrorMessage("Enter a valid phone number.");
            return;
        }

        if (!validateEmail(email)) {
            setErrorMessage("Enter a valid email address.");
            return;
        }

        try {
            const response = await axios.post("http://localhost:8000/booking/newBooking", {
                name,
                email,
                username,
                phone,
                address,
                pincode,
                carname,
                carcolor,
            });

            console.log("Booked successfully");
            setSuccessMessage("Booked Successfully");
            navigate('/profile');

        } catch (error) {
            console.error("Error booking: ", error);
            if (error.response && error.response.status === 400) {
                setErrorMessage("Something went wrong");
            } else {
                setErrorMessage("An error occurred while booking.");
            }
        }
    }

    return (
        <div className='bg-dark '>
            <Header />
            <br />
            <br />
            <center className='px-2'>
                <h1 className="text-light display-2 mb-2">E-Booking</h1>
            </center>
            <div className='form-div px-2 container'>
                <Form className='text-light' noValidate validated={validated} onSubmit={handleSubmit} action='POST'>
                    <br />
                    <hr />
                    <br />
                    <h3 className='text-light bolder'>Personal Details</h3>
                    <Row className="mb-3">
                        <Form.Group as={Col} md="4" controlId="validationCustom01">
                            <Form.Label>Full name</Form.Label>
                            <Form.Control
                                required
                                type="text"
                                placeholder="Full name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group as={Col} md="4" controlId="validationCustom02">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                required
                                type="text"
                                placeholder="Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group as={Col} md="4" controlId="validationCustomUsername">
                            <Form.Label>Username</Form.Label>
                            <InputGroup hasValidation>
                                <Form.Control
                                    type="text"
                                    placeholder="Username"
                                    aria-describedby="inputGroupPrepend"
                                    required
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                />
                                <Form.Control.Feedback type="invalid">
                                    Please choose a username.
                                </Form.Control.Feedback>
                            </InputGroup>
                        </Form.Group>
                    </Row>
                    <Row className="mb-3">
                        <Form.Group as={Col} md="6" controlId="validationCustom01">
                            <Form.Label>Mobile number</Form.Label>
                            <Form.Control
                                required
                                type="text"
                                placeholder="Mobile number"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                            />
                            <Form.Control.Feedback type="invalid">
                                Please provide a valid Phone number.
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Row>
                    <Row className="mb-3">
                        <Form.Group as={Col} md="6" controlId="validationCustom03">
                            <Form.Label>Address</Form.Label>
                            <Form.Control type="text" placeholder="Address" required value={address} onChange={(e) => setAddress(e.target.value)} />
                            <Form.Control.Feedback type="invalid">
                                Please provide a valid address.
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group as={Col} md="3" controlId="validationCustom05">
                            <Form.Label>Pincode</Form.Label>
                            <Form.Control type="text" placeholder="Pincode" required value={pincode} onChange={(e) => setPincode(e.target.value)} />
                            <Form.Control.Feedback type="invalid">
                                Please provide a valid Pincode.
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Row>
                    <br />
                    <hr />
                    <br />
                    <h3>Car Details</h3>
                    <Row className='mb-3'>
                        <Form.Group as={Col} md="6" controlId="validationCustom08">
                            <Form.Label>Car Name</Form.Label>
                            <Form.Control type="text" placeholder="Car Name" required value={carname} onChange={(e) => setCarname(e.target.value)} />
                            <Form.Control.Feedback type="invalid">
                                Please provide a valid Car.
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group as={Col} md="6" controlId="validationCustom08">
                            <Form.Label>Color</Form.Label>
                            <Form.Control type="text" placeholder="Color" required value={carcolor} onChange={(e) => setCarcolor(e.target.value)} />
                            <Form.Control.Feedback type="invalid">
                                Please provide a valid Color.
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Row>
                    <br />
                    <br />
                    <span>
                        <center>
                            {errorMessage && <div className="alert alert-danger w-50" >{errorMessage}</div>}
                            {successMessage && <div className="alert alert-success w-50" >{successMessage}</div>}
                            <Button type="submit" className='mx-2' onClick={submit}>Submit</Button>
                            <Button type="reset" className='mx-2' value="Reset Form" onClick={resetForm}>Reset</Button>
                        </center>
                    </span>
                    <br />
                    <hr />
                    <br />
                </Form>
            </div>
            <Footer />
        </div>
    );
}

export default Ebooking;
