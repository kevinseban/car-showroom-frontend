import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useState } from 'react';
import axios from "axios";
import Header from './Header';
import Footer from './Footer';

function Ebooking()
{
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [Username, setUsername] = useState('');
    const [Userstate, setUserstate] = useState('');
    const [Usercity, setUsercity] = useState('');
    const [Userpin, setUserpin] = useState('');
    const [Dealername, setDealername] = useState('');
    const [Dealerstate, setDealerstate] = useState('');
    const [Dealercity, setDealercity] = useState('');
    const [Carname, setCarname] = useState('');
    const [Carcolor, setCarcolor] = useState('');
    const [phone, setPhone] = useState('');

    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState('');

    const resetForm = () => {
        setName('')
        setCarcolor('')
        setCarname('')
        setDealercity('')
        setDealername('')
        setDealerstate('')
        setEmail('')
        setPhone('')
        setUsercity('')
        setUsername('')
        setUserpin('')
        setUserstate('')
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
        // Regular expression for a simple email validation
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    };

    async function submit(e){
        e.preventDefault();

        if (!name || !email || !Username || !Userstate || !Usercity || !Userpin || !Dealername || !Dealercity || !Dealerstate || !Carname || !Carcolor || !phone){
            setErrorMessage("All fields are required!");
            return;
        }

        if (!validatePhoneNumber(phone)) {
            setErrorMessage("Enter valid phone number.");
            return;
        }

        if (!validateEmail(email)) {
            setErrorMessage("Enter valid email address.");
            return;
        }

        try {
            const response = await axios.post("http://localhost:8000/booking/newBooking", {
                name,
                email,
                Username,
                Usercity,
                Userstate,
                Userpin,
                Dealername,
                Dealercity,
                Dealerstate,
                Carname,
                Carcolor,
                phone,
            });

            console.log("Booked successfully");
            setSuccessMessage("Booked Successfully");
        } catch (error) {
            console.error("Error booking: ", error);
            if (error.response && error.response.status === 400) {
                setErrorMessage("Something went wrong");
            } else {
                setErrorMessage("An error occurred while booking.");
            }
        }
    }

    return(
        <div className='bg-dark '>
            <Header/>
            <div className='ps-5'>
                <center><h1 className="text-light display-2 mb-2">E-Booking</h1></center>
                {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
                {successMessage && <div className="alert alert-success">{successMessage}</div>}

            </div>
            
                <div className='form-div ps-5'> 
                    <Form className='text-light' noValidate validated={validated} onSubmit={handleSubmit} action='POST'>
                        <h3 className='text-light bolder'>Personal Details</h3>
                        <Row className="mb-3">
                        <Form.Group as={Col} md="4" controlId="validationCustom01">
                            <Form.Label>Full name</Form.Label>
                            <Form.Control
                            required
                            type="text"
                            placeholder="First name"
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
                                <InputGroup.Text id="inputGroupPrepend">@</InputGroup.Text>
                                <Form.Control
                                type="text"
                                placeholder="Username"
                                aria-describedby="inputGroupPrepend"
                                required
                                value={Username}
                                onChange={(e) => setUsername(e.target.value)}
                                />
                                <Form.Control.Feedback type="invalid">
                                Please choose a username.
                                </Form.Control.Feedback>
                            </InputGroup>
                            
                        </Form.Group>
                        </Row>
                        <Row className="mb-3">
                            <Form.Group as={Col} md="6" controlId="validationCustom03">
                            <Form.Label>City</Form.Label>
                            <Form.Control type="text" placeholder="City" required value={Usercity} onChange={(e) => setUsercity(e.target.value)}/>
                            <Form.Control.Feedback type="invalid">
                                Please provide a valid city.
                            </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group as={Col} md="3" controlId="validationCustom04">
                            <Form.Label>State</Form.Label>
                            <Form.Control type="text" placeholder="State" required value={Userstate} onChange={(e) => setUserstate(e.target.value)}/>
                            <Form.Control.Feedback type="invalid">
                                Please provide a valid state.
                            </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group as={Col} md="3" controlId="validationCustom05">
                            <Form.Label>Pincode</Form.Label>
                            <Form.Control type="text" placeholder="Pincode" required value={Userpin} onChange={(e) => setUserpin(e.target.value)}/>
                            <Form.Control.Feedback type="invalid">
                                Please provide a valid Pincode.
                            </Form.Control.Feedback>
                            </Form.Group>
                        </Row >
                        <Row>
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
                        <br/>
                        <hr/>
                        <br/>
                        <h3>Dealer Details</h3>
                        <Row className='mb-3'>
                            <Form.Group as={Col} md="4" controlId="validationCustom08">
                            <Form.Label>Dealer Name</Form.Label>
                            <Form.Control type="text" placeholder="Dealer name" required value={Dealername} onChange={(e) => setDealername(e.target.value)}/>
                            <Form.Control.Feedback type="invalid">
                                Please provide a valid Dealer.
                            </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group as={Col} md="4" controlId="validationCustom06">
                            <Form.Label>City</Form.Label>
                            <Form.Control type="text" placeholder="City" required value={Dealercity} onChange={(e) => setDealercity(e.target.value)}/>
                            <Form.Control.Feedback type="invalid">
                                Please provide a valid city.
                            </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group as={Col} md="4" controlId="validationCustom07">
                            <Form.Label>State</Form.Label>
                            <Form.Control type="text" placeholder="State" required value={Dealerstate} onChange={(e) => setDealerstate(e.target.value)}/>
                            <Form.Control.Feedback type="invalid">
                                Please provide a valid state.
                            </Form.Control.Feedback>
                            </Form.Group>
                
                        </Row>
                        <br/>
                        <hr/>
                        <br/>
                        <h3>Car Details</h3>
                        <Row className='mb-3'>
                            <Form.Group as={Col} md="6" controlId="validationCustom08">
                            <Form.Label>Car Name</Form.Label>
                            <Form.Control type="text" placeholder="Car Name" required  value={Carname} onChange={(e) => setCarname(e.target.value)}/>
                            <Form.Control.Feedback type="invalid">
                                Please provide a valid Car.
                            </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group as={Col}  md="6" controlId="validationCustom08">
                            <Form.Label>Color</Form.Label>
                            <Form.Control type="text" placeholder="Color" required value={Carcolor} onChange={(e) => setCarcolor(e.target.value)}/>
                            <Form.Control.Feedback type="invalid">
                                Please provide a valid Color.
                            </Form.Control.Feedback>
                            </Form.Group>
                        </Row>
                        <br/>
                        <hr/>
                        <br/>

                        <Form.Group className="mb-3">
                            <Form.Check
                            required
                            label="Agree to terms and conditions"
                            feedback="You must agree before submitting."
                            feedbackType="invalid"
                            />
                            <div>
                                <span><p>Disclaimer:  I agree that by clicking the ‘Submit’ button below, I am explicitly agreeing to following:</p></span>
                                <span><p>1 . Soliciting a call and message via WhatsApp or any other medium from CAR360 Pvt Ltd or its affiliates, authorized dealerships, partners, subsidiary companies etc. on Mobile number stated by me.</p></span>
                                <span><p>2 . Cancellation charges (Of Rs 500) will be applicable for booking done from the date of Launch (after official price reveal) of the vehicle.</p></span>
                                <span><p>3 . In case of cancellation within period of 6 months from date of booking, amount will be refunded online into source account only. For any cancellation beyond this period, refund would be settled offline between customer and dealer selected at time of booking.</p></span>
                                <span><p>*Prices/Schemes prevailing at the time of invoice/bill shall be applicable."</p></span>
                            </div>
                        </Form.Group>
                        <br/>
                        
                        <br/>
                        <span>
                        <center><Button type="submit" onClick={submit}>Submit</Button>{'        '}
                        {'   '}<Button type="reset" value="Reset Form" onClick={resetForm}>Reset</Button></center>
                        </span>
                        <br/>
                        <hr/>
                        <br/>
                    </Form>
                </div>
            <Footer/>
        </div>
    );


}

export default Ebooking;

