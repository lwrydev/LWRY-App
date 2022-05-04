import redis from '../../../lib/redis'

export default async function getByKey(req, res) {
  redis.get(req.body.key).then(data => {
    if (data) {
      res.status(200).json(JSON.parse(data))
    } else {
      res.status(203).json({ err: 'Not exist.' })
    }
  }).catch(err => {
    res.status(500).json({ err: err })
  })
}