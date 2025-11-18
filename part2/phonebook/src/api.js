import axios from "axios";

const baseUrl = "http://localhost:3001/persons";

export const getAllPersons = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

export const createPerson = async (person) => {
  const response = await axios.post(baseUrl, person);
  return response.data;
};

export const updatePerson = async (id, person) => {
  const response = await axios.put(`${baseUrl}/${id}`, person);
  return response.data;
};

export const deletePerson = async (id) => {
  const response = await axios.delete(`${baseUrl}/${id}`);
  return response.data;
};

