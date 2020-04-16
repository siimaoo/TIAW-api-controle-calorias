import data from '../data/data.json';

class ItemController {
  async search(req, res) {
    const { name } = req.params;
    const regex = new RegExp("^"+name.toLowerCase(), "g");
    let search = data.filter(obj => regex.test(obj.Alimento.toLowerCase()));
    return res.send({success: true, data: search});
  }
}

export default new ItemController();