import { Server } from 'socket.io';
import { logger } from '@/utils/logger';

export const socketHandler = (io: Server) => {
  io.on('connection', (socket) => {
    logger.info(`User connected: ${socket.id}`);

    // Join auction room
    socket.on('join-auction', (auctionId: string) => {
      socket.join(`auction-${auctionId}`);
      logger.info(`User ${socket.id} joined auction ${auctionId}`);
    });

    // Leave auction room
    socket.on('leave-auction', (auctionId: string) => {
      socket.leave(`auction-${auctionId}`);
      logger.info(`User ${socket.id} left auction ${auctionId}`);
    });

    // Handle bid placement
    socket.on('place-bid', (data: { auctionId: string; amount: number; userId: string }) => {
      // Broadcast bid to all users in the auction room
      io.to(`auction-${data.auctionId}`).emit('bid-placed', {
        auctionId: data.auctionId,
        amount: data.amount,
        userId: data.userId,
        timestamp: new Date(),
      });
      
      logger.info(`Bid placed on auction ${data.auctionId}: $${data.amount}`);
    });

    // Handle auction updates
    socket.on('auction-update', (data: { auctionId: string; currentPrice: number; totalBids: number }) => {
      io.to(`auction-${data.auctionId}`).emit('auction-updated', {
        auctionId: data.auctionId,
        currentPrice: data.currentPrice,
        totalBids: data.totalBids,
        timestamp: new Date(),
      });
    });

    // Handle auction ending
    socket.on('auction-ending', (data: { auctionId: string; timeLeft: number }) => {
      io.to(`auction-${data.auctionId}`).emit('auction-ending', {
        auctionId: data.auctionId,
        timeLeft: data.timeLeft,
        timestamp: new Date(),
      });
    });

    // Handle auction ended
    socket.on('auction-ended', (data: { auctionId: string; winnerId?: string; finalPrice: number }) => {
      io.to(`auction-${data.auctionId}`).emit('auction-ended', {
        auctionId: data.auctionId,
        winnerId: data.winnerId,
        finalPrice: data.finalPrice,
        timestamp: new Date(),
      });
    });

    // Handle user notifications
    socket.on('send-notification', (data: { userId: string; type: string; message: string }) => {
      socket.to(data.userId).emit('notification', {
        type: data.type,
        message: data.message,
        timestamp: new Date(),
      });
    });

    // Handle user typing in chat (future feature)
    socket.on('typing', (data: { auctionId: string; userId: string; isTyping: boolean }) => {
      socket.to(`auction-${data.auctionId}`).emit('user-typing', {
        userId: data.userId,
        isTyping: data.isTyping,
      });
    });

    // Handle chat messages (future feature)
    socket.on('chat-message', (data: { auctionId: string; userId: string; message: string }) => {
      io.to(`auction-${data.auctionId}`).emit('chat-message', {
        userId: data.userId,
        message: data.message,
        timestamp: new Date(),
      });
    });

    // Handle disconnection
    socket.on('disconnect', () => {
      logger.info(`User disconnected: ${socket.id}`);
    });

    // Handle errors
    socket.on('error', (error) => {
      logger.error(`Socket error for ${socket.id}:`, error);
    });
  });

  // Handle server-wide events
  io.on('error', (error) => {
    logger.error('Socket.io server error:', error);
  });

  logger.info('Socket.io handler initialized');
}; 