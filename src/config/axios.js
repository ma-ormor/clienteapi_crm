import axios from "axios"

const cliente = axios.create({
  baseURL: process.env.REACT_BACKEND_URL
})

export default cliente