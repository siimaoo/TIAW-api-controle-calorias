import Recipe from '../models/recipe.model';

class RecipeController {
  show(req, res) {
    const recipe = Recipe.find();
    return res.json(recipe);
  }

  store(req, res) {
    Recipe.remove({}, (err, data) => {
      if (err) return res.send({success: false, message: 'Ocorreu um erro durante a requisição'});
      Recipe.create(req.body, (err, data) => {
        if (err) return res.send({success: false, message: 'Ocorreu um erro durante a requisição'});
        return res.send({success: true, message: 'Receita adicionada com sucesso!'})
      })
    })
  }
}

export default new RecipeController();