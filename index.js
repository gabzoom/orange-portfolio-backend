import express from 'express';
import connectDatabase from './src/database/db.js';
import userRouter from './src/routes/user.route.js';
import dotenv from 'dotenv';
import { getAuth} from 'firebase/auth';
import User from './src/models/User.js';
import bodyParser from 'body-parser';


dotenv.config();
const app = express();
connectDatabase();

const port = 3000;

app.use('/users', userRouter);
app.use(express.json());

app.post('/salvarDados', async (req,res) =>{
    try{
        const userProfiles = req.body.userProfiles;

        res.status(200).json({message: 'dados salvos'})
    }
    catch (err){
        console.log(err);
        res.status(500).json({error: 'erro ao salvar'})
    }
});



app.listen(port, () => console.log(`Server started on port ${port}`));