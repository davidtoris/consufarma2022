import { dbConnection } from "../../../src/db/db";
import Speaker from "../../../src/Models/Courses";

export default async function handler (req, res) {
  switch (req.method) {
    case 'GET':
      return getSpeakers(req, res);
  
    default:
      return res.status(400).json({
        message: 'Bad request'
      })
  }
}

const getSpeakers = async (req = request, res = response) => {
  await dbConnection();
  const speakers = await Speaker.find()
  res.json({
      msg: 'Success',
      speakers,
  });
}