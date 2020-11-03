import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'reactstrap';
import './RandomPhoto.scss';
RandomPhoto.propTypes = {
  name: PropTypes.string,
  imgUrl: PropTypes.string,
  onImageUrlChange: PropTypes.func,
  onRandomButtonBlur: PropTypes.func,
};

RandomPhoto.defaultProps = {
  name: '',
  imgUrl: '',
  onImageUrlChange: null,
  onRandomButtonBlur: null
}

const getRandomImageUrl = () => {
  const randomId = Math.trunc(Math.random() * 2001);
  const randomImageUrl = `https://picsum.photos/id/${randomId}/300/300`
  return randomImageUrl;
}

function RandomPhoto(props) {
  const { name, imgUrl, onImageUrlChange, onRandomButtonBlur } = props;
  const handleRandomPhotoClick = async () => {
    if (onImageUrlChange) {
      const randomImageUrl = getRandomImageUrl();
      onImageUrlChange(randomImageUrl);
    }
  }
  return (
    <div className="random-photo">
      <div className="random-photo__button">
        <Button
          outline
          name={name}
          color="primary"
          onBlur={onRandomButtonBlur}
          onClick={handleRandomPhotoClick}
        >
          Random a photo
        </Button>
      </div>
      <div className="random-photo__image">
        {imgUrl && <img
          src={imgUrl}
          alt="Oops...not found. Please click try again"
          onError={handleRandomPhotoClick}
        />}
      </div>
    </div>
  );
}

export default RandomPhoto;