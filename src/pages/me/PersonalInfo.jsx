import React from 'react';
import FormRenderer from '../../components/form/FormRenderer';
import { inputFields } from '../../configs/employeeForms/inputFields';
import { useState } from 'react';
import FormButtons from '../../components/FormButtons';
import { formSections } from '../../configs/employeeForms/formSections';
import Button from '../../components/form/Button';

const PersonalInfo = () => {
  const [formData, setFormData] = useState({});
  return (
    <>
    <div className='grid grid-cols-1 lg:grid-cols-3 '>
       <div className='mb-8 md:mb-0'>
          <h2 className="text-base text-heading font-bold leading-tight mb-3.5">
            Personal Information
          </h2>
          <p className="text-sm text-textgray leading-tight sm:max-w-56.25">
            Use a permanent Phone Number where you can receive Call.
          </p>
        </div>
      <div>
        <FormRenderer
          fields={formSections.personalInfo}
          formData={formData}
          setFormData={setFormData}
          />
          <Button/>
      </div>
    </div>
    
    </>
  )
}

export default PersonalInfo;


