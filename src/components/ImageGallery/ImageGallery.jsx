import PropTypes from 'prop-types';
import { Gallery } from './ImageGallery.styled';
import {GalleryItem, GalleryItemImage} from './ImageGalleryItem.styled'



export const ImageGallery = ({ hits, showModal }) => {
  return (
    <Gallery>
      {hits && hits.map(({ id, webformatURL, largeImageURL, tags }) => (
            <GalleryItem key={id} onClick={() => showModal(largeImageURL)}>
              <GalleryItemImage src={webformatURL} alt={tags} />
            </GalleryItem>
          )
        )}
    </Gallery>
  );
};

ImageGallery.propTypes = {
   hits: PropTypes.array,
  showModal: PropTypes.func.isRequired,
};