import mongoose, {Schema, model} from 'mongoose';

const courseSchema = new Schema({
  nombre : {
    type: String,
    required: true,
  },
  nombre_ruta: {
    type: String,
    required: true,
  },
  duracion: {
    type: String,
    required: true,
  },
  horario: {
    type: String,
    required: true,
  },
  imagen: {
    type: String,
    required: true,
  },
  fecha: {
    type: Date,
    required: true,
  },
  fecha_text: {
    type: String,
    required: true,
  },
  especialidad_id: {
    type: Schema.Types.ObjectId,
    ref: 'Specialities',
    required: true,
  },
  label: {
    type: String,
  },
  lugar: {
    type: String,
    required: true,
  },
  ubicacion: {
    type: String,
    required: true,
  },
  temario: {
    type: String,
    required: true,
  },
  precio: {
    type: String,
    required: true,
  },
  objetivo: {
    type: String,
    required: true,
  },
  ponente_uno_id: {
    type: Schema.Types.ObjectId,
    ref: 'Speaker',
  },
  ponente_dos_id: {
    type: Schema.Types.ObjectId,
    ref: 'Speaker',
  },
  pixeles: {
    type: String,
  },
  register: {
    type: String,
  },
})

export default mongoose.models.Course || model('Course', courseSchema);
