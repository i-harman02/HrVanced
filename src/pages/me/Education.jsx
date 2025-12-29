import React from 'react'
import { useState } from 'react';
import FormRenderer from '../../components/form/FormRenderer'
import { inputFields } from '../../configs/employeeForms/inputFields';


const Education = () => {
  const[formData, setFormData] = useState({});
  return (
    <>
    <div className='grid grid-cols-3'>
      <div>
          <h2 className="text-base text-heading font-bold leading-tight mb-3.5">
            Education
          </h2>
         
        </div>
        <div>
          <FormRenderer
          fields={inputFields.educationInfo}
          formData={formData}
          setFormData={setFormData}
          />
        </div>
    </div>
    </>
  )
}

export default Education