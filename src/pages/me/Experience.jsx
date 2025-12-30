import React, { useState } from 'react'
import FormRenderer from '../../components/form/FormRenderer'
import { inputFields } from '../../configs/employeeForms/inputFields';

const Experience = () => {
  const[formData, setFormData] = useState({});
  return (
    <>
    <div className='grid grid-cols-1 lg:grid-cols-3 '>
      <div className='mb-8 md:mb-0'>
          <h2 className="text-base text-heading font-bold leading-tight mb-3.5">
            Experience
          </h2>
          
        </div>
        <div>
          <FormRenderer
          fields={inputFields.jobInfo}
          formData={formData}
          setFormData={setFormData}/>
        </div>
    </div>
    </>
  )
}

export default Experience