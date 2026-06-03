import api from "./api";

export const createBooking = async (payload) => {
  const response = await api.post("/bookings", payload);
  return response.data;
};

export const fetchMyBookings = async (page = 1, limit = 10) => {
  const response = await api.get("/bookings/my", { params: { page, limit } });
  return response.data;
};

export const cancelBooking = async (bookingId) => {
  const response = await api.patch(`/bookings/${bookingId}/cancel`);
  return response.data;
};

export const confirmBooking = async (bookingId) => {
  const response = await api.patch(`/bookings/${bookingId}/confirm`);
  return response.data;
};

export const fetchAllBookings = async (page = 1, limit = 10) => {
  const response = await api.get("/bookings", { params: { page, limit } });
  return response.data;
};
