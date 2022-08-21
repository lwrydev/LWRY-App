import Queue from "bull"

const queue = new Queue("emailQueue", process.env.REDIS_URL)

export default queue