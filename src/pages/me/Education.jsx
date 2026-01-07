import React from 'react'
import { useState } from 'react';
import FormRenderer from '../../components/form/FormRenderer'
import { formSections } from '../../configs/employeeForms/formSections';
import Button from '../../components/form/Button';

const Education = () => {
  const[formData, setFormData] = useState({});
  return (
    <>
    <div className='grid grid-cols-1 lg:grid-cols-3 '>
      <div className='mb-8 md:mb-0'>
          <h2 className="text-base text-heading font-bold leading-tight mb-3.5">
            Education
          </h2>
         
        </div>
        <div>
          <FormRenderer
          fields={formSections.educationInfo}
          formData={formData}
          setFormData={setFormData}
          />
          <Button/>
        </div>
    </div>
    </>
  )
}

export default Education