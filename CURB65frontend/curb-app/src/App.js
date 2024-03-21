import React, { useState } from 'react';
import axios from 'axios';

const formStyle = {
  maxWidth: '600px',
  margin: '0 auto',
  padding: '20px',
  border: '1px solid #ccc',
  borderRadius: '8px',
};

const fieldSetStyle = {
  border: '1px solid #aaa',
  borderRadius: '4px',
  padding: '10px',
  marginBottom: '10px',
};

const legendStyle = {
  width: 'auto',
  borderBottom: 'none',
  marginBottom: '10px',
};

const labelStyle = {
  display: 'block',
  margin: '5px 0',
};

const inputStyle = {
  margin: '0 5px',
};

const buttonStyle = {
  margin: '10px 2px',
  padding: '5px 20px',
};

function App() {
  const [patientId, setPatientId] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [dateOfVisit, setDateOfVisit] = useState('');
  const [confusion, setConfusion] = useState(false);
  const [urea, setUrea] = useState('');
  const [respiratoryRate, setRespiratoryRate] = useState('');
  const [systolicBp, setSystolicBp] = useState('');
  const [diastolicBp, setDiastolicBp] = useState('');
  const [Age65, setAge65] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(e);
    try {
      // Calculate age from date of birth and date of visit
      const age = calculateAge(new Date(dateOfBirth), new Date(dateOfVisit));

      // Validate patient ID format
      // const idPattern = /^P\d{6}$/;
      // if (!idPattern.test(patientId)) {
      //   throw new Error('Invalid patient ID. Please use format Pnnnnnn.');
      // }

      // Perform other input validations...

      // Send data to backend
      const response = await axios.post('http://localhost:5000/calculate_curb65', {
        patientId,
        dateOfBirth,
        dateOfVisit,
        age,

        confusion,
        urea,
        respiratoryRate,
        systolicBp,
        diastolicBp,
        Age65
      });

      // Handle response from backend
      // Assuming 'response' is the parsed object from the API
// var response = {"CURB65Score":[124,2]};/

// Assuming 'response' is the object you received from the HTTP request
var agei = response.data.CURB65Score[0];
var curbScore = response.data.CURB65Score[1];

// Displaying the alert box
alert("Age = " + agei + "\nCURB Score = " + curbScore);


    } catch (err) {
      setError(err.message);
    }
  };

  const calculateAge = (birthDate, visitDate) => {
    const diffInMs = visitDate - birthDate;
    const ageDate = new Date(diffInMs);
    return Math.abs(ageDate.getUTCFullYear() - 1970);
  };

  return (
<>
<div style={{ padding: '20px' }}>
    <h1>CURB-65 Pneumonia Severity Score</h1>
    {error && <p style={{ color: 'red' }}>{error}</p>}





    <form onSubmit={handleSubmit} style={formStyle}>
    <label>
          Patient ID:
          <input type="text" value={patientId} onChange={(e) => setPatientId(e.target.value)} required />
        </label>
        <br />
        <label>
          Date of Birth:
          <input type="date" value={dateOfBirth} onChange={(e) => setDateOfBirth(e.target.value)} required />
        </label>
        <br />
        <label>
          Date of Visit:
          <input type="date" value={dateOfVisit} onChange={(e) => setDateOfVisit(e.target.value)} required />
        </label>
        <br />




      
      <div style={fieldSetStyle}>
        <div style={legendStyle}>Confusion</div>
        <label style={labelStyle}>
          <input type="radio" name="confusion" value="Yes" onChange={() => setConfusion('Yes')} required style={inputStyle} />
          Yes
        </label>
        <label style={labelStyle}>
          <input type="radio" name="confusion" value="No" onChange={() => setConfusion('No')} required style={inputStyle} />
          No
        </label>
      </div>

        
      <div style={fieldSetStyle}>
        <div style={legendStyle}> <legend>Urea &gt; 7 mmol/L</legend></div>
        <label style={labelStyle}>
          <input type="radio" name="ureaLevel" value="Yes" onChange={() => setUrea('Yes')} required style={inputStyle} />
          Yes
        </label>
        <label style={labelStyle}>
          <input type="radio" name="ureaLevel" value="No" onChange={() => setUrea('No')} required style={inputStyle} />
          No
        </label>
      </div>

      <div style={fieldSetStyle}>
        <div style={legendStyle}>  <legend>Respiratory rate &gt;= 30/minute</legend></div>
        <label style={labelStyle}>
          <input type="radio" name="respiratoryRate" value="Yes" onChange={() => setRespiratoryRate('Yes')} required style={inputStyle} />
          Yes
        </label>
        <label style={labelStyle}>
          <input type="radio" name="respiratoryRate" value="No" onChange={() => setRespiratoryRate('No')} required style={inputStyle} />
          No
        </label>
      </div>

 
      <div style={fieldSetStyle}>
        <div style={legendStyle}>  <legend>SystolicBp Blood pressure &lt; 90 mmHg</legend></div>
        <label style={labelStyle}>
          <input type="radio" name="SystolicBp" value="Yes" onChange={() => setSystolicBp('Yes')}  style={inputStyle} />
          Yes
        </label>
        <label style={labelStyle}>
          <input type="radio" name="SystolicBp" value="No" onChange={() => setSystolicBp('No')}  style={inputStyle} />
          No
        </label>
      </div>
      

      <div style={fieldSetStyle}>
        <div style={legendStyle}>   <legend>DiastolicBp Blood pressure &lt; = 60 mmHg</legend></div>
        <label style={labelStyle}>
          <input type="radio" name="bloodPressure" value="Yes" onChange={() => setDiastolicBp('Yes')}  style={inputStyle} />
          Yes
        </label>
        <label style={labelStyle}>
          <input type="radio" name="bloodPressure" value="No" onChange={() => setDiastolicBp('No')}  style={inputStyle} />
          No
        </label>
      </div>


      <div style={fieldSetStyle}>
        <div style={legendStyle}>   <legend>Age &gt;= 65 years</legend></div>
        <label style={labelStyle}>
          <input type="radio" name="age65" value="Yes" onChange={() => setAge65('Yes')} required style={inputStyle} />
          Yes
        </label>
        <label style={labelStyle}>
          <input type="radio" name="age65" value="No" onChange={() => setAge65('No')} required style={inputStyle} />
          No
        </label>
      </div>

    
     



      <button type="submit" style={buttonStyle}>Calculate</button>
      <button type="reset" style={buttonStyle}>Reset</button>
    </form>


 
  </div>

 


    {/* <div>
      <h1>CURB-65 Calculator</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
    

        <fieldset style={{ display: 'inline-block', verticalAlign: 'top' }}>
          <legend>Confusion</legend>
          <label>
            <input type="radio" name="confusion" value="Yes" onChange={() => setConfusion('Yes')} required />
            Yes
          </label>
          <label>
            <input type="radio" name="confusion" value="No" onChange={() => setConfusion('No')} required />
            No
          </label>
        </fieldset>
        <br />

        <fieldset style={{ display: 'inline-block', verticalAlign: 'top' }}>
          <legend>Urea &gt; 7 mmol/L</legend>
          <label>
            <input type="radio" name="ureaLevel" value="Yes" onChange={() => setUrea('Yes')} required />
            Yes
          </label>
          <label>
            <input type="radio" name="ureaLevel" value="No" onChange={() => setUrea('No')} required />
            No
          </label>
        </fieldset>
        <br />

        <fieldset style={{ display: 'inline-block', verticalAlign: 'top' }}>
          <legend>Respiratory rate &gt;= 30/minute</legend>
          <label>
            <input type="radio" name="respiratoryRate" value="Yes" onChange={() => setRespiratoryRate('Yes')} required />
            Yes
          </label>
          <label>
            <input type="radio" name="respiratoryRate" value="No" onChange={() => setRespiratoryRate('No')} required />
            No
          </label>
        </fieldset>
        <br />

        <fieldset style={{ display: 'inline-block', verticalAlign: 'top' }}>
          <legend>Blood pressure</legend>
          <label>
            <input type="radio" name="SystolicBp" value="Yes" onChange={() => setSystolicBp('Yes')} required />
            Yes
          </label>
          <label>
            <input type="radio" name="SystolicBp" value="No" onChange={() => setSystolicBp('No')} required />
            No
          </label>
        </fieldset>
        <br />

        <fieldset style={{ display: 'inline-block', verticalAlign: 'top' }}>
          <legend>Blood pressure</legend>
          <label>
            <input type="radio" name="bloodPressure" value="Yes" onChange={() => setDiastolicBp('Yes')} required />
            Yes
          </label>
          <label>
            <input type="radio" name="bloodPressure" value="No" onChange={() => setDiastolicBp('No')} required />
            No
          </label>
        </fieldset>
        <br />

         <fieldset>
          <legend>Age &gt;= 65 years</legend>
          <label>
            <input type="radio" name="age65" value="Yes" onChange={() => setAge65('Yes')} required />
            Yes
          </label>
          <label>
            <input type="radio" name="age65" value="No" onChange={() => setAge65('No')} required />
            No
          </label>
        </fieldset>
        <br /> 

  
        <button type="submit">Calculate CURB-65</button>
      </form>
    </div> */}


</>
  );
}

export default App;
