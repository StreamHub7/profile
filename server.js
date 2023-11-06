const axios = require('axios');
const express = require('express');
const dotenv = require('dotenv');
dotenv.config();
const app = express();
const port = process.env.PORT || 5001;
const cron = require('node-cron');
let playbackId = 1540025276;

// Function to increment playback ID and reset it at the end of each day.
async function updatePlaybackId() {
  playbackId += 3;
  console.log(`Playback ID incremented to ${playbackId}`);
}

// Schedule the task to run at the end of the day.
cron.schedule('0 0 * * *', () => {
  // This will run every day at midnight (0:00).
  updatePlaybackId();
});

// Start the cron job.
console.log('Auto-increment playback ID job is running...'+playbackId);


async function fetchDataAndStore(lang, playbackId) {
  try {
    const reqPayload = {
      "os_name": "Windows",
      "os_version": "10",
      "app_version": "23.10.20.4",
      "platform_version": "119",
      "client_capabilities": {
        "ads": ["non_ssai"],
        "audio_channel": ["stereo"],
        "container": ["ts"],
        "dvr": ["short"],
        "dynamic_range": ["sdr"],
        "encryption": ["plain"],
        "ladder": ["web", "tv", "phone"],
        "package": ["hls"],
        "resolution": ["hd"],
        "video_codec": ["h265", "h264"],
        "true_resolution": ["hd"]
      },
      "language": lang,
      "resolution": "auto"
    }

    const userToken = process.env.USER_TOKEN;
    const reqId = process.env.REQUEST_ID;
        const response = await axios.post(`https://www.hotstar.com/play/v5/playback/content/${playbackId}`, JSON.stringify(reqPayload),{
            headers:{
                "X-Hs-Request-Id": reqId,
                "Content-Type": "application/json",
                "X-Hs-Client": "platform:web;browser:Chrome",
                "X-Hs-Usertoken": userToken,
                "X-Hs-Platform": "web",
            }
        })

    if(response.status === 200) {
      const streamUrl = response.data.data.playback_sets[0].playback_url;
      return streamUrl;
    } else {
      console.error('Error storing data:', response.statusText);
    }
  } catch (error) {
    console.error('Error fetching or storing data:', error);
  }
}

app.post('/api/data', async (req, res) => {
  try {
    const data = await fetchDataAndStore(req.query.lang,req.query.playbackId);
    res.json({playback_id: req.query.playbackId, stream_url: data});
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ error: 'Failed to fetch data' });
  }
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
})