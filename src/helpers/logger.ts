import log4js from 'log4js'

const getLogger = (moduleName: string) => {
  const logger = log4js.getLogger(moduleName)
  logger.level = process.env.DEBUG_LEVEL || 'all'

  return logger
}

export default getLogger