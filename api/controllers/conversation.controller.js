import createError from "../utils/createError.js";
import Conversation from "../models/conversation.model.js";
import User from "../models/user.model.js";
import { isValidId } from "../utils/helpers.js";

const isParticipant = (conversation, userId) =>
   conversation.sellerId === userId || conversation.buyerId === userId;

// Which "read" flag belongs to the current user in this conversation.
// Decided by the user's place in the conversation, not by their account type,
// because a service provider can also be the buyer in someone else's order.
export const readFlagFor = (conversation, userId) =>
   conversation.sellerId === userId ? "readBySeller" : "readByBuyer";

export const createConversation = async (req, res, next) => {
   try {
      const to = req.body.to;
      if (!to || !isValidId(to))
         return next(createError(400, "A valid recipient is required!"));
      if (to === req.userId)
         return next(createError(400, "You can't message yourself!"));

      const recipient = await User.findById(to);
      if (!recipient) return next(createError(404, "Recipient not found!"));

      // The seller in a conversation is the service provider. If both sides
      // are providers (or neither), the person starting the chat is the buyer.
      const iAmSeller = req.isSeller && !recipient.isSeller;
      const sellerId = iAmSeller ? req.userId : to;
      const buyerId = iAmSeller ? to : req.userId;

      // Re-use an existing conversation between these two users if there is one
      const existing = await Conversation.findOne({
         $or: [
            { sellerId, buyerId },
            { sellerId: buyerId, buyerId: sellerId },
         ],
      });
      if (existing) return res.status(200).send(existing);

      // Older versions saved the same id for both sides by mistake
      // (buyerId === sellerId). Repair such a record instead of duplicating it.
      const broken = await Conversation.findOne({
         id: { $in: [sellerId + buyerId, buyerId + sellerId] },
      });
      if (broken) {
         broken.sellerId = sellerId;
         broken.buyerId = buyerId;
         return res.status(200).send(await broken.save());
      }

      const newConversation = new Conversation({
         id: sellerId + buyerId,
         sellerId,
         buyerId,
         readBySeller: iAmSeller,
         readByBuyer: !iAmSeller,
      });
      const savedConversation = await newConversation.save();
      res.status(201).send(savedConversation);
   } catch (err) {
      next(err);
   }
};

export const updateConversation = async (req, res, next) => {
   try {
      const conversation = await Conversation.findOne({ id: req.params.id });
      if (!conversation) return next(createError(404, "Conversation not found!"));
      if (!isParticipant(conversation, req.userId))
         return next(createError(403, "This is not your conversation!"));

      conversation[readFlagFor(conversation, req.userId)] = true;
      const updated = await conversation.save();
      res.status(200).send(updated);
   } catch (err) {
      next(err);
   }
};

export const getSingleConversation = async (req, res, next) => {
   try {
      const conversation = await Conversation.findOne({ id: req.params.id });
      if (!conversation) return next(createError(404, "Not found!"));
      if (!isParticipant(conversation, req.userId))
         return next(createError(403, "This is not your conversation!"));
      res.status(200).send(conversation);
   } catch (err) {
      next(err);
   }
};

// Find the conversation between the current user and another user (if any)
export const getConversationWith = async (req, res, next) => {
   try {
      const other = req.params.userId;
      const conversation = await Conversation.findOne({
         $or: [
            { sellerId: req.userId, buyerId: other },
            { sellerId: other, buyerId: req.userId },
         ],
      });
      if (!conversation) return next(createError(404, "Not found!"));
      res.status(200).send(conversation);
   } catch (err) {
      next(err);
   }
};

export const getConversations = async (req, res, next) => {
   try {
      const conversations = await Conversation.find({
         $or: [{ sellerId: req.userId }, { buyerId: req.userId }],
      }).sort({ updatedAt: -1 });
      res.status(200).send(conversations);
   } catch (err) {
      next(err);
   }
};
