import HttpRequest from '@/utils/axios'
import config from '@/config'
const baseUrl = process.env.NODE_ENV === 'development' ? config.baseUrl.dev : config.baseUrl.prod
const axios = new HttpRequest(baseUrl)
export default axios
