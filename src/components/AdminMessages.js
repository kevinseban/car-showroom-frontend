import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AdminHeader from './AdminHeader';
import Footer from './Footer';
import { useNavigate } from 'react-router-dom';

function AdminMessages() {
    const [mess, setMess] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [searchDate, setSearchDate] = useState('');
    const navigate = useNavigate();
  
    useEffect(() => {
      const adminToken = localStorage.getItem('adminToken');
      if (!adminToken) {
        // Redirect to admin login if adminToken is not present
        navigate('/admin/login');
      }
    }, [navigate]);

    useEffect(() => {
        // Fetch messages on component mount
        axios.get('http://localhost:8000/getMessage')
            .then((response) => setMess(response.data))
            .catch((error) => console.log(error));
    }, []);

    useEffect(() => {
        // Use a separate function to handle search
        const handleSearch = async () => {
            try {
                let response;

                if (searchTerm === "" && searchDate === "") {
                    response = await axios.get('http://localhost:8000/getMessage');
                } else if (searchDate !== "") {
                    response = await axios.get(`http://localhost:8000/searchMessagesByDate/${searchDate}`);
                } else {
                    response = await axios.get(`http://localhost:8000/searchMessages/${searchTerm}`);
                }

                setMess(response.data);
            } catch (error) {
                console.error('Error searching for messages:', error);
            }
        };

        // Call handleSearch when either searchTerm or searchDate changes
        handleSearch();
    }, [searchTerm, searchDate]);

    const handleDelete = (id) => {
        if (window.confirm(`Are you sure you want to delete this complaint`)) {
            axios.post('http://localhost:8000/deleteMessage', null, {
                params: { messid: id }
            })
                .then((res) => {
                    alert("Record has been deleted");
                    window.location.reload();
                })
                .catch((err) => console.log(err));
        }
    };

    return (
        <div className="parent">
            <AdminHeader />
            <div className="content w-100 p-5 bg-dark text-white">
                <div className='row justify-content-center align-items-center'>
                    <h2 className='px-5 py-4 col-8'>Message List</h2>
                    <input
                        type="text"
                        style={{ width: "fit-content", height: "fit-content", borderRadius: "5px" }}
                        className='px-3 col-4 my-2'
                        placeholder="Search by name, email, etc."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <input
                        type="date"
                        className='px-2 mx-2 col-4'
                        style={{ width: "fit-content", height: "fit-content", borderRadius: "5px" }}
                        value={searchDate}
                        onChange={(e) => setSearchDate(e.target.value)}
                    />
                </div>
                <div className='w-100 d-flex justify-content-center align-items-center table-responsive'>
                    <div className="w-75 p-4">
                        <table className='table table-striped table-hover'>
                            <thead>
                                <tr>
                                    <th className='bg-secondary text-white'>
                                        Name
                                    </th>
                                    <th className='bg-secondary text-white'>
                                        Email
                                    </th>
                                    <th className='bg-secondary text-white'>
                                        Phone No.
                                    </th>
                                    <th className='bg-secondary text-white'>
                                        Message
                                    </th>
                                    <th className='bg-secondary text-white text-center'>
                                        Date
                                    </th>
                                    <th className='bg-secondary text-white text-center'>
                                        Action
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    mess.map((message) => (
                                        <tr key={message._id}>
                                            <td>{message.messName}</td>
                                            <td>{message.messEmail}</td>
                                            <td>{message.messPhone}</td>
                                            <td>{message.messMessage}</td>
                                            <td>{new Date(message.createdAt).toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' })}</td>
                                            <td><button type="button" className='btn btn-danger w-100' onClick={() => handleDelete(message._id)}>Delete</button></td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default AdminMessages;
