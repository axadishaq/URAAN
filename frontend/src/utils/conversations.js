// The other person in a conversation
export const otherUserId = (c, me) => (c.sellerId === me ? c.buyerId : c.sellerId);

// Has the current user read this conversation?
export const isReadByMe = (c, me) => (c.sellerId === me ? c.readBySeller : c.readByBuyer);
