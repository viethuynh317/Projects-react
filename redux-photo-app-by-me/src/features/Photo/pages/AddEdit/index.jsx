import React from 'react';
import PropTypes from 'prop-types';

import './style.scss';
import Banner from 'components/Banner';
import PhotoForm from 'features/Photo/components/PhotoForm';
import { addPhoto, editPhoto } from 'features/Photo/photoSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
AddEditPage.propTypes = {

};

function AddEditPage(props) {
  const dispatch = useDispatch();
  const history = useHistory();
  const { photoId } = useParams();
  const isAddMode = !photoId;
  const photos = useSelector(state => state.photos);
  console.log('ok con ga den', photos);
  const editedPhoto = photos.find(photo => photo.id === parseInt(photoId));
  const initialValues =
    isAddMode ? {
      title: '',
      categoryId: null,
      photo: ''
    } : editedPhoto;
  const handleSubmit = (values) => {
    console.log('Form values: ', values);
    setTimeout(() => {
      if (isAddMode) {
        const newPhoto = {
          id: Math.trunc(Math.random() * 1000),
          ...values
        }
        const action = addPhoto(newPhoto);
        dispatch(action);
      } else {
        const action = editPhoto(values);
        dispatch(action);
      }
      history.push('/photos');
    }, 2000);
  }
  return (
    <div className="photo-edit">
      <Banner title="Pick your amazing photo" />
      <div className="photo-edit__form">
        <PhotoForm
          onSubmit={handleSubmit}
          isAddMode={isAddMode}
          initialValues={initialValues}
        />
      </div>
    </div>
  );
}

export default AddEditPage;