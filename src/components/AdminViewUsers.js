import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AdminHeader from './AdminHeader';
import Footer from './Footer';

function AdminViewUsers() {
  const [users, setUsers] = useState([]);
  const [editingUserId, setEditingUserId] = useState(null);
  const [editFormData, setEditFormData] = useState({
    username: '',
    name: '',
    email: '',
    phoneNumber: '',
  });

  useEffect(() => {
    axios.get('http://localhost:8000/user/getAll')
      .then(response => setUsers(response.data))
      .catch(error => console.error('Error fetching users:', error));
  }, []);

  const deleteUser = (userId) => {
    if (window.confirm("Are you sure you want to delete this User?")) {
      axios.delete(`http://localhost:8000/user/delete/${userId}`)
        .then(response => {
          setUsers(users.filter(user => user._id !== userId));
          console.log(response.data.message);
        })
        .catch(error => console.error('Error deleting user:', error));
    }
  };

  const startEditingUser = (userId) => {
    const userToEdit = users.find(user => user._id === userId);
    setEditingUserId(userId);
    setEditFormData({
      username: userToEdit.username,
      name: userToEdit.name,
      email: userToEdit.email,
      phoneNumber: userToEdit.phoneNumber,
    });
  };

  const cancelEditing = () => {
    setEditingUserId(null);
    setEditFormData({
      username: '',
      name: '',
      email: '',
      phoneNumber: '',
    });
  };

  const updateFormData = (e) => {
    setEditFormData({
      ...editFormData,
      [e.target.name]: e.target.value,
    });
  };

  const submitEditForm = (userId) => {
    axios.put(`http://localhost:8000/user/update/${userId}`, editFormData)
      .then(response => {
        setUsers(users.map(user => (user._id === userId ? response.data.user : user)));
        cancelEditing();
        console.log(response.data.message);
      })
      .catch(error => console.error('Error updating user:', error));
  };

  return (
    <div className="parent">
      <AdminHeader />
      <div className="content w-100 p-5 bg-dark text-white">
        <h1>User Management</h1><br /><br />
        <table className="table table-dark table-striped">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Username</th>
              <th scope="col">Name</th>
              <th scope="col">Email</th>
              <th scope="col">Phone Number</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={user._id}>
                <th scope="row">{index + 1}</th>
                <td>
                  {editingUserId === user._id ? (
                    <input
                      type="text"
                      name="username"
                      value={editFormData.username}
                      onChange={updateFormData}
                    />
                  ) : (
                    user.username
                  )}
                </td>
                <td>
                  {editingUserId === user._id ? (
                    <input
                      type="text"
                      name="name"
                      value={editFormData.name}
                      onChange={updateFormData}
                    />
                  ) : (
                    user.name
                  )}
                </td>
                <td>
                  {editingUserId === user._id ? (
                    <input
                      type="text"
                      name="email"
                      value={editFormData.email}
                      onChange={updateFormData}
                    />
                  ) : (
                    user.email
                  )}
                </td>
                <td>
                  {editingUserId === user._id ? (
                    <input
                      type="text"
                      name="phoneNumber"
                      value={editFormData.phoneNumber}
                      onChange={updateFormData}
                    />
                  ) : (
                    user.phoneNumber
                  )}
                </td>
                <td>
                  {editingUserId === user._id ? (
                    <div>
                      <button
                        className="btn btn-success mr-2"
                        onClick={() => submitEditForm(user._id)}
                      >
                        Save
                      </button>
                      <button
                        className="btn btn-secondary"
                        onClick={cancelEditing}
                      >
                        Cancel
                      </button>
                    </div>
                  ) : (
                    <button
                      className="btn btn-warning mr-2"
                      onClick={() => startEditingUser(user._id)}
                    >
                      Edit
                    </button>
                  )}
                  <button
                    className="btn btn-danger"
                    onClick={() => deleteUser(user._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Footer />
    </div>
  );
}

export default AdminViewUsers;
