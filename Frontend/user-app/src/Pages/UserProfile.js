import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const UserProfile = () => {
  const { userId } = useParams();
  const [userData, setUserData] = useState({});

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/getUser?id=${userId}`);
        if (response.status === 200) {
          setUserData(response?.data?.data);
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchUserData();
  }, [userId]);

  return (
   <>
      <div>
      <h1>User Profile</h1>
      <p>FirstName: {userData?.firstName}</p>
      <p>LastName: {userData?.lastName}</p>
      <p>E-mail: {userData?.email}</p>
      <p>Country: {userData?.country}</p>
      <p>State: {userData?.state}</p>
      <p>City: {userData?.city}</p>
      <p>Gender: {userData?.gender}</p>
      <p>Date of Birth: {userData?.dateOfBirth}</p>
      <p>Age: {userData?.age}</p>

    </div>
    
   </>
  );
};

export default UserProfile;
