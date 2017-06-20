const clientId = 'xbNbV9X2x73kHAqADNhr5oJa3n72CBPt';
const userId = '4788130';//'839528';
const baseUrl = 'https://api.soundcloud.com';
const playlistId = '331992373';
const usersApi = `${baseUrl}/users/${userId}/tracks?client_id=${clientId}`;
const playlistsApi = `${baseUrl}/playlists/${playlistId}/tracks?client_id=${clientId}`;

export function fetchTracks() {
	return fetch(playlistsApi)
		.then(response => response.json())
		.then(json => json.map(track => {
			return {
				id: track.id,
				title: track.title,
				artist: track.user.username,
				artistId: track.user.id,
				artworkUrl: track.artwork_url,
				streamUrl: track.streamable ? `${track.stream_url}?client_id=${clientId}` : '',
				downloadUrl: track.downloadable ? `${track.download_url}?client_id=${clientId}` : '',
			}
		}))
		.catch(err => console.log('Error fetching data from Soundclound: ', err));
}

export function fetchPlaylistTracks() {

}