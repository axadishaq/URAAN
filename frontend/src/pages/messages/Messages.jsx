import React from "react";
import { MessageCircle } from "lucide-react";
import Inbox from "../../components/inbox/Inbox";

// Inbox on the left, a hint on the right until a chat is opened
const Messages = () => (
   <div className="bg-cream">
      <div className="mx-auto max-w-[1200px] px-4 pb-12 pt-7 sm:px-5">
         <div className="flex min-h-[640px] overflow-hidden rounded-2xl border border-line bg-white">
            <Inbox className="w-full md:w-[380px] md:shrink-0 md:border-r md:border-line" />
            <div className="hidden flex-1 flex-col items-center justify-center gap-3 bg-cream p-8 text-center text-muted md:flex">
               <span className="flex h-14 w-14 items-center justify-center rounded-full bg-blush text-ink">
                  <MessageCircle size={26} aria-hidden="true" />
               </span>
               <strong className="text-lg text-ink">Select a conversation</strong>
               <span className="max-w-xs text-[15px]">Pick a chat on the left to read and reply.</span>
            </div>
         </div>
      </div>
   </div>
);

export default Messages;
