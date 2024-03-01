import React, { useEffect } from 'react'

const ContactModal = ({toggle, className}) => {
  
  useEffect(() => {
    const budgetSliderElement = document.getElementById("budget")
    if (budgetSliderElement === undefined) return
    budgetSliderElement.addEventListener("input", () => {
      console.log("trigger")
      document.getElementById('budget-value').innerHTML = budgetSliderElement.value
    })
  })

    // const showHideClassName = show ? "modal display-block" : "modal display-none"
  return (
        <section className={`modal-main ${className}`}>
          <div className='modal-header'>
            <button type="button" onClick={toggle}>
                X
            </button>
          </div>
          <section className='modal-content'>
            <h2>Thanks for choosing us to make your project a reality!</h2>
            <h3>Fill out the information below and we will reach out to you as soon as we can.</h3>
            <div className='modal-input'>
              <div className='modal-input-field'>
                Name:<input type="text" name="contactName" id="contactName" /> 
              </div>
              <div className='modal-input-field'>
                Email:<input type="email" name="email" id="emailInput" /> 
              </div>
              <div className='modal-input-field'>
                Project Type:
                <input list="projectTypes" />
                  <datalist id="projectTypes">
                    <option value="Simple Website (Front-end)"/>  
                    <option value="Full-stack Application or Website"/>  
                    <option value="Game Development"/>  
                    <option value="Graphic Design"/>  
                    <option value="Website or Application Optimization"/>  
                  </datalist> 
              </div>     
              <div className='modal-input-field'>
                Budget Range:<p id="budget-value">{document.getElementById("budget") === undefined ? document.getElementById("budget").value : 100}</p>
                <input type="range" name="budget" id="budget" min="100" max="30000" step="50"/>
              </div>
            </div>
          </section>
          <div id="modal-submit">
            <button type='submit'>Submit</button>
          </div>
        </section>
  )
}

export default ContactModal
