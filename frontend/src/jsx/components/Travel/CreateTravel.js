import React, { useState, useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import { useDispatch, useSelector } from 'react-redux';
import Spinner from 'react-bootstrap/Spinner';
import AppCard from '../../layouts/AppCard';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { createTravel, editTravel } from '../../../store/actions/TravelActions';
import moment from 'moment';
import { toast } from 'react-toastify';
import { City } from 'country-state-city';

var cities = City.getCitiesOfCountry('IN');

const CreateTravel = ({ match }) => {
  const { id } = useParams();
  const location = useLocation();
  console.log('🚀 ~ file: CreateTravel.js:12 ~ CreateTravel ~ location:', location);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // states
  const [data, setData] = useState({});

  // constants
  const hours = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'];
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
    // {
    //   type: 'text',
    //   label: 'From',
    //   required: true,
    //   placeholder: 'From location',
    //   name: 'from',
    // },
    // {
    //   type: 'text',
    //   label: 'To',
    //   required: true,
    //   placeholder: 'To location',
    //   name: 'to',
    // },
    // {
    //   type: 'text',
    //   label: 'Via',
    //   required: false,
    //   placeholder: 'Via location',
    //   name: 'via',
    // },
  ];
  const travel = location?.state;

  // selectors
  const { btnLoader } = useSelector(state => state.app);
  const { token } = useSelector(state => state.auth?.authDetails);

  useEffect(() => {
    window.scroll(0, 0);
    if (id && travel) {
      setData({
        ...travel,
        travelDate: moment(travel?.travelDate).format('YYYY-MM-DD'),
        startTime: travel?.travelTime?.from.split(':')?.[0],
        endTime: travel?.travelTime?.to.split(':')?.[0],
        startMode: travel?.travelTime?.from.split(':')?.[1],
        endMode: travel?.travelTime?.to.split(':')?.[1],
      });
    } else {
      handleClearData();
    }
  }, [id]);

  const handleChange = e => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (
      data?.startTime &&
      data?.startMode &&
      data?.endTime &&
      data?.endMode &&
      data?.from &&
      data?.to
    ) {
      // console.log(
      //   'seeter==>',
      //   data?.setter,
      //   'Travel count  ===>',
      //   Number(data?.travelMembersCount)
      // );
      if (Number(data?.setter) < Number(data?.travelMembersCount)) {
        return toast.error('Travel members count should be less that seater count.');
      }
      const submitValues = {
        ...data,
        travelTime: {
          from: data?.startTime + ':' + data?.startMode,
          to: data?.endTime + ':' + data?.endMode,
        },
      };
      console.log('data', submitValues, data);
      if (id) {
        return dispatch(editTravel(token, submitValues, id, navigate));
      }
      dispatch(createTravel(token, submitValues, navigate));
    } else {
      toast.error('All fields are required');
    }
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
      file: [],
      travelDate: '',
    });
  };

  return (
    <AppCard>
      <div className='container_box my-4'>
        <h4 className='mb-4 text-primary'>{id ? 'Edit' : 'Create'} Travel</h4>
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

            <div className='col-12 col-lg-6'>
              <Form.Group className='mb-3 ' controlId='formBasicEmail'>
                <Form.Label>
                  Fuel Type<span className='text-danger'>*</span>
                </Form.Label>
                <br />
                <Form.Check
                  inline
                  label='Diesel'
                  name='fuelType'
                  type={'radio'}
                  id={`gender-1`}
                  value={'Diesel'}
                  onChange={handleChange}
                />
                <Form.Check
                  inline
                  label='Petrol'
                  name='fuelType'
                  type={'radio'}
                  id={`gender-2`}
                  value={'Petrol'}
                  onChange={handleChange}
                />
              </Form.Group>
            </div>

            <div className='col-12 col-lg-6 mb-2'>
              <Form.Group className='mb-3' controlId='formBasicEmail'>
                <Form.Label className='text-capitalize'>
                  From <span className='text-danger'>*</span>
                </Form.Label>
                <Form.Select name='from' onChange={handleChange} value={data?.['from']} required>
                  <option>Select city</option>
                  {cities?.map((city, i) => (
                    <option key={i} value={city?.name}>
                      {city?.name}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
            </div>

            <div className='col-12 col-lg-6 mb-2'>
              <Form.Group className='mb-3' controlId='formBasicEmail'>
                <Form.Label className='text-capitalize'>
                  To <span className='text-danger'>*</span>
                </Form.Label>
                <Form.Select name='to' onChange={handleChange} value={data?.['to']} required>
                  <option>Select city</option>
                  {cities?.map((city, i) => (
                    <option key={i} value={city?.name}>
                      {city?.name}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
            </div>

            <div className='col-12 col-lg-6 mb-2'>
              <Form.Group className='mb-3' controlId='formBasicEmail'>
                <Form.Label className='text-capitalize'>
                  Via <span className='text-danger'>*</span>
                </Form.Label>
                <Form.Select name='via' onChange={handleChange} value={data?.['via']} required>
                  <option>Select city</option>
                  {cities?.map((city, i) => (
                    <option key={i} value={city?.name}>
                      {city?.name}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
            </div>

            <div className='col-12 col-lg-6'>
              <Form.Group className='mb-3 ' controlId='formBasicEmail'>
                <Form.Label>Files</Form.Label>
                <br />
                <input
                  type='file'
                  // name='file'
                  // required
                  accept='image/*'
                  onChange={e => setData({ ...data, file: e.target.files?.[0] })}
                  multiple={false}
                />
              </Form.Group>
            </div>

            <div className='col-12 col-lg-6 mb-2'>
              <Form.Group className='mb-3' controlId='formBasicEmail'>
                <Form.Label className='text-capitalize'>
                  Start Time <span className='text-danger'>*</span>
                </Form.Label>
                <div className='d-flex'>
                  <Form.Select
                    name='startTime'
                    onChange={handleChange}
                    value={data?.['startTime']}
                    required
                  >
                    <option>Select Time</option>
                    {hours?.map((hour, i) => (
                      <option key={i} value={hour}>
                        {hour}
                      </option>
                    ))}
                  </Form.Select>
                  <Form.Select
                    name='startMode'
                    onChange={handleChange}
                    value={data?.['startMode']}
                    required
                  >
                    <option>Select Mode</option>
                    {['AM', 'PM']?.map((hour, i) => (
                      <option key={i} value={hour}>
                        {hour}
                      </option>
                    ))}
                  </Form.Select>
                </div>
              </Form.Group>
            </div>

            <div className='col-12 col-lg-6 mb-2'>
              <Form.Group className='mb-3' controlId='formBasicEmail'>
                <Form.Label className='text-capitalize'>
                  End Time <span className='text-danger'>*</span>
                </Form.Label>
                <div className='d-flex'>
                  <Form.Select
                    name='endTime'
                    onChange={handleChange}
                    value={data?.['endTime']}
                    required
                  >
                    <option>Select Time</option>
                    {hours?.map((hour, i) => (
                      <option key={i} value={hour}>
                        {hour}
                      </option>
                    ))}
                  </Form.Select>
                  <Form.Select
                    name='endMode'
                    onChange={handleChange}
                    value={data?.['endMode']}
                    required
                  >
                    <option>Select Mode</option>
                    {['AM', 'PM']?.map((hour, i) => (
                      <option key={i} value={hour}>
                        {hour}
                      </option>
                    ))}
                  </Form.Select>
                </div>
              </Form.Group>
            </div>

            <div className='col-12 col-lg-6 mb-2'>
              <Form.Group className='mb-3' controlId='formBasicEmail'>
                <Form.Label className='text-capitalize'>
                  Travel Price in INR
                  <span className='text-danger'>*</span>
                </Form.Label>
                <Form.Control
                  type='number'
                  placeholder='Travel price'
                  name='price'
                  value={data?.['price']}
                  onChange={handleChange}
                  required={true}
                />
              </Form.Group>
            </div>
          </div>
          <button className='btn btn-primary me-3' type='submit'>
            {btnLoader ? <Spinner animation='border' size='sm' /> : 'Submit'}
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
