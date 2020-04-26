import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import User from '../models/user.model';
import dotenv from 'dotenv';

dotenv.config({path: '../config/.env'});

class UserController {
  async show(req, res) {
    const {id} = req.params;
    const user = await User.findById(id);

    return res.json(user);
  }

  async rank(req, res) {
    const users = await User.find({}).sort({positiveWeeks: 1}).limit(10).select(['name', 'lastName', 'positiveWeeks']);
    return res.json(users);
  }

  async login(req, res) {
    const {email, password} = req.body;

    User.findOne({email: email}, (err, data) => {
      if(err) return res.send({success: false, message: "Ocorreu um erro durante a requisição!"});
      if (!data) return res.send({success: false, message: "Usuario não encontrado!"});

      bcrypt.compare(password, data.password, (err, same) => {
        if (!same) return res.send({success: false, message: "Usuario ou senha incorretos!"});
        data.password = undefined;
       
        const id = data.id;

        const token = jwt.sign({ id }, process.env.SECRET, {
          expiresIn: '7d'
        });

        return res.send({success: true, token: token, id: id})
      });
    }).select('+password');
  }

  async create(req, res) {
    const {name, lastName, email, password, rePassword} = req.body;

    User.findOne({email: email}, (err, data) => {
      if(err) return res.send({success: false, message: "Ocorreu um erro durante a requisição!"});
      if (data) return res.send({success: false, message: "Usuario já registrado!"});

      User.create(req.body, (err, data) => {
        if (err) return res.send({success: false, message: "Ocorreu um erro ao criar o usuario!"});
        data.password = undefined;

        const id = data.id;

        const token = jwt.sign({ id }, process.env.SECRET, {
          expiresIn: '7d'
        });

        return res.send({success: true, token: token, id: id});
      })
    });
  }

  async update(req, res) {
    const {id} = req.params;
    const {name, lastName, email, password, rePassword} = req.body;
  }

  async updateImc(req, res) {
    const {id} = req.params;
    const {height, weight} = req.body;
    const imc = weight/(height**2);

    let kcal = 0;

    if (imc > 24.9) {
      kcal = 20;  
    } else if (imc < 18.5) {
      kcal = 30;
    } else {
      kcal = 25;
    }

    const recomendedKcal = weight * kcal;

    await User.findByIdAndUpdate(id, {
      $set: {
        height: height,
        weight: weight,
        imc: imc,
        recomendedKcal: recomendedKcal
      }
    }, {new: true}, (err, data) => {
      if (err) return res.send({success: false, message: "Ocorreu um erro durante a requisição!"});
      return res.send({success: true, data: data});
    })
  }

  async destroy(req, res) {
    const {id} = req.params;

    User.findOneAndRemove(id, (err, data) => {
      if (err) return res.send({success: false, message: "Ocorreu um erro durante a requisição!"});
      return res.send({success: true, message: "Conta apagada com sucesso!"});
    });
  }
}

export default new UserController();