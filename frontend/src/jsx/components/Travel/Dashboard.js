import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AppCard from '../../layouts/AppCard';
import { Link, useNavigate } from 'react-router-dom';
import { createTravel, otherTravels } from '../../../store/actions/TravelActions';
import AppLoader from '../../layouts/AppLoader';
import moment from 'moment';
import { EyeFill } from 'react-bootstrap-icons';

const Dashboard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // constants
  const headers = [
    'Sl. No',
    'Travel Id',
    'Traveler',
    'Vehicle Company',
    'From',
    'To',
    'Via',
    'Travel Date',
    'Travel Time',
    'Setter',
    'Actions',
  ];

  // selectors
  const { token } = useSelector(state => state.auth?.authDetails);
  const travels = useSelector(state => state.travel?.otherTravels);
  console.log('🚀 ~ file: Dashboard.js:27 ~ Dashboard ~ otherTravels:', travels);

  useEffect(() => {
    dispatch(otherTravels(token));
  }, []);

  return travels ? (
    <>
      <AppCard>
        <h4 className='mb-4 text-primary'>Travel Available</h4>

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
                    <td className='text-capitalize'>{travel?.createdBy?.name}</td>
                    <td className='text-capitalize'>{travel?.vehicleMade}</td>
                    <td className='text-capitalize'>{travel?.from}</td>
                    <td className='text-capitalize'>{travel?.to}</td>
                    <td className='text-capitalize'>{travel?.via || '-'}</td>
                    <td className='text-capitalize'>{moment(travel?.travelDate).format('ll')}</td>
                    <td className=''>{`${travel?.travelTime?.from} to ${travel?.travelTime?.to}`}</td>
                    <td className=''>{`${travel?.setter}`}</td>
                    <td className=''>
                      <Link to={`/travel/request/${travel?._id}`} className='btn btn-primary pt-0'>
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
