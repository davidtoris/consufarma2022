import mongoose, {Schema, model} from 'mongoose';

const speakerSchema = Schema({

  ponente : {
    type: String,
    required: true,
  },
  
  ponente_cv : {
    type: String,
    required: true,
  },

  ponente_img : {
    type: String,
  },
})

module.exports = mongoose.models.Speaker || model('Speaker', speakerSchema);
