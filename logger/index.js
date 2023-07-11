const pino = require('pino');
const pinohttp = require('pino-http');
const { get } = require("express-http-context");
const multistream = require('pino-multi-stream').multistream;
const { existsSync, mkdirSync } = require("fs");
const fileStream = require('file-stream-rotator'); 
// Log path based on log level
const logPath = `${__dirname}/${process.env.NODE_ENV}/backend-logger`;
const streams = [
  // disable console.log() in production
  { stream: process.env.NODE_ENV==='development'?process.stdout:fileStream.getStream({filename:`${logPath}/access-%DATE%.log`, frequency:"1h", date_format: "YYYY-MM-DD-HH", verbose: false})} ,
  { level: 'info', stream: fileStream.getStream({filename:`${logPath}/access-%DATE%.log`, frequency:"1h", date_format: "YYYY-MM-DD-HH", verbose: false})},
  { level: 'error', stream: fileStream.getStream({filename:`${logPath}/error-%DATE%.log`, frequency:"1h", date_format: "YYYY-MM-DD-HH", verbose: false})},
  { level: 'warn', stream: fileStream.getStream({filename:`${logPath}/warn-%DATE%.log`, frequency:"1h", date_format: "YYYY-MM-DD-HH", verbose: false})},
];


// 1h pino configuraion
const configpino = {
  timestamp: () => {
    return ', "timestamp": "' + new Date().toISOString() + '"' 
  },
  mixin(_context) {
    return { 
        'label': 'node-boilerplate',
        'reqId': get('reqId'), // request id,
        'userAgent' : get('userAgent'),
        'amznTraceId' : get('amznTraceId')
    }
  },
  base : null
  }

class Logger {

    constructor() {
      this.name = 'logger';
      this.logger = pino(configpino, multistream(streams));
      this.httplogger = pinohttp({
        serializers : {
          req : (_) =>{
            return undefined;
          },
          res : (_) =>{
            return undefined;
          }
        },
        customLogLevel: function (res) {
          if (res.statusCode >= 400 && res.statusCode < 500) {
            return 'warn'
          } else if (res.statusCode >= 500) {
            return 'error'
          } else if (res.statusCode >= 300 && res.statusCode < 400) {
            return 'warn'
          }
          return 'info'
        }
        }, multistream(streams));
    }
  
    info(...args) {
      this.logger.info(...args);
    }

    warn(...args) {
      rollbar.warning(...args)
      this.logger.warn(...args);
    }
  
    error(...args) {
      this.logger.error(...args);
    }
  }

//Creating Log Directory
(() => {
  try {
    if (!existsSync(logPath)) mkdirSync(logPath);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error("Error while creating Log Directory -> ", error);
  }
})();
  
  const logger = new Logger();
  
  module.exports = logger;