import axios from 'axios'

export const server = axios.create({
  baseURL: 'http://localhost:3000'
})

export const aws = axios.create()



