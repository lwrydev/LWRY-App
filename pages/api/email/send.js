import request from "request-promise"
import { sign } from 'jsonwebtoken'

export default async function send(req, res) {
  const token = await sign({ email: req.body.email, uuid: req.body.id }, process.env.SECRET_KEY)
  const options = {
    method: 'POST',
    uri: 'https://api.elasticemail.com/v4/emails',
    body: {
      "Recipients": [
        {
          "Email": req.body.email
        }
      ],
      "Content": {
        "Body": [
          {
            "ContentType": "HTML",
            "Content": "<p>Hi " + req.body.firstname + ",<br><br>Follow this link to verify your email address.</p>" + process.env.ENDPOINT + "/verification/?token=" + token,
            "Charset": "string"
          }
        ],
        "From": "noreply <lwry.dev@gmail.com>",
        "Subject": "Verify your email for Lawlivery-App",
        "Utm": {
          "Source": "string",
          "Medium": "string",
          "Campaign": "string",
          "Content": "string"
        }
      }
    },
    json: true,
    headers: {
      'Content-Type': 'application/json',
      'X-ElasticEmail-ApiKey': process.env.ELS_MAIL_API_KEY
    }
  }
  request(options).then(function (response) {
    res.status(200).json({ body: response })
  }).catch(function (err) {
    res.status(500).json({ body: err })
  })
}