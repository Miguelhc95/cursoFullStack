import axios from 'axios'
const baseUrl = 'https://studies.cs.helsinki.fi/restcountries/api/'

const getAll = () => {
  const url = baseUrl.concat("all")
  return axios.get(url)
}

const getCountry = (name) => {
  const url = baseUrl.concat("name")
  return axios.get(`${url}/${name}`)
}

export default { 
  getAll: getAll, 
  getCountry: getCountry,
}