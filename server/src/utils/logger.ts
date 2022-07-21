import pino from "pino"
import pretty from "pino-pretty"
import moment from "moment"

const stream = pretty({
    colorize: true,
    ignore: 'pid,hostname',
    customPrettifiers: {
        time: timestamp => `[ ${moment(timestamp).format('YYYY-MM-DD HH:mm')} ]`
    }
  })

const logger = pino(stream);

export default logger;