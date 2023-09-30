import React, { useState, useEffect } from "react";
import axios from 'axios';
import "./styles.css"; 
import toast from "react-hot-toast";
import "react-toastify/dist/ReactToastify.css";


function UserForm() {

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    country: "",
    state: "",
    city: "",
    gender: "",
    dateOfBirth: "",
    age: "",
  });


  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [data, setData] = useState(null);

  useEffect(() => {
    axios.get("http://api.geonames.org/countryInfoJSON?username=abhishek_001")
      .then((response) => {
        if (response.data.geonames && response.data.geonames.length > 0) {
          const countryData = response.data.geonames.map((country) => ({
            name: country.countryName,
            geonameId: country.geonameId,
          }));  
          setCountries(countryData);
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);
  


  useEffect(() => {
    if (formData.country) {
      const selectedCountry = countries.filter((country) => country.name === formData.country);
      
      if (selectedCountry) {
        const selectedCountryGeonameId = selectedCountry[0].geonameId;
  
        axios.get(`http://api.geonames.org/childrenJSON?geonameId=${selectedCountryGeonameId}&username=abhishek_001`)
          .then((response) => {
            const data = response.data;
            if (data.geonames && data.geonames.length > 0) {
              const stateNames = data.geonames.map((state) => ({
                name: state.name,
                geonameId: state.geonameId,
              }));
              setStates(stateNames);
              setFormData({ ...formData, state: "" });
            }
          })
          .catch((error) => {
            console.error("Error fetching states:", error);
          });
      }
    }
  }, [formData.country, countries]);
   

   useEffect(() => {
    if (formData.state) {
      const selectedState = states.find((state) => state.name === formData.state);
      
      if (selectedState) {
        const selectedStateGeonameId = selectedState.geonameId;
  
        axios.get(`http://api.geonames.org/childrenJSON?geonameId=${selectedStateGeonameId}&username=abhishek_001`)
          .then((response) => {
            const data = response.data;
            if (data.geonames && data.geonames.length > 0) {
              const cityNames = data.geonames.map((city) => ({
                name: city.name,
                geonameId: city.geonameId,
              }));
              setCities(cityNames);
            }
          })
          .catch((error) => {
            console.error("Error fetching cities:", error);
          });
      }
    }
  }, [formData.state, states]);
  
  

 
  const handleChange = (e) => {
    const { name, value } = e.target;
    let age = formData.age; 

  if (name === 'dateOfBirth') {
    const birthDate = new Date(value);
    const currentDate = new Date();
    const ageDiff = currentDate.getFullYear() - birthDate.getFullYear();
    if (
      currentDate.getMonth() < birthDate.getMonth() ||
      (currentDate.getMonth() === birthDate.getMonth() &&
        currentDate.getDate() < birthDate.getDate())
    ) {
      ageDiff--;
    }

    age = ageDiff;
  }
    setFormData({ ...formData, [name]: value, age });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/api/addUser", formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
  
      if (response.status === 200 || response.status === 201) {
        const message = response?.data?.message;
        toast.success(message , {id:"003"});
        const userId = response.data.data._id;
        window.location.href = `/user-profile/${userId}`;

      }

    } catch (error) {
      toast.error(error?.response.data.message , {id:"004"});
      console.error("Error:", error);
    }
  };

 


  return (
    <form onSubmit={handleSubmit} className="col-md-8">
    <div className="row justify-content-center">
      <div className="col-md-6">
        <div className="mb-3">
          <label htmlFor="firstName" className="form-label">First Name</label>
          <input
            type="text"
            name="firstName"
            id="firstName"
            className="form-control colorful-input"
            placeholder="First Name"
            value={formData.firstName}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="lastName" className="form-label">Last Name</label>
          <input
            type="text"
            name="lastName"
            id="lastName"
            className="form-control colorful-input"
            placeholder="Last Name"
            value={formData.lastName}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email</label>
          <input
            type="email"
            name="email"
            id="email"
            className="form-control colorful-input"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="country" className="form-label">Country</label>
          <select
            name="country"
            id="country"
            className="form-select colorful-input"
            value={formData.country}
            onChange={handleChange}
            required
          >
            <option value="" disabled>
                Select Country
              </option>
              {countries.map((country, index) => (
               <option key={index} value={country.name}>
               {country.name}
               </option>
              ))}
            {/* Add more countries */}
          </select>
        </div>
      </div>
      <div className="col-md-6">
        <div className="mb-3">
          <label htmlFor="state" className="form-label">State</label>
          <select
            name="state"
            id="state"
            className="form-select colorful-input"
            value={formData.state}
            onChange={handleChange}
            required
          >
             <option value="" disabled>
                Select State
              </option>
              {states.map((state, index) => (
                <option key={index} value={state.name}>
                  {state.name}
                </option>
              ))}
          </select>
        </div>
        <div className="mb-3">
  <label htmlFor="city" className="form-label">City</label>
  <select
    name="city"
    id="city"
    className="form-select colorful-input"
    value={formData.city}
    onChange={handleChange}
    required
  >
    <option value="" disabled>
                Select City
              </option>
              {cities.map((city, index) => (
                <option key={index} value={city.name}>
                  {city.name}
                </option>
              ))}
  </select>
</div>

        <div className="mb-3">
          <label className="form-label">Gender</label>
          <div className="d-flex justify-content-center">
            <div className="form-check form-check-inline">
              <input
                type="radio"
                name="gender"
                id="male"
                className="form-check-input colorful-input"
                value="Male"
                checked={formData.gender === "Male"}
                onChange={handleChange}
                required
              />
              <label htmlFor="male" className="form-check-label">Male</label>
            </div>
            <div className="form-check form-check-inline">
              <input
                type="radio"
                name="gender"
                id="female"
                className="form-check-input colorful-input"
                value="Female"
                checked={formData.gender === "Female"}
                onChange={handleChange}
                required
              />
              <label htmlFor="female" className="form-check-label">Female</label>
            </div>
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="dateOfBirth" className="form-label">Date of Birth</label>
          <input
            type="date"
            name="dateOfBirth"
            id="dateOfBirth"
            className="form-control colorful-input"
            placeholder="Date of Birth"
            value={formData.dateOfBirth}
            onChange={handleChange}
            required
          />
        </div>
      </div>
    </div>
    <div className="mb-3">
      <label htmlFor="age" className="form-label">Age</label>
      <input
        type="text"
        name="age"
        id="age"
        className="form-control colorful-input"
        placeholder="Age"
        value={formData.age}
        readOnly 
      />
    </div>
    <button type="submit" className="btn btn-primary colorful-button">Save</button>
  </form>
  
  
  )
}

export default UserForm;
