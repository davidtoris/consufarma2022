import mongoose, {Schema, model} from 'mongoose';

const specialitieSchema = Schema({

  especialidad : {
    type: String,
    required: true,
  },

  especialidad_ruta : {
    type: String,
    required: true,
  },
})

export default mongoose.models.Specialitie || model('Specialitie', specialitieSchema);