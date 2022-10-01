import redis from '../../../lib/redis'

export default async function create_bykey(req, res) {
  redis.set(req.body.key, JSON.stringify(req.body.value)).then(() => {
    redis.expire(req.body.key, 86400)
    res.status(200).json({ body: 'create success.' })
  }).catch(err => {
    res.status(501).json({ err: err })
  })
}