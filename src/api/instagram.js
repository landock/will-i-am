const API_ENDPOINT = 'https://iamplus-service-cache-herokuapp-com.global.ssl.fastly.net/instagram/users/iamwill/media'

export const fetchInstagram = () => {
  return(
    fetch(API_ENDPOINT).then(function(response){
      return response.json();
    }).then(function(json){
      return json;
    }).catch(function(err){
      console.log("error");
      console.log( err );
    })
  );
};
