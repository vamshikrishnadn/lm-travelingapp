import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AppCard from '../../layouts/AppCard';
import { Link, useNavigate } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import { filterTravels, otherTravels } from '../../../store/actions/TravelActions';
import AppLoader from '../../layouts/AppLoader';
import moment from 'moment';
import { EyeFill } from 'react-bootstrap-icons';
import { City } from 'country-state-city';

var cities = City.getCitiesOfCountry('IN');

const Dashboard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // constants
  const headers = [
    '#',
    'Travel Id',
    'Traveler',
    'Vehicle Company',
    'Price',
    'From',
    'To',
    'Via',
    'Travel Date',
    'Travel Time',
    'Setter',
    'Available seats',
    'Actions',
  ];

  // selectors
  const { token } = useSelector(state => state.auth?.authDetails);
  const travels = useSelector(state => state.travel?.otherTravels);
  console.log('🚀 ~ file: Dashboard.js:27 ~ Dashboard ~ otherTravels:', travels);

  const [data, setData] = useState({});

  useEffect(() => {
    dispatch(otherTravels(token));
  }, []);

  const handleChange = e => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const clearFilter = () => {
    dispatch(otherTravels(token));
    setData({
      from: '',
      to: '',
      travelDate: '',
    });
  };

  const handleSubmit = () => {
    dispatch(filterTravels(data, token));
  };

  return travels ? (
    <>
      <AppCard>
        <h4 className='mb-4 text-primary'>Travels Available</h4>

        <div className='table-responsive'>
          <div className='row'>
            <div className='col-12 col-lg-3 mb-2'>
              <Form.Group className='mb-3' controlId='formBasicEmail'>
                <Form.Label className='text-capitalize'>From</Form.Label>
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

            <div className='col-12 col-lg-3 mb-2'>
              <Form.Group className='mb-3' controlId='formBasicEmail'>
                <Form.Label className='text-capitalize'>To</Form.Label>
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

            {/* <div className='col-12 col-lg-3 mb-2'>
              <Form.Group className='mb-3' controlId='formBasicEmail'>
                <Form.Label className='text-capitalize'>Travel Date</Form.Label>
                <Form.Control
                  type='date'
                  placeholder='Travel date'
                  name='travelDate'
                  onChange={handleChange}
                  // onChange={e => setData({ ...data, travelDate: moment(e.target.value).format() })}
                  required={true}
                />
              </Form.Group>
            </div> */}

            <div className='col-12 col-lg-3 mb-2  d-flex align-items-end h-100'>
              <button className='btn btn-primary me-3' type='submit' onClick={handleSubmit}>
                Submit
              </button>
              <button className='btn btn-danger' type='button' onClick={clearFilter}>
                Clear
              </button>
            </div>
          </div>

          <table className='table table-striped table-hover'>
            <thead className='bg-success'>
              <tr className='bg-primary'>
                {headers?.map((header, i) => (
                  <th scope='col' key={i}>
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {travels?.length === 0 ? (
                <h6 className='text-danger'>No travels found</h6>
              ) : (
                travels?.map((travel, i) => (
                  <tr key={i}>
                    <th scope='row'>{i + 1}</th>
                    <td className='text-uppercase'>{travel?.travelId}</td>
                    <td className='text-capitalize'>{travel?.createdBy?.name}</td>
                    <td className='text-capitalize'>{travel?.vehicleMade}</td>
                    <td className='text-capitalize'>{travel?.price} ₹</td>
                    <td className='text-capitalize'>{travel?.from}</td>
                    <td className='text-capitalize'>{travel?.to}</td>
                    <td className='text-capitalize'>{travel?.via || '-'}</td>
                    <td className='text-capitalize'>{moment(travel?.travelDate).format('ll')}</td>
                    <td className=''>{`${travel?.travelTime?.from} to ${travel?.travelTime?.to}`}</td>
                    <td className=''>{`${travel?.setter}`}</td>
                    <td className=''>{`${travel?.travelMembersCount - travel?.occupiedSeats}`}</td>
                    <td className=''>
                      <Link
                        to={`/travel/request/send/${travel?._id}`}
                        className='btn btn-primary pt-0'
                      >
                        <EyeFill />
                      </Link>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </AppCard>
    </>
  ) : (
    <AppLoader />
  );
};

export default Dashboard;
