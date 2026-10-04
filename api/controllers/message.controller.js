import createError from "../utils/createError.js";
import Message from "../models/message.model.js";
import Conversation from "../models/conversation.model.js";

const findOwnConversation = async (conversationId, userId) => {
   const conversation = await Conversation.findOne({ id: conversationId });
   if (!conversation) throw createError(404, "Conversation not found!");
   if (conversation.sellerId !== userId && conversation.buyerId !== userId)
      throw createError(403, "This is not your conversation!");
   return conversation;
};

export const createMessage = async (req, res, next) => {
   try {
      const desc = req.body.desc?.trim();
      if (!desc) return next(createError(400, "Message can't be empty!"));

      const conversation = await findOwnConversation(
         req.body.conversationId,
         req.userId
      );

      const saveMessage = await new Message({
         conversationId: conversation.id,
         userId: req.userId,
         desc,
      }).save();

      // Sender has read it, the other side has a new unread message
      const senderIsSeller = conversation.sellerId === req.userId;
      conversation.readBySeller = senderIsSeller;
      conversation.readByBuyer = !senderIsSeller;
      conversation.lastMessage = desc;
      await conversation.save();

      res.status(201).send(saveMessage);
   } catch (err) {
      next(err);
   }
};

export const getMessages = async (req, res, next) => {
   try {
      await findOwnConversation(req.params.id, req.userId);
      const messages = await Message.find({
         conversationId: req.params.id,
      }).sort({ createdAt: 1 });
      res.status(200).send(messages);
   } catch (err) {
      next(err);
   }
};
