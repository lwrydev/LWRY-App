import request from "request-promise"
import queue from '../../../lib/emailQueue'

export default async function resetPassword(req, res) {
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
            "Content": '<p style="max-width: 420px;">' + 
                          'สวัสดี, คุณ ' + req.body.firstname + 
                          '<br><br>คุณเพิ่งทำการร้องขอการตั้งรหัสผ่านใหม่ของคุณ ใช้โค้ด 6 หลักสำหรับการตั้งรหัสผ่านใหม่ ภายใน 15 นาที' + 
                        '</p>' + 
                        '<br><br>' + 
                        '<div style="background: #F5F5F5;border-radius: 5px;padding: 10px;">' + 
                          '<div style="font-size: 12px;text-align: center;letter-spacing: 0.36px;color: #406EAC;">Verification code</div>' +
                          '<div style="font-size: 34px;font-weight: bold;text-align: center;letter-spacing: 12px;color: #406EAC;">' + req.body.code + '</div>' +
                        '</div>' + 
                        '<br><br>' + 
                        '<p>Best regards, Lawlivery</p>',
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
    await queue.add({ email: req.body.email, options: options });
  }
  queue.process((job, done) => {
    request(job.data.options).then(() => {
      console.log('Send email reset password, ' + req.body.firstname + ' ' + req.body.lastname);
    })
    done();
  })
  res.status(200).json({ body: "success" })

  main().catch(console.error)
}