import expres from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import routes from './routes/router';


const app = expres();
app.use(expres.json());
dotenv.config();
app.use(cors());

app.use('/api', routes);

app.get('/', (req, res) => {
    res.send('Hello World');
});

app.listen(3000 , ()=>{
    console.log('Server is running on port 3000');
});