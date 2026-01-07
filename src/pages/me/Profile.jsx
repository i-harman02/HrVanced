import React, { useState } from 'react'
import FormRenderer from '../../components/form/FormRenderer'
import { formSections } from '../../configs/employeeForms/formSections';
import Button from '../../components/form/Button';

const Profile = () => {
  const[formData, setFormData] = useState({});
  return (
    <>
    <div className='grid grid-cols-1 lg:grid-cols-3 '>
      <div className='mb-8 md:mb-0'>
          <h2 className="text-base text-heading font-bold leading-tight mb-3.5">
            Organization Name
          </h2>
          <p className="text-sm text-textgray leading-tight sm:max-w-56.25"> Use a permanent address where you can receive mail. </p>     
        </div>
         <div>
    <FormRenderer
    fields={formSections.profileInfo}
    formData={formData}
    setFormData={setFormData}/>
    <Button/>
    </div>
    </div>
  
    </>

  )
}

export default Profile