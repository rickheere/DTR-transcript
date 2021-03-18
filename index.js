const fetch = require('node-fetch');
const fs = require('fs');

const API_KEY = 'AIzaSyDCYCaVoRou29LFphUachM6a9MGfuSgqIo';

const SEARCH_BASE = 'https://youtube.googleapis.com/youtube/v3/search?';

const CHANNEL_ID = 'UCdB4FOm5eJNGxUoY4QqUoRQ';

const searchParams = {
  part: 'snippet',
  channelId: CHANNEL_ID,
  order: 'date',
  maxResults: 50,
  key: API_KEY,
};

let videos = [];

const getAllVideos = (pageToken) => {
  const searchUrl = new URL(SEARCH_BASE);
  searchUrl.search = new URLSearchParams({
    ...searchParams,
    ...(pageToken ? { pageToken } : {}),
  }).toString();

  fetch(searchUrl)
    .then((res) => res.json())
    .then((json) => {
      console.log(JSON.stringify(json, null, 2));
      videos = [...videos, ...json.items];

      if (json.nextPageToken) {
        getAllVideos(json.nextPageToken);
      } else {
        fs.writeFileSync(
          './videos.json',
          JSON.stringify(
            videos.reduce((output, { id: { videoId }, snippet: { title } }) => {
              return [...output, { title: title.replace(/\//, '-'), videoId }];
            }, []),
            null,
            2
          )
        );
      }
    })
    .catch((err) => {
      console.log('asd', err.errors);
    });
};

getAllVideos();
