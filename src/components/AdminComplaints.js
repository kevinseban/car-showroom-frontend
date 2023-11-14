import React from 'react';
import { useState, useEffect } from "react";
import axios from "axios";
import AdminHeader from './AdminHeader';
import Footer from './Footer';

function AdminComplaints () {

    // Code to display messages from the Contact Us DB.
    const [mess, setMess] = useState([])
    useEffect(() => {
        axios.get('http://localhost:8000/getMessage')
        .then(mess => setMess(mess.data))
        .catch(err => console.log(err))
    }, []);

    // Code to delete entries.
    const handleDelete = (id) => {
        if (window.confirm(`Are you sure you want to delete this complaint`)) {
        axios.post('http://localhost:8000/deleteMessage', null, {
            params: { messid: id }
        })
            .then(res => {
            alert("record has been deleted");
            window.location.reload();
            })
            .catch(err => console.log(err));
        }
    }

    return (
        <div className="parent">
            <AdminHeader />
            <div className='content bg-dark text-white pt-2 overflow-hidden pt-xl-5 pt-lg-5'>
                <h2 className='text-center'>Complaints</h2><br />
                <div className='w-100 d-flex justify-content-center align-items-center table-responsive'>
                    <div className="w-50">
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
                            mess.map(mess => {
                                return (
                                <tr>
                                    <td>{mess.messName}</td>
                                    <td>{mess.messEmail}</td>
                                    <td>{mess.messPhone}</td>
                                    <td>{mess.messMessage}</td>
                                    <td>{new Date(mess.createdAt).toLocaleDateString()}</td>
                                    <td><button type="button" className='btn btn-danger w-100' onClick={() => handleDelete(mess._id)}>Delete</button></td>
                                </tr>
                                )
                            })
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

export default AdminComplaints;