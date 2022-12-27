import { dbConnection } from "../../../src/db/db";
import Course from "../../../src/Models/Courses";
import slugify from 'slugify';

export default async function handler (req, res) {
  switch (req.method) {
    case 'GET':
      return getCourse(req, res);
    
    case 'POST':
      return coursesPost(req, res);
  
    default:
      return res.status(400).json({
        message: 'Bad request'
      })
  }
}

const getCourse = async (req = request, res = response) => {

  await dbConnection();

  const { sortBy } = req.query;
  
  const courses = await Course.find()
    .select('nombre nombre_ruta duracion horario imagen fecha fecha_text especialidad_id label ponente_uno_id -_id')
    .populate('ponente_uno_id', ['ponente'])
    .populate('especialidad_id', ['especialidad', 'especialidad_ruta'])
    .sort(sortBy)
    .lean()

  res.json({
      courses,
  });
}


const coursesPost = async (req, res = response) => {

    const body = req.body;
    const {nombre} = req.body;
    const data = {
        ...body,
        nombre_ruta: slugify(nombre).toLowerCase(),
    }
    const courses = new Course(data);

    await courses.save();

    res.json({
        msg: 'success',
        courses,
    });
}