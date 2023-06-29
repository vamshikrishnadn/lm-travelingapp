import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AppCard from '../../layouts/AppCard';
import { Link, useNavigate } from 'react-router-dom';
import { deleteTravel, myTravels } from '../../../store/actions/TravelActions';
import AppLoader from '../../layouts/AppLoader';
import moment from 'moment';
import { Eye, EyeFill, Pen, PenFill, Trash, TrashFill } from 'react-bootstrap-icons';

const MyTravels = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // constants
  const headers = [
    'Sl. No',
    'Travel Id',
    'Vehicle Company',
    'Status',
    'Price',
    'From',
    'To',
    'Via',
    'Travel Date',
    'Travel Time',
    'Actions',
  ];

  // selectors
  const { token } = useSelector(state => state.auth?.authDetails);
  const travels = useSelector(state => state.travel?.myTravels);
  console.log('🚀 ~ file: Dashboard.js:27 ~ Dashboard ~ otherTravels:', travels);

  useEffect(() => {
    dispatch(myTravels(token));
  }, []);

  const handleDeleteTravel = travel => {
    if (window.confirm('Are you sure to delete this travel?')) {
      dispatch(deleteTravel(token, travel?._id));
    }
  };

  return travels ? (
    <>
      <AppCard>
        <div className='d-flex justify-content-between'>
          <h4 className='mb-4 text-primary'>Travels Created</h4>
          <Link to='/travel/create' className='btn btn-success my-auto'>
            Create new
          </Link>
        </div>

        <div className='table-responsive'>
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
                    <td className='text-capitalize'>{travel?.vehicleMade}</td>
                    <td className='text-capitalize'>{travel?.status}</td>
                    <td className='text-capitalize'>{travel?.price} ₹</td>
                    <td className='text-capitalize'>{travel?.from}</td>
                    <td className='text-capitalize'>{travel?.to}</td>
                    <td className='text-capitalize'>{travel?.via || '-'}</td>
                    <td className='text-capitalize'>{moment(travel?.travelDate).format('ll')}</td>
                    <td className=''>{`${travel?.travelTime?.from} to ${travel?.travelTime?.to}`}</td>
                    <td className=''>
                      <button
                        className='btn btn-danger pt-0'
                        onClick={() => handleDeleteTravel(travel)}
                      >
                        <TrashFill />
                      </button>
                      <Link
                        to={`/travel/edit/${travel?._id}`}
                        state={travel}
                        className='btn btn-primary mx-2 pt-0'
                      >
                        <PenFill />
                      </Link>
                      <Link to={`/travel/view/${travel?._id}`} className='btn btn-secondary pt-0'>
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

export default MyTravels;
