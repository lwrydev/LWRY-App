import { verify } from 'jsonwebtoken'

export default async function checkExpire(req, res) {
  verify(req.body.token, process.env.SECRET_KEY, async (err, decoded) => {
    if (decoded) {
      res.status(200).json(decoded)
    } else {
      res.status(500).json(err)
    }
  })
}