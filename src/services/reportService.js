import Axios from 'axios';

const axios = Axios.create({
    withCredentials: true
})

  const BASE_URL = 'http://localhost:3001'

  const createReport = async(data = {a:'a',b:'b'}, headers = null) =>{
    const res =  await axios({
    url: `${BASE_URL}/api/generate`,
    method:'POST',
    data,
    params: data,
    headers
})
return res.data
}

export const authService = {
    createReport
      };