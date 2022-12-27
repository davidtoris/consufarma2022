import { dbConnection } from "../../../src/db/db";
import Course from "../../../src/Models/Courses";

export default async function handler (req, res) {
  switch (req.method) {
    case 'GET':
      return coursesFind(req, res);
    
    default:
      return res.status(400).json({
        message: 'Bad request'
      })
  }
}

const coursesFind = async (req = request, res = response) => {

  const {value} = req.query;

  function escapeRegex(text) {
      return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");

  };

  const regex = new RegExp(escapeRegex(value), '');
  await dbConnection();
  const coursesFinded = await Course.find({"nombre_ruta": regex})
      .populate('ponente_uno_id')
  res.json({
      msg: 'Success',
      coursesFinded,
  });
}