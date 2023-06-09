import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AppCard from '../../layouts/AppCard';
import { Link, useNavigate } from 'react-router-dom';
import { sentTravels } from '../../../store/actions/TravelActions';
import AppLoader from '../../layouts/AppLoader';
import moment from 'moment';
import { Eye, EyeFill, Pen, PenFill, Trash, TrashFill } from 'react-bootstrap-icons';

const SentRequests = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // constants
  const headers = [
    'Sl. No',
    'Travel Id',
    'Requested To',
    'Status',
    'Vehicle Company',
    'From',
    'To',
    'Travel Date',
    'Actions',
  ];

  // selectors
  const { token } = useSelector(state => state.auth?.authDetails);
  const travels = useSelector(state => state.travel?.sentTravels);
  console.log('🚀 ~ file: Dashboard.js:27 ~ Dashboard ~ otherTravels:', travels);

  useEffect(() => {
    dispatch(sentTravels(token));
  }, []);

  return travels ? (
    <>
      <AppCard>
        <div className='d-flex justify-content-between'>
          <h4 className='mb-4 text-primary'>Requested travels</h4>
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
                    <td className='text-uppercase'>{travel?.travel?.travelId}</td>
                    <td className='text-capitalize'>{travel?.requestedTo?.name}</td>
                    <td className='text-capitalize'>{travel?.status}</td>
                    <td className='text-capitalize'>{travel?.travel?.vehicleMade}</td>
                    <td className='text-capitalize'>{travel?.travel?.from}</td>
                    <td className='text-capitalize'>{travel?.travel?.to}</td>
                    <td className='text-capitalize'>
                      {moment(travel?.travel?.travelDate).format('ll')}
                    </td>
                    <td className=''>
                      <Link
                        to={`/travel/request/requested/${travel?.travel?._id}`}
                        state={travel}
                        className='btn btn-secondary pt-0'
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

export default SentRequests;
