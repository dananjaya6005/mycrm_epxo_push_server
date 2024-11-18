import express, { response } from 'express';
import axios from 'axios';
import { createClient } from '@supabase/supabase-js'


const router =  express.Router();
const url = 'https://exp.host/--/api/v2/push/send';

const supabase = createClient('https://yktmwnnuxbftenvcwnll.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlrdG13bm51eGJmdGVudmN3bmxsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTg5NzcyOTQsImV4cCI6MjAzNDU1MzI5NH0.wy-1sdekjnhJ9Gb-UYpsJM3lJpzvg5Y-E7VFvGAXg8c');


router.get('/api/cron-job', (req, res) => {
    return res.status(200).json({
        success: true,
        message: 'Cron job is running',
    });
});

router.post('/v1/push', async (req, res) => {

    const { title, body, leadID , fullName , phone , leadOrigin  } = req.body;
    const usernames = req.body.users.split(',');

    console.log('usernames', usernames );
    

    console.log('req.body', req.body);


    if (!title ||  usernames.length === 0) {
        return res.status(400).json({
            success: false,
            message: 'Check fileds again or  at least one user is required',
        });
    } else {
        //get tokens from supabase

       const { data, error } = await supabase.from('mycrm_expo_push_token').select('expo_token').in('user_name', usernames);
         console.log(data);



         data?.forEach(async (element) => {

            const expo_token = element.expo_token;

            const dataforNotification = {
                to: expo_token,
                title: title,
                body: body,
                data: { 
                    url : "/callNotify",
                    leadID : leadID,
                    fullName : fullName,
                    phone :  phone,
                    leadOrigin : leadOrigin,
                 },
              };



                    
            await axios.post(url, dataforNotification, {
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
    

         })



    }
    


    res.status(200).json({
        success: true,
        message: 'Notification sent successfully',
    });
});

export default router;