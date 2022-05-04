import redis from '../../../lib/redis'
import { v4 as uuidv4 } from 'uuid'
import { createCipheriv } from 'crypto'

export default async function create(req, res) {
  const uuid = await uuidv4()
  const algorithm = process.env.ALGORITHM;
  const initVector = Buffer.from(process.env.INIT_VECTOR, 'hex');
  const Securitykey = Buffer.from(process.env.SECRET_KEY, 'hex');
  const cipher = createCipheriv(algorithm, Securitykey, initVector);
  let encryptedData = cipher.update(req.body.password, "utf-8", "hex");
  encryptedData += cipher.final("hex");

  await redis.set(req.body.email, JSON.stringify({
    id: uuid,
    email: req.body.email,
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    password: encryptedData,
    email_verified: false,
    policy_acception: true,
    dateverfied: null,
    gg_auth_token: null,
    fb_auth_token: null,
    ap_auth_token: null,
    datecreate: new Date()
  }))
  await redis.expire(req.body.email, 86400)
  const data = await redis.get(req.body.email)
  res.status(200).json(JSON.parse(data))
}