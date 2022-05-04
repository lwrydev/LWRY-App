import redis from '../../../lib/redis'
import { compare } from 'bcrypt'

export default async function check(req, res) {
  redis.get(req.body.email).then(data => {
    console.log(JSON.parse(data).password);
    if (data) {
      compare(req.body.password, JSON.parse(data).password).then(valid => {
        if (valid) {
          res.status(200).json(data)
        } else {
          res.status(511).json({ err: 'password incorrect' })
        }
      })
    } else {
      res.status(500).json({ err: 'no data' })
    }
  }).catch(err => {
    res.status(500).json(err)
  })
}