import React, { useState, useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import { useDispatch, useSelector } from 'react-redux';
import Spinner from 'react-bootstrap/Spinner';
import AppCard from '../../layouts/AppCard';

const CreateTravel = () => {
  // states
  const [data, setData] = useState({});

  // constants
  const layoutElements = [
    {
      type: 'text',
      label: 'Vehicle Company',
      required: true,
      placeholder: 'Enter vehicle company',
      name: 'vehicleMade',
    },
    {
      type: 'text',
      label: 'Vehicle Model',
      required: true,
      placeholder: 'Enter vehicle model',
      name: 'vehicleModel',
    },
    {
      type: 'text',
      label: 'Vehicle Number',
      required: true,
      placeholder: 'Enter vehicle number',
      name: 'vehicleNumber',
    },
    {
      type: 'text',
      label: 'license Number',
      required: true,
      placeholder: 'Enter license Number',
      name: 'licenseNumber',
    },
    {
      type: 'number',
      label: 'setter',
      required: true,
      placeholder: 'Enter setter',
      name: 'setter',
    },
    {
      type: 'number',
      label: 'Members to travel',
      required: true,
      placeholder: 'Enter members to travel',
      name: 'travelMembersCount',
    },
    {
      type: 'text',
      label: 'From',
      required: true,
      placeholder: 'From location',
      name: 'from',
    },
    {
      type: 'text',
      label: 'To',
      required: true,
      placeholder: 'To location',
      name: 'to',
    },
    {
      type: 'text',
      label: 'Via',
      required: false,
      placeholder: 'Via location',
      name: 'via',
    },
  ];

  const handleChange = e => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    console.log('data', data);
  };

  const handleClearData = () => {
    setData({
      vehicleMade: '',
      vehicleModel: '',
      vehicleNumber: '',
      licenseNumber: '',
      setter: '',
      travelMembersCount: '',
      from: '',
      to: '',
      via: '',
      travelDate: '',
    });
  };

  return (
    <AppCard>
      <div className='container_box my-4'>
        <h4 className='mb-4'>Create Travel</h4>
        <Form onSubmit={handleSubmit}>
          <div className='row'>
            {layoutElements.map((ele, i) => (
              <div className='col-12 col-lg-6 mb-2' key={i}>
                <Form.Group className='mb-3' controlId='formBasicEmail'>
                  <Form.Label className='text-capitalize'>
                    {ele?.label}
                    {ele?.required && <span className='text-danger'>*</span>}
                  </Form.Label>
                  <Form.Control
                    type={ele?.type}
                    placeholder={ele?.placeholder}
                    name={ele?.name}
                    value={data?.[ele?.name]}
                    onChange={handleChange}
                    required={ele?.required}
                  />
                </Form.Group>
              </div>
            ))}

            <div className='col-12 col-lg-6 mb-2'>
              <Form.Group className='mb-3' controlId='formBasicEmail'>
                <Form.Label className='text-capitalize'>
                  Travel Date <span className='text-danger'>*</span>
                </Form.Label>
                <Form.Control
                  type='date'
                  placeholder='Travel date'
                  name='travelDate'
                  value={data?.['travelDate']}
                  onChange={handleChange}
                  required={true}
                />
              </Form.Group>
            </div>
          </div>
          <button className='btn btn-primary me-3' type='submit'>
            Submit
          </button>
          <button className='btn btn-danger' type='button' onClick={handleClearData}>
            Clear
          </button>
        </Form>
      </div>
    </AppCard>
  );
};

export default CreateTravel;
