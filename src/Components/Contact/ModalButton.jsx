import React, { useState } from 'react'
import ContactModal from './ContactModal'

const ModalButton = () => {

  const [modalVisible, setModalVisible] = useState(false)

  const toggleModal = () => setModalVisible(!modalVisible)

  return (  
    <div className='contact-modal'>
      { modalVisible ? null : <button type="button" onClick={toggleModal} value="Open">Open</button> }
      <ContactModal toggle={toggleModal} className={modalVisible ? "show" : ""}/> 
      
    </div>
  )
}

export default ModalButton