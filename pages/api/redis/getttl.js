import redis from '../../../lib/redis'

export default function getttl(req, res) {
  redis.ttl(req.body.key).then(data => {
    redis.expire(req.body.key, 86400)
    res.status(200).json(data)
  }).catch(err => {
    res.status(500).json({ err: err })
  })
}