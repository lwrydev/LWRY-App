import redis from '../../../lib/redis'

export default async function delete_bykey(req, res) {
  redis.del(req.body.key).then(() => {
    res.status(200).json({ body: 'delete success.' })
  }).catch(err => {
    res.status(501).json({ body: err })
  })
}