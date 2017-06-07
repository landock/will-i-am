const API_ENDPOINT = 'https://iamplus-service-cache-herokuapp-com.global.ssl.fastly.net/instagram/username/media/images'

export const fetchInstagram = () => {
  return new Promise((resolve, reject) => {
    fetch(API_ENDPOINT)
    .then((res) => {
      res.json()
        .then((json) => resolve(json))
        .catch((error) => reject(error))
    })
  });
};
