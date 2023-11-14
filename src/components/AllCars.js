import React from 'react';
import { useState, useEffect } from "react";
// import { ref, deleteObject, } from "firebase/storage";
// import { storage } from "./firebase";
import Footer from "./Footer";
import axios from "axios";
// import { useNavigate } from 'react-router-dom';
import AdminHeader from './AdminHeader';
import AdminCarCard from './AdminCarCard';



function AdminPanel() {
  //   //Code to display all cars
  //   const [cars, setCars] = useState([]);
  //   useEffect(() => {
  //     // Fetch car details from the server
  //     axios.get('http://localhost:8000/cars/all')
  //       .then(response => {
  //         setCars(response.data);
  //       })
  //       .catch(error => {
  //         console.error('Error fetching car details: ', error);
  //       });
  //   }, []);

  //   //Code to allow the deletion of cars
  //   const handleDeleteCar = async (id) => {
  //     try {
  //       // Fetch detailed car information
  //       const response = await axios.get(`http://localhost:8000/cars/${id}`);
  //       const carData = response.data;

  //       // Confirm deletion
  //       if (window.confirm(`Are you sure you want to delete this car?`)) {
  //         // Delete car from the server
  //         await axios.post(`http://localhost:8000/cars/delete`, null, {
  //           params: { carid: id },
  //         });

  //         // Delete images from Firebase Storage
  //         await Promise.all(
  //           carData.colors.flatMap((color) =>
  //             color.images.map(async (imageUrl) => {
  //               const imageRef = ref(storage, imageUrl);
  //               try {
  //                 await deleteObject(imageRef);
  //               } catch (error) {
  //                 console.error('Error deleting image from Firebase Storage:', error);
  //               }
  //             })
  //           )
  //         );

  //         const mRef = ref(storage, carData.mainSrc);
  //         try {
  //           await deleteObject(mRef);
  //         }
  //         catch (error) {
  //           console.error("Error deleting main image", error);
  //         }
  //         alert('Car has been deleted');
  //         window.location.reload();
  //       }
  //     } catch (error) {
  //       console.log('Error fetching car details:', error);
  //     }
  //   };

  //   //Code to allow for the editing of cars
  //   const navigate = useNavigate();
  //   const handleEditCar = (id) => {
  //     // Navigate to the detailed view of the car using the history object
  //     navigate(`/admin/car/${id}`);
  //   };

  //   // Function to get unique color names from all cars
  //   const getAllUniqueColorNames = () => {
  //     const uniqueColorNames = new Set();
  //     cars.forEach((car) => {
  //       car.colors.forEach((color) => {
  //         uniqueColorNames.add(color.name);
  //       });
  //     });
  //     return Array.from(uniqueColorNames);
  //   };

  //   return (
  //     <div className="parent">
  //       <AdminHeader/>
  //       <div className='content bg-dark text-white pt-2 overflow-hidden pt-xl-5 pt-lg-5'>
  //         <h2 className='text-center mb-4'>Car Details</h2>
  //         <div className="w-100 d-flex flex-wrap justify-content-center align-items-center table-responsive">
  //           <div className="w-100">
  //             <table className="table table-striped table-hover table-bordered">
  //               <thead>
  //                 <tr>
  //                   <th className='bg-secondary text-white'>Name</th>
  //                   <th className='bg-secondary text-white'>Price</th>
  //                   <th className='bg-secondary text-white'>Transmission</th>
  //                   <th className='bg-secondary text-white'>Mileage</th>
  //                   <th className='bg-secondary text-white'>Features</th>
  //                   <th className='bg-secondary text-white'>Featured</th>
  //                   <th className='bg-secondary text-white'>Main Image</th>
  //                   {getAllUniqueColorNames().map((uniqueColorName, index) => (
  //                     <React.Fragment key={index}>
  //                       <th className='bg-secondary text-white'>{`${uniqueColorName} Color`}</th>
  //                     </React.Fragment>
  //                   ))}
  //                   <th className='bg-secondary text-white'>Actions</th>
  //                 </tr>
  //               </thead>
  //               <tbody>
  //                 {cars.map((car) => (
  //                   <tr key={car._id}>
  //                     <td>{car.name}</td>
  //                     <td>₹{car.price.toLocaleString()}</td>
  //                     <td>{car.transmission}</td>
  //                     <td>{`${car.mileage} Km/l`}</td>
  //                     <td>{car.features.join(', ')}</td>
  //                     <td>{car.isFeatured ? 'Yes' : 'No'}</td>
  //                     <td><img src={car.mainSrc} alt={`Main`} style={{ width: "100px" }} /></td>
  //                     {getAllUniqueColorNames().map((uniqueColorName, index) => {
  //                       const color = car.colors.find((c) => c.name === uniqueColorName);
  //                       return (
  //                         <React.Fragment key={index}>
  //                           <td>
  //                             {color ? (
  //                               <ul>
  //                                 <strong>{color.name}</strong>
  //                                 {color.images.map((image, imageIndex) => (
  //                                   <li key={imageIndex}>
  //                                     <img src={image} alt={`Color ${color.name} - Image ${imageIndex}`} style={{ width: "100px" }} />
  //                                   </li>
  //                                 ))}
  //                               </ul>
  //                             ) : (
  //                               // Empty cell if the color is not present for this car
  //                               ''
  //                             )}
  //                           </td>
  //                         </React.Fragment>
  //                       );
  //                     })}
  //                     <td>
  //                       <div className="d-flex flex-column">
  //                         <button type="button" className='btn btn-danger mb-2' onClick={() => handleDeleteCar(car._id)}>Delete</button>
  //                         <button type="button" className='btn btn-warning' onClick={() => handleEditCar(car._id)}>Edit</button>
  //                       </div>
  //                     </td>
  //                   </tr>
  //                 ))}
  //               </tbody>
  //             </table>
  //           </div>
  //         </div>
  //         <br /><br />
  //         <hr />
  //         <br />
  //       </div>
  //       <Footer />
  //     </div>
  //   );
  // }
  const [cars, setCars] = useState([]);
  useEffect(() => {
    // Fetch car data for all the cars in the server
    const fetchCarsData = async () => {
      try {
        const response = await axios.get('http://localhost:8000/cars/all');
        setCars(response.data);
      } catch (error) {
        console.error('Error fetching car list:', error);
      }
    };
    fetchCarsData();
  }, []);

  return (
    <div className='parent'>
      <AdminHeader />
      <div className="content w-100 p-5 bg-dark text-white">
        <h2 className='px-5 py-4'>Car List</h2>
        <div className='d-flex flex-wrap justify-content-center gap-5 px-3 pb-3'>
          {cars.map((car) => (
            <AdminCarCard key={car._id} carId={car._id} />
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default AdminPanel;