import { createContext, useContext, useMemo, useState } from "react";

const BookingContext = createContext();

export const BookingProvider = ({ children }) => {
  const [search, setSearch] = useState({
    source: "",
    destination: "",
    date: "",
    maxPrice: 3000,
  });
  const [selectedBus, setSelectedBus] = useState(null);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [currentBooking, setCurrentBooking] = useState(null);

  const resetBookingFlow = () => {
    setSelectedBus(null);
    setSelectedSeats([]);
    setCurrentBooking(null);
  };

  const value = useMemo(
    () => ({
      search,
      setSearch,
      selectedBus,
      setSelectedBus,
      selectedSeats,
      setSelectedSeats,
      currentBooking,
      setCurrentBooking,
      resetBookingFlow,
    }),
    [search, selectedBus, selectedSeats, currentBooking]
  );

  return <BookingContext.Provider value={value}>{children}</BookingContext.Provider>;
};

export const useBooking = () => useContext(BookingContext);
