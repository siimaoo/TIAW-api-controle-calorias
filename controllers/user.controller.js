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

  async logout(req, res) {
    return res.status(200).send({success: true, token: null});
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

        return res.send({success: true, token: token})
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

        return res.send({success: true, token: token});
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

    User.findOneAndUpdate(id, {
      $set: {
        height: height,
        weight: weight,
        imc: imc
      }
    }, (err, data) => {
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