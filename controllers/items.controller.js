import data from '../data/data.json';
import User from '../models/user.model';
import {Types} from 'mongoose';

class ItemController {
  async search(req, res) {
    const { name } = req.params;
    const regex = new RegExp("^" + name.toLowerCase(), "g");
    let search = data.filter(obj => regex.test(obj.Alimento.toLowerCase()));
    return res.send({ success: true, data: search });
  }

  async show(req, res) {
    const { id } = req.params;
    const user = await User.findById(id);
    const date = new Date;
    const dayWeek = date.getDay();
    return res.send({ success: true, data: user.consume[dayWeek] });
  }

  async add(req, res) {
    const { id } = req.params;
    const { name, quantity, weight, kcal } = req.body;
    const date = new Date;
    const dayWeek = date.getDay();

    const user = await User.findById(id);

    const stringDays = ['sunday', 'monday', 'tuesday', 'wednesday', ' thursday', 'friday', 'saturday'];

    const idOfItem = Types.ObjectId();

    const day = stringDays[dayWeek];

    const pathToPush = `consume.${day}.items`;
    const pathToSet = `consume.${day}.total`;

    const totalOfDay = user.consume[stringDays[dayWeek]].total;

    User.findByIdAndUpdate(id, {
      $set: {
        [pathToSet]: totalOfDay + kcal
      },

      $push: {
        [pathToPush]: { _id: idOfItem, name: name, quantity: quantity, weight: weight, kcal: kcal }
      }
    }, { new: true }, (err, data) => {
      if (err) return res.send({ success: false, message: "Ocorreu um erro durante a requisição!" });
      return res.send({ success: true, data: data });
    })

  }

  async delete(req, res) {
    const { id } = req.params;
    const { idOfItem } = req.body
    const date = new Date;
    const dayWeek = date.getDay();

    const user = await User.findById(id);

    const stringDays = ['sunday', 'monday', 'tuesday', 'wednesday', ' thursday', 'friday', 'saturday'];

    const day = stringDays[dayWeek];

    const pathToSet = `consume.${day}`;

    const totalOfDay = user.consume[stringDays[dayWeek]].total;

    const currentItem = user.consume[stringDays[dayWeek]].items.filter(el => {
      return el._id == idOfItem;
    })

    const x = user.consume[stringDays[dayWeek]].items.findIndex(el => el._id == idOfItem);

    const newarr = user.consume[stringDays[dayWeek]].items.splice(x, 1);

    User.findByIdAndUpdate(id, {
      $set: {
        [pathToSet]: {
          total: totalOfDay - currentItem[0].kcal,
          items: newarr
        }
      },
    }, { new: true,}, (err, data) => {
      if (err) return res.send({ success: false, message: "Ocorreu um erro durante a requisição!" });
      return res.send({ success: true, data: data });
    });
  }
}

export default new ItemController();