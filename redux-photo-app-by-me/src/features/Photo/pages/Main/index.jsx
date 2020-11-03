import React from 'react';
import PropTypes from 'prop-types';
import { Container } from 'reactstrap';
import { Link, useHistory } from 'react-router-dom';
import Banner from 'components/Banner';
import { Images } from 'contants/images';
import { useSelector, useDispatch } from 'react-redux';
import PhotoList from 'features/Photo/components/PhotoList';
import { removePhoto } from 'features/Photo/photoSlice';

MainPage.propTypes = {

};

function MainPage(props) {
  const photos = useSelector(state => state.photos);
  const dispatch = useDispatch();
  const history = useHistory();
  console.log('List of photo', photos);
  const handlePhotoEditClick = (photo) => {
    history.push(`/photos/${photo.id}`);
  }

  const handlePhotoRemoveClick = (photo) => {
    const removePhotoId = photo.id;
    console.log(removePhotoId);
    const action = removePhoto(photo);
    console.log({ action });
    dispatch(action);
  }

  return (
    <div className="photo-main">
      <Banner
        title="Hi! Your awesome photos"
        backgroundUrl={Images.PINK_BG}
      />

      <Container className="text-center">
        <div className="py-5">
          <Link to="/photos/add">
            Add new photo
        </Link>
        </div>
        <PhotoList
          photoList={photos}
          onPhotoEditClick={handlePhotoEditClick}
          onPhotoRemoveClick={handlePhotoRemoveClick}
        />
      </Container>
    </div>
  );
}

export default MainPage;