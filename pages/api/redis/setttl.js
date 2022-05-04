import redis from '../../../lib/redis'

export default function setttl(req, res) {
  redis.expire(req.body.key, 86400).then(data => {
    res.status(200).json(data)
  }).catch(err => {
    res.status(500).json({ err: err })
  })
}