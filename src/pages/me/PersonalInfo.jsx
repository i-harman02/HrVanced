import React from 'react';
import FormRenderer from '../../components/form/FormRenderer';
import { inputFields } from '../../configs/employeeForms/inputFields';
import { useState } from 'react';
import FormButtons from '../../components/FormButtons';

const PersonalInfo = () => {
  const [formData, setFormData] = useState({});
  return (
    <>
    <div className='grid grid-cols-3'>
       <div>
          <h2 className="text-base text-heading font-bold leading-tight mb-3.5">
            Personal Information
          </h2>
          <p className="text-sm text-textgray leading-tight sm:max-w-56.25">
            Use a permanent Phone Number where you can receive Call.
          </p>
        </div>
      <div>
        <FormRenderer
          fields ={inputFields.nameInfo}
          formData={formData}
          setFormData={setFormData}
          />
      </div>
    </div>
    
    </>
  )
}

export default PersonalInfo;


