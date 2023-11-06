const axios = require('axios');
const express = require('express');
const app = express();
const port = 3000;
const cron = require('node-cron');

let playbackId = 1540025274;

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

// cron.schedule('*/15 * * * * *', () => {
//   updatePlaybackId();
// });

// Start the cron job.
console.log('Auto-increment playback ID job is running...'+playbackId);


async function fetchDataAndStore(lang) {
  try {
    const reqPayload = {"os_name":"Windows","os_version":"10","app_version":"23.10.20.4","platform_version":"119","client_capabilities":{"ads":["non_ssai"],"audio_channel":["stereo"],"container":["fmp4","fmp4br","ts"],"dvr":["short"],"dynamic_range":["sdr"],"encryption":["widevine","plain"],"ladder":["web","tv","phone"],"package":["dash","hls"],"resolution":["sd","hd"],"video_codec":["h265","h264"],"true_resolution":["sd","hd","fhd"]},"drm_parameters":{"hdcp_version":["HDCP_V2_2"],"widevine_security_level":["SW_SECURE_DECODE"]},"language":lang,"resolution":"auto"};
  
        const response = await axios.post(`https://www.hotstar.com/play/v5/playback/content/${playbackId}`, JSON.stringify(reqPayload),{
            headers:{
                "X-Hs-Request-Id": "69f86d-7aad11-305429-8ee485",
                "Content-Type": "application/json",
                "X-Hs-Client": "platform:web;browser:Chrome",
                "X-Hs-Usertoken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcHBJZCI6IiIsImF1ZCI6InVtX2FjY2VzcyIsImV4cCI6MTY5OTI4NjAyMywiaWF0IjoxNjk5MTk5NjIzLCJpc3MiOiJUUyIsImp0aSI6IjU4ODAzODI3NWViZjRmNGRhOTcwYmFiZGQwMjgwNThkIiwic3ViIjoie1wiaElkXCI6XCJhY258NjQyMzkyMjM1OTM4MDY3XCIsXCJwSWRcIjpcIjMzNGRhYmM5Y2Q1MzRkZWM4NGNiMTVlNGNhMjA3NTI3XCIsXCJuYW1lXCI6XCJJcm9uIE1hblwiLFwiZW1haWxcIjpcInJhd2FmYUBpbWFpbDgubmV0XCIsXCJwaG9uZVwiOlwiNjMwNzAzNjgyNlwiLFwiZXh0QXV0aElkXCI6XCI2NDIzOTIyMzU5MzgwNjdcIixcImlwXCI6XCI0NS4xMTguMTU5LjIzOVwiLFwiY291bnRyeUNvZGVcIjpcImluXCIsXCJjdXN0b21lclR5cGVcIjpcIm51XCIsXCJ0eXBlXCI6XCJwaG9uZVwiLFwiaXNFbWFpbFZlcmlmaWVkXCI6ZmFsc2UsXCJpc1Bob25lVmVyaWZpZWRcIjp0cnVlLFwiZGV2aWNlSWRcIjpcIjczM2VhOC0zZTg4NDktOGUyMjhmLTQ5ZWFkZlwiLFwicHJvZmlsZVwiOlwiQURVTFRcIixcInZlcnNpb25cIjpcInYyXCIsXCJzdWJzY3JpcHRpb25zXCI6e1wiaW5cIjp7XCJIb3RzdGFyU3VwZXJcIjp7XCJzdGF0dXNcIjpcIlNcIixcImV4cGlyeVwiOlwiMjAyNC0wMS0wNVQyMDoxMDo1My4wMDBaXCIsXCJzaG93QWRzXCI6XCIxXCIsXCJjbnRcIjpcIjFcIn19fSxcImVudFwiOlwiQ3JVQkNnVUtBd29CQlJLckFSSUhZVzVrY205cFpCSURhVzl6RWdOM1pXSVNDV0Z1WkhKdmFXUjBkaElHWm1seVpYUjJFZ2RoY0hCc1pYUjJFZ1J0ZDJWaUVnZDBhWHBsYm5SMkVnVjNaV0p2Y3hJR2FtbHZjM1JpRWdSeWIydDFFZ2RxYVc4dGJIbG1FZ3BqYUhKdmJXVmpZWE4wRWdSMGRtOXpFZ1J3WTNSMkVnTnFhVzhhQW5Oa0dnSm9aQm9EWm1oa0lnTnpaSElxQm5OMFpYSmxieW9JWkc5c1luazFMakVxQ21SdmJHSjVRWFJ0YjNOWUFRb05FZ3NJQWpnQ1FBRlF1QWhZQVFvaUNob0tEaElGTlRVNE16WVNCVFkwTURRNUNnZ2lCbVpwY21WMGRoSUVPR1JZQVFySUFRb0ZDZ01LQVFBU3ZnRVNCMkZ1WkhKdmFXUVNBMmx2Y3hJRGQyVmlFZ2xoYm1SeWIybGtkSFlTQm1acGNtVjBkaElIWVhCd2JHVjBkaElFYlhkbFloSUhkR2w2Wlc1MGRoSUZkMlZpYjNNU0JtcHBiM04wWWhJRWNtOXJkUklIYW1sdkxXeDVaaElLWTJoeWIyMWxZMkZ6ZEJJRWRIWnZjeElFY0dOMGRoSURhbWx2RWdSNFltOTRFZ3R3YkdGNWMzUmhkR2x2YmhvQ2MyUWFBbWhrR2dObWFHUWlBM05rY2lvR2MzUmxjbVZ2S2doa2IyeGllVFV1TVNvS1pHOXNZbmxCZEcxdmMxZ0JFbllJQVJESStmL1p6VEVhUUFvWVNHOTBjM1JoY2xOMWNHVnlMa2xPTGxsbFlYSXVPRGs1RWd4SWIzUnpkR0Z5VTNWd1pYSWFCRk5sYkdZZ3lLRzduTmd3S01qNS85bk5NVEFIT0FFb0FUQUJPaVVLSVVodmRITjBZWEpUZFhCbGNpNUJaSE5HY21WbExrbE9MbGxsWVhJdU1UQTVPUkFCXCIsXCJpc3N1ZWRBdFwiOjE2OTkxOTk2MjMwMjgsXCJtYXR1cml0eUxldmVsXCI6XCJBXCIsXCJpbWdcIjpcIjVcIixcImRwaWRcIjpcIjY0MjM5MjIzNTkzODA2N1wiLFwic3RcIjoxLFwiZGF0YVwiOlwiQ2dRSUFCSUFDZ1FJQURvQUNnUUlBRElBQ2dRSUFFSUFDaElJQUNJT2dBRVhpQUVCa0FINHZJVGQ4Q29LL2dFSUFDcjVBUXBOQ2dBU0xnb0RhR2x1R2hFSUFSSUhZM0pwWTJ0bGRCakMvSjJxQmhvVUNBSVNDbVJwYzI1bGVYQnNkWE1ZNTZDcXFBWVNHUW9EWlc1bkdoSVNDakV5TmpBd09URXlOekFZMU9UV3B3WUtFUW9DQ0FJU0JRb0RaVzVuR1BMcGk2b0dDbThLQndnQkZRQUFBRUFTQ2dvRGJXRnlKUmZGS0RvU0Nnb0RZbVZ1SlUwNGdEb1NDZ29EZEdGdEpVUXVCanNTQ2dvRGRHVnNKVStwT0RzU0Nnb0RiV0ZzSmJsYzl6a1NDZ29EYUdsdUpVSjhTejhTQ2dvRFpXNW5KYm5LU2o0U0Nnb0RhMkZ1SlY3dUR6a1k4dW1McWdZS0VRb0NDQU1TQlFvRGFHbHVHUExwaTZvR0NoRUtBZ2dFRWdVS0EyaHBiaGpDL0oycUJnPT1cIn0iLCJ2ZXJzaW9uIjoiMV8wIn0.MfB_Upqc-YLS4byEr9NWs-nn0ccWKsxUNTI_oFdwmxw"
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

app.get('/api/data', async (req, res) => {
  try {
    const data = await fetchDataAndStore(req.query.lang);
    res.json({playback_id: playbackId, stream_url:data});
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ error: 'Failed to fetch data' });
  }
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
})