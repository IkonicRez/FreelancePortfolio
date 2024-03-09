import React, { useEffect, useState } from 'react';

const ContactModal = ({ toggle, className }) => {
  const [clientName, setClientName] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [projectType, setProjectType] = useState('');
  const [clientBudget, setClientBudget] = useState(1500);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = {
      client_name: clientName,
      client_email: clientEmail,
      project_type: projectType,
      client_budget: clientBudget
    };

    try {
      const response = await fetch('http://localhost:3005/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      console.log(response.ok)
      if (response.ok) {
        console.log('Data posted successfully');
        setClientName('');
        setClientEmail('');
        setProjectType('');
        setClientBudget(1500);
      } else {
        console.error('Failed to post data');
      }
    } catch (error) {
      console.error("Error: ", error);
    }
  };

  useEffect(() => {
    const budgetSliderElement = document.getElementById("budget");
    if (budgetSliderElement) {
      budgetSliderElement.addEventListener("input", () => {
        document.getElementById('budget-value').innerHTML = budgetSliderElement.value;
      });
    }
  }, []);

  return (
    <section className={`modal-main ${className}`}>
      <div className='modal-header'>
        <button type="button" onClick={toggle}>X</button>
      </div>
      <section className='modal-content'>
        <h2>Thanks for choosing us to make your project a reality!</h2>
        <h3>Fill out the information below and we will reach out to you as soon as we can.</h3>
        <div className='modal-input'>
          <form onSubmit={handleSubmit}>
            <div className='modal-input-field'>
              Name:<input type="text" name="contactName" id="contactName" value={clientName} onChange={(e) => setClientName(e.target.value)} />
            </div>
            <div className='modal-input-field'>
              Email:<input type="email" name="email" id="emailInput" value={clientEmail} onChange={(e) => setClientEmail(e.target.value)} />
            </div>
            <div className='modal-input-field'>
              Project Type:
              <input list="projectTypes" value={projectType} onChange={(e) => setProjectType(e.target.value)} />
              <datalist id="projectTypes">
                <option value="Simple Website (Front-end)" />
                <option value="Full-stack Application or Website" />
                <option value="Game Development" />
                <option value="Graphic Design" />
                <option value="Website or Application Optimization" />
              </datalist>
            </div>
            <div className='modal-input-field'>
              Budget Range:<p id="budget-value">{clientBudget}</p>
              <input type="range" name="budget" value={clientBudget} id="budget" onChange={(e) => setClientBudget(parseInt(e.target.value))} min="100" max="30000" step="50" />
            </div>
            <button type='submit'>Submit</button>
          </form>
        </div>
      </section>
    </section>
  );
};

export default ContactModal;
