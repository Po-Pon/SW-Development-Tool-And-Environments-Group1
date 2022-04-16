import axios from "axios"
import router from "../router"
import Nprogress from "nprogress"

const instance = axios.create({
  baseURL: "https://cryptic-thicket-17532.herokuapp.com",
  // baseURL: "http://localhost:3001",
  // baseURL: "http://159.65.12.177:6480",
})

instance.interceptors.request.use(
  function (config) {
    Nprogress.start()
    const token = localStorage.getItem("token")
    if (token) {
      config.headers["Authorization"] = token
    }
    return config
  },
  function (error) {
    return Promise.reject(error)
  }
)

// Add a response interceptor
instance.interceptors.response.use(
  function (response) {
    Nprogress.done()
    return response
  },
  function (error) {
    Nprogress.done()
    console.log("intercepted 2")
    console.log(error.response)
    if (error.response.status === 401) {
      alert("Please login again")
      localStorage.removeItem("token")
      router.push("/signin")
    }
    return Promise.reject(error)
  }
)

export default instance
