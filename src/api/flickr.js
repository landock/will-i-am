const API_KEY = 'cf074b37903b6dcd889ac7d18549e361';
const FLICKR_USER_ID = '155353158@N06';
const API_ENDPOINT = `https://api.flickr.com/services/rest/?method=flickr.people.getPhotos&api_key=${API_KEY}&user_id=${FLICKR_USER_ID}&extras=media&format=json&nojsoncallback=1`;

export const fetchImages = () => fetch(API_ENDPOINT)
  .then(response => response.json()
  .then((json) => {
    const mediaUrls = [];

    json.photos.photo.forEach(({ farm, server, id, secret, media }) => {
      if (media === 'photo') {
        mediaUrls.push({
          type: 'photo',
          url: `https://farm${farm}.staticflickr.com/${server}/${id}_${secret}.jpg`,
        });
      } else {
        mediaUrls.push({
          type: 'video',
          url: `https://farm${farm}.staticflickr.com/${server}/${id}_${secret}.jpg`,
          videoUrl: `https://www.flickr.com/photos/${FLICKR_USER_ID}/${id}/play/site/${secret}/`,
        });
      }
    });
    console.log(mediaUrls);
    return mediaUrls;
  },
));
