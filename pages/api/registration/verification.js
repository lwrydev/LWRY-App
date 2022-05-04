import redis from '../../../lib/redis'
import { createDecipheriv } from 'crypto'

export default async function verification(req, res) {
  redis.get(req.body.email).then(data => {
    const algorithm = process.env.ALGORITHM;
    const initVector = Buffer.from(process.env.INIT_VECTOR, 'hex');
    const Securitykey = Buffer.from(process.env.SECRET_KEY, 'hex');
    const decipher = createDecipheriv(algorithm, Securitykey, initVector);
    let decryptedData = decipher.update(JSON.parse(data).password, "hex", "utf-8");
    decryptedData += decipher.final("utf8");
    res.status(200).json({ user: JSON.parse(data), pw: decryptedData })
  }).catch(err => {
    res.status(500).json(err)
  })
}