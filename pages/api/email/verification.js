import request from "request-promise"
import { sign } from 'jsonwebtoken'
import Queue from "bull"

export default async function send(req, res) {
  console.log(req.body);
  const queue = new Queue("emailQueue", process.env.REDIS_URL)
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
            "Content": '<p style="max-width: 420px;">สวัสดี, คุณ ' + req.body.firstname + '<br><br>คุณได้ทำการลงทะเบียนเพื่อใช้บริการเกี่ยวกับการรับปรึกษาทางกฎหมาย ของ lawlivery เมื่อ' + req.body.date + ' น.<br>กรุณกดปุ่ม "ยืนยัน" ด้านล่างภายใน 24 ชั่วโมง เพื่อทำการยืนยัน email ของท่าน</p><br><br>' + '<div style="display: flex;justify-content: space-around;"><a style="background: #0A66E2;border-radius: 13px;padding: 10px 60px;text-align: center;color: #FFFFFF;text-decoration: none;font-size: 16px;" href="' + process.env.ENDPOINT + '/verification/?token=' + token + '" target="_blank"' + '>ยืนยัน</a></div><br><br><p>Best regards, Lawlivery</p>',
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
  const main = async () => {
    await queue.add({ token: token, options: options });
  }
  queue.process((job, done) => {
    request(job.data.options).then(() => {
      console.log('Send email verification success, ' + req.body.firstname + ' ' + req.body.lastname);
    })
    done();
  })
  res.status(200).json({ body: "success" })

  main().catch(console.error)
}