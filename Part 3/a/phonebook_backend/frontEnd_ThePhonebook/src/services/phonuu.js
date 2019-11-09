import axios from 'axios'
// const baseurl = 'http://192.168.43.29:3001/persons'
// const baseurl = 'http://localhost:3001/persons'
const baseurl = '/api/persons'

const getAll = () => {
    return axios.get(baseurl).then(response => response.data);
}

const create = newObject => {
    return axios.post(baseurl, newObject).then(response => response.data);
}

const update = (id, newObject) => {
    return axios.put(`${baseurl}/${id}`, newObject).then(response => response.data)
}

const deleteIt = (id, delobject) => {
    return axios.delete(baseurl + "/" + id, delobject)
    // return axios.delete(baseurl+"/"+id,delobject).then(response => response.data )    
    //  both statements above work


}

export default { getAll, create, update, deleteIt }