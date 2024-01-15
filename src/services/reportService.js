import Axios from 'axios';

const axios = Axios.create({
  withCredentials: true
})

const BASE_URL = 'http://localhost:3001'

const createReport = async (data) => {
  const res = await axios({
    url: `${BASE_URL}/api/generate`,
    method: 'POST',
    data,
  })
  return res.data
}
const deleteRec = async (data) => {
  const res = await axios({
    url: `${BASE_URL}/api/recs`,
    method: 'DELETE',
    data,
  })
  return res.data
}
const updateRec = async (data) => {
  const res = await axios({
    url: `${BASE_URL}/api/recs`,
    method: 'PUT',
    data,
  })
  return res.data
}
const addRec = async (data) => {
  const res = await axios({
    url: `${BASE_URL}/api/recs`,
    method: 'POST',
    data,
  })
  return res.data
}
const getRecs = async (params) => {
  const res = await axios({
    url: `${BASE_URL}/api/recs`,
    method: 'GET',
    params,
  })
  return res.data
}

export const reportService = {
  createReport,
  deleteRec,
  updateRec,
  getRecs,
  addRec
};