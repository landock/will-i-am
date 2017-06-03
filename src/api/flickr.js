const API_KEY = 'cf074b37903b6dcd889ac7d18549e361';
const FLICKR_USER_ID = '155353158@N06';
const API_ENDPOINT = `https://api.flickr.com/services/rest/?method=flickr.people.getPhotos&api_key=${API_KEY}&user_id=${FLICKR_USER_ID}&format=json&nojsoncallback=1`;

export const fetchImages = () => {
  return fetch(API_ENDPOINT).then(function (response) {
    return response.json().then(function (json) {
      return json.photos.photo.map(
        ({farm, server, id, secret}) => `https://farm${farm}.staticflickr.com/${server}/${id}_${secret}.jpg`
      );
    })
  })
};
