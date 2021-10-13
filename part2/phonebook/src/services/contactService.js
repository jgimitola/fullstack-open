import axios from "axios";

import { URL } from "../constants";

const getAll = () => {
  return axios.get(URL).then((res) => res.data);
};

const create = (person) => {
  return axios.post(URL, person).then((res) => res.data);
};

const remove = (id) => {
  return axios.delete(`${URL}/${id}`).then((res) => res.data);
};

const update = (person) => {  
  return axios.put(`${URL}/${person.id}`, person).then((res) => res.data);
};

const contactService = { getAll, create, remove, update };
export default contactService;
