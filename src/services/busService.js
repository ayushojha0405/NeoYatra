import api from "./api";

export const fetchBuses = async (filters = {}) => {
  const response = await api.get("/buses", { params: filters });
  return response.data;
};

export const fetchBusById = async (busId) => {
  const response = await api.get(`/buses/${busId}`);
  return response.data;
};

export const createBus = async (payload) => {
  const response = await api.post("/buses", payload);
  return response.data;
};
