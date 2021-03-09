# DTR-transcript

## How to use

Lets first download the code and install the dependencies.

### Download an install dependencies.
1. `> git clone [this repository]`
2. `> cd DTR-transcript`
3. `> yarn install` or `npm install`


### Get yourself an API key
1. Go to and get a API key: https://console.cloud.google.com/project/_/apiui/credential

2. In index.js on line 4 replace GET_YOUR_KEY with the API key

### Run the code
To get the transcripts first we need to get all the video id's that will be used to visit the video pages. 

run: 
`> node index.js`

This will creat a videos.json file in the root of the project. Now we can start the transcript downloader:

`> yarn cypress open` or `npx cypress open`

Now all the transcript will be downloaded an saved in the ./transcripts dir. Videos that already have downloaded a downloaded transcript will be skipped  