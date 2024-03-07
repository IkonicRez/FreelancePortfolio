import React, { useState } from 'react'
import ContactModal from './ContactModal'

const ModalButton = () => {

  const [modalVisible, setModalVisible] = useState(false)

  const toggleModal = () => setModalVisible(!modalVisible)

  return (  
    <div className='contact-modal'>
      {
        modalVisible ? 
          <ContactModal toggle={toggleModal}/> 
          : 
          <button type="button" onClick={toggleModal} value="Open">Open</button>
        }
      
    </div>
  )
}

export default ModalButton