import Bus from '../models/Bus.js';

export const setupSockets = (io) => {
  io.on('connection', (socket) => {
    console.log(`New client connected: ${socket.id}`);

    // Join a specific bus room
    socket.on('join_bus', (busId) => {
      socket.join(busId);
      console.log(`Socket ${socket.id} joined bus room: ${busId}`);
    });

    // Handle seat locking
    socket.on('lock_seat', async ({ busId, seatId, userId }) => {
      try {
        const bus = await Bus.findById(busId);
        if (!bus) return;

        // Check if already booked
        if (bus.bookedSeats.includes(seatId)) return;

        // Clean up expired locks (older than 5 minutes)
        const fiveMinsAgo = new Date(Date.now() - 5 * 60 * 1000);
        bus.lockedSeats = bus.lockedSeats.filter(lock => lock.lockedAt > fiveMinsAgo);

        // Check if already locked by someone else
        const existingLock = bus.lockedSeats.find(lock => lock.seatId === seatId);
        if (existingLock && existingLock.userId !== userId) return;

        // Add lock
        if (!existingLock) {
          bus.lockedSeats.push({ seatId, userId, lockedAt: new Date() });
          await bus.save();

          // Broadcast to everyone in the room
          io.to(busId).emit('seat_locked', { seatId, userId });
        }
      } catch (err) {
        console.error('Socket lock_seat error:', err);
      }
    });

    // Handle seat unlocking
    socket.on('unlock_seat', async ({ busId, seatId, userId }) => {
      try {
        const bus = await Bus.findById(busId);
        if (!bus) return;

        const initialLength = bus.lockedSeats.length;
        bus.lockedSeats = bus.lockedSeats.filter(lock => !(lock.seatId === seatId && lock.userId === userId));
        
        if (bus.lockedSeats.length !== initialLength) {
          await bus.save();
          io.to(busId).emit('seat_unlocked', { seatId });
        }
      } catch (err) {
        console.error('Socket unlock_seat error:', err);
      }
    });

    socket.on('disconnect', () => {
      console.log(`Client disconnected: ${socket.id}`);
      // In a more complex app, we could map socket.id to userId and unlock their seats here
    });
  });
};
