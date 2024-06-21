import express from 'express';
import axios from 'axios';

const router =  express.Router();
const url = 'https://exp.host/--/api/v2/push/send';



router.get('/api/cron-job', (req, res) => {
    return res.status(200).json({
        success: true,
        message: 'Cron job is running',
    });
});

router.post('/v1/push', (req, res) => {

    const {username} = req.body;
    const {expo_token} = req.body;

    console.log('username', username);
    console.log('expo_token', expo_token);

    if (!username || !expo_token) {
        return res.status(400).json({
            success: false,
            message: 'Username and expo_token are required',
        });
    }
    //sent to expo offcial server

    const data = {
        to: expo_token,
        title: 'hello 2 world',
        body: 'world',
      };

    axios.post(url, data, {
        headers: {
            Accept: 'application/json',
            'Accept-encoding': 'gzip, deflate',
            'Content-Type': 'application/json',
        },
    }).then((response) => {
        console.log('response', response.data);
        }
    ).catch((error) => {
        console.log('error', error);
     }
    );


    res.status(200).json({
        success: true,
        message: 'Notification sent successfully',
    });
});

export default router;