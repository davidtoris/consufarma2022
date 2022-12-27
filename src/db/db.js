import mongoose from 'mongoose';
import { Speaker } from "../Models/Speaker";
import { Specialities } from "../Models/Specialities";

export const dbConnection = async () => {
  
  await mongoose.connect( process.env.MONGO_URL , [Speaker, Specialities],  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
    .then((resp) => console.log('ok'))
    .catch((err) => console.log(err, 'Error al conectar'))
}  
