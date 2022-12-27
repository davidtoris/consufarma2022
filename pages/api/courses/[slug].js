import { dbConnection } from "../../../src/db/db";
import Course from "../../../src/Models/Courses";


export default async function handler (req, res) {
  switch (req.method) {
    case 'GET':
      return oneCourse(req, res);
  
    default:
      return res.status(400).json({
        message: 'Bad request'
      })
  }
}

const oneCourse = async (req = request, res = response) => {

  await dbConnection();

  const { slug } = req.query;
  console.log(slug)

  const course = await Course.find({nombre_ruta: slug})
      .populate('especialidad_id', ['especialidad', 'especialidad_ruta'])
      .populate('ponente_uno_id')
      .populate('ponente_dos_id')
  
  res.json({
    msg: 'success',
    course,
  });
}