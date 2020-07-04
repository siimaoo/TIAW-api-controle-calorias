import { Schema, model } from 'mongoose';

const RecipeSchema = new Schema({
  recipe: {
    type: String,
    required: true
  },
});

export default model("Recipe", RecipeSchema);