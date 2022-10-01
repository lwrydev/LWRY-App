import redis from '../../../lib/redis'

export default async function checkcode(req, res) {
  redis.get(req.body.email).then(data => {
    if (data) {
      res.status(200).json(JSON.parse(JSON.parse(data) == req.body.code))
    } else {
      res.status(203).json({ err: 'Not exist.' })
    }
  }).catch(err => {
    res.status(500).json({ err: err })
  })
}