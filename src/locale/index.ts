import example from './example'

const getLocale = (): typeof example => {
  return process.env.LOCALE_FILE ? require(process.env.LOCALE_FILE).default : example
}

export default getLocale