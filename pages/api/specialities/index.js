import { dbConnection } from "../../../src/db/db";
import Specialities from "../../../src/Models/Specialities";

export default async function handler (req, res) {
  switch (req.method) {
    case 'GET':
      return getSpecialities(req, res);
  
    default:
      return res.status(400).json({
        message: 'Bad request'
      })
  }
}

const getSpecialities = async (req = request, res = response) => {

  await dbConnection();
  
  const specialities = await Specialities.find()
    .sort('especialidad')

  res.json({
      msg: 'Success',
      specialities,
  });
}