import jwt from 'jsonwebtoken';

export function verifyAuth(req, res, next) {
  const token = req.headers['x-access-token'];
  if (!token) return res.status(401).send({success: false, message: 'Token invalido ou não enviado na requisição!'});

  jwt.verify(token, process.env.SECRET, (err, decoded) => {
    if (err) return res.status(500).send({success: false, message: 'Falha ao autenticar o token!'});
    if (decoded.id != req.params.id) return res.send({success: false, message: "Você não possui autorização!"});
    
    next();
  })
}