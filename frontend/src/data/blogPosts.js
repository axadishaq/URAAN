// URAAN blog articles.
// Photos are public domain (CC0) images from rawpixel, found through Openverse,
// and stored in frontend/public/blog so they never expire.
//
// Body blocks:
//   { type: "p", text }                 paragraph
//   { type: "h2", text }                section heading
//   { type: "list", items: [...] }      bullet list
//   { type: "steps", items: [...] }     numbered list
//   { type: "tip", title, text }        highlighted tip box
//   { type: "image", src, alt, caption }

export const BLOG_CATEGORIES = ["For customers", "For providers", "Learning"];

export const BLOG_POSTS = [
   {
      slug: "how-to-hire-a-trusted-technician",
      title: "How to hire a trusted technician in your city",
      excerpt:
         "A good plumber, electrician or AC technician saves you money and stress. Here is a simple checklist to choose the right person before you book.",
      category: "For customers",
      date: "2026-10-02",
      author: "URAAN Team",
      cover: {
         src: "/blog/hire-a-trusted-technician.webp",
         alt: "Pipe wrenches and plumbing tools on a tiled floor",
      },
      cta: { text: "Find a technician near you", to: "/gigs?category=Technicion" },
      body: [
         {
            type: "p",
            text: "When a tap starts leaking or the lights keep tripping, most of us call the first number we can find. Sometimes that works out. Often it means a second visit, a bigger bill, or a repair that fails again next month. Spending ten minutes choosing the right technician is worth it.",
         },
         { type: "h2", text: "1. Read the service page carefully" },
         {
            type: "p",
            text: "On URAAN every service shows what is included, the starting price, the delivery time and the city it serves. Read the description, not only the title. A provider who explains exactly what they check and what they bring usually knows the job well.",
         },
         { type: "h2", text: "2. Look at reviews, not only the stars" },
         {
            type: "p",
            text: "A rating tells you how happy customers were. The written reviews tell you why. Look for comments about arriving on time, explaining the problem clearly and leaving the place clean. One bad review among many good ones is normal. A pattern of the same complaint is a warning sign.",
         },
         { type: "h2", text: "3. Message before you order" },
         {
            type: "p",
            text: "Use the Message provider button to describe the problem in a few lines. Add the model of the appliance if you know it. A good technician will ask a question or two, give you a rough idea of the cost and suggest a time. If the replies are vague or rushed, keep looking.",
         },
         {
            type: "list",
            items: [
               "What exactly is included in the price?",
               "Do you bring the parts, or do I need to buy them?",
               "Is there a charge if the problem cannot be fixed?",
               "Will you test everything before you leave?",
            ],
         },
         {
            type: "tip",
            title: "Agree on the price in writing",
            text: "Payment on URAAN is agreed with the provider directly. Write the final price and what it covers in the chat before the visit. If something changes on the day, ask the technician to update it there too.",
         },
         { type: "h2", text: "4. Prepare for the visit" },
         {
            type: "p",
            text: "Clear the area around the appliance, keep the warranty card or old receipt nearby and make sure someone is home who can answer questions. Small things like this make the visit faster, and faster usually means cheaper.",
         },
         { type: "h2", text: "5. Close the loop with a review" },
         {
            type: "p",
            text: "When the job is done the provider marks the order as complete. Take a minute to leave an honest review. It helps your neighbours choose well, and it rewards the technicians who do careful work.",
         },
      ],
   },
   {
      slug: "get-your-ac-ready-before-summer",
      title: "Get your AC ready before the summer rush",
      excerpt:
         "Every year technicians are fully booked once the heat arrives. A service in early spring keeps your AC cooling well and your bills lower.",
      category: "For customers",
      date: "2026-09-24",
      author: "URAAN Team",
      cover: {
         src: "/blog/ac-service-before-summer.webp",
         alt: "Row of outdoor air conditioner units beside a brick building",
      },
      cta: { text: "Book an AC service", to: "/gigs?search=AC" },
      body: [
         {
            type: "p",
            text: "In most Pakistani cities the first hot week of the year is the busiest week for AC technicians. Phones ring all day and waiting times grow. If you book your service a few weeks earlier, you get more choice, more time from the technician and a unit that is ready the day you need it.",
         },
         { type: "h2", text: "Signs your AC needs attention" },
         {
            type: "list",
            items: [
               "The room takes much longer to cool than it used to.",
               "Water drips from the indoor unit.",
               "The outdoor unit makes a rattling or humming noise.",
               "Ice forms on the pipes.",
               "There is a musty smell when the AC starts.",
            ],
         },
         { type: "h2", text: "What a good service includes" },
         {
            type: "p",
            text: "A proper service is more than a quick spray of water. Ask the technician what they will do. A complete visit usually covers these steps:",
         },
         {
            type: "steps",
            items: [
               "Washing the indoor filters and the cooling coil.",
               "Cleaning the outdoor unit and checking that the fan spins freely.",
               "Checking the gas pressure and looking for leaks before any refill.",
               "Clearing the drain pipe so water does not drip inside.",
               "Testing the cooling and the remote before leaving.",
            ],
         },
         {
            type: "tip",
            title: "Ask before a gas refill",
            text: "If the technician says the gas is low, ask where the leak is. Gas does not get used up. Refilling without fixing the leak means you will need another refill soon.",
         },
         { type: "h2", text: "Small habits that help all summer" },
         {
            type: "p",
            text: "Wash the indoor filters every two to three weeks during heavy use. Keep the outdoor unit in the shade if you can, and never cover it while it runs. Setting the AC to 26 degrees instead of 18 keeps the room comfortable while using noticeably less electricity.",
         },
         {
            type: "p",
            text: "On URAAN you can compare AC technicians in your city, read what other customers say and agree on a time in chat. Book early and enjoy a cool summer.",
         },
      ],
   },
   {
      slug: "phone-screen-cracked-repair-or-replace",
      title: "Cracked phone screen: repair it or replace the phone?",
      excerpt:
         "A broken screen does not always mean a new phone. Here is how to decide, and what to ask the repair shop before you hand your phone over.",
      category: "For customers",
      date: "2026-09-15",
      author: "URAAN Team",
      cover: {
         src: "/blog/phone-repair-or-replace.webp",
         alt: "Smartphone with a cracked white glass back",
      },
      cta: { text: "Find electronics repair", to: "/gigs?category=Electronics" },
      body: [
         {
            type: "p",
            text: "It happens to everyone. The phone slips, hits the floor and the screen cracks. Before you start saving for a new one, find out whether a repair makes more sense.",
         },
         { type: "h2", text: "When a repair is the better choice" },
         {
            type: "list",
            items: [
               "The phone is less than three years old and otherwise works well.",
               "Only the glass is cracked and the display still shows a clear picture.",
               "The repair costs well under half the price of a similar new phone.",
               "You are happy with the battery life and storage.",
            ],
         },
         { type: "h2", text: "When replacing makes more sense" },
         {
            type: "list",
            items: [
               "The phone no longer gets software updates.",
               "The battery is also weak, so you would need two repairs.",
               "There is water damage as well as the crack.",
               "The repair costs close to the price of the phone.",
            ],
         },
         { type: "h2", text: "Questions to ask the repair shop" },
         {
            type: "steps",
            items: [
               "Is the new screen original, or a copy? Copies are cheaper but can be dimmer and less responsive.",
               "Is there a warranty on the part and on the work?",
               "How long will the repair take?",
               "Will my data stay on the phone?",
            ],
         },
         {
            type: "tip",
            title: "Back up first",
            text: "Before any repair, back up your photos and contacts and remove your SIM and memory card. Most repairs do not touch your data, but a backup takes five minutes and removes all worry.",
         },
         {
            type: "p",
            text: "Electronics repair providers on URAAN list what they fix, how long it takes and their starting price. Message two or three of them with your phone model and compare their answers before you decide.",
         },
      ],
   },
   {
      slug: "your-first-orders-on-uraan",
      title: "Your first orders on URAAN: a practical guide for providers",
      excerpt:
         "New on URAAN? These steps help customers trust a new profile, so your first orders arrive sooner.",
      category: "For providers",
      date: "2026-09-05",
      author: "URAAN Team",
      cover: {
         src: "/blog/your-first-orders.webp",
         alt: "Smiling shopkeeper standing behind the counter of his shop",
      },
      cta: { text: "Post your first service", to: "/add" },
      body: [
         {
            type: "p",
            text: "Every provider starts with zero reviews. Customers know this, but they still need a reason to choose you over someone with a long history. The good news is that a complete, honest profile and quick replies go a long way.",
         },
         { type: "h2", text: "Complete your profile" },
         {
            type: "p",
            text: "Add a clear profile photo of yourself or your shop and write a short description of your experience. Mention how long you have done this work and the areas of your city you cover. People like to know who is coming to their home.",
         },
         { type: "h2", text: "Write a service that answers questions" },
         {
            type: "list",
            items: [
               "Use a title that says exactly what you do, like \"AC repair and gas refill at home\".",
               "List what is included so customers can compare you fairly.",
               "Give a realistic delivery time. Being early is better than being late.",
               "Set a fair starting price and explain what can change it.",
            ],
         },
         { type: "h2", text: "Reply fast" },
         {
            type: "p",
            text: "When a message arrives, answer as soon as you can. Customers often contact two or three providers at once and book whoever replies first with a clear answer. Turn on notifications on your phone and check your URAAN inbox during the day.",
         },
         {
            type: "tip",
            title: "Your first customers are your best marketing",
            text: "Do your very best work for your first few orders, then politely ask happy customers to leave a review. Each honest review makes the next customer more confident.",
         },
         { type: "h2", text: "Mark orders complete" },
         {
            type: "p",
            text: "When the job is finished, open Orders and choose Mark complete. Customers can only review a service after ordering it, so closing your orders properly is how good work turns into visible reviews on your page.",
         },
         { type: "h2", text: "Teach what you know" },
         {
            type: "p",
            text: "Once you have some experience, consider creating a short course. Teaching builds your reputation, brings a second source of income and introduces new customers to your services.",
         },
      ],
   },
   {
      slug: "photos-and-descriptions-that-win-orders",
      title: "Stand out in a busy market: photos and descriptions that win orders",
      excerpt:
         "In a market full of similar services, the provider with clear photos and an honest description gets the call. Here is how to make yours stand out.",
      category: "For providers",
      date: "2026-08-27",
      author: "URAAN Team",
      cover: {
         src: "/blog/stand-out-in-a-busy-market.webp",
         alt: "Colourful bazaar lane with stalls selling bags and fabric",
      },
      cta: { text: "Improve your service page", to: "/myGigs" },
      body: [
         {
            type: "p",
            text: "Walk through any bazaar and you will notice that some stalls are always busier than others, even when they sell the same things. Usually it is because the goods are easy to see and the shopkeeper explains things well. Your URAAN service page works the same way.",
         },
         { type: "h2", text: "Photos: show real work" },
         {
            type: "list",
            items: [
               "Use photos of your own work, never images copied from the internet.",
               "Take pictures in daylight, near a window or outside.",
               "Hold the phone steady and keep the subject in the centre.",
               "Show a before and after where it makes sense, like a cleaned AC coil or a finished suit.",
               "Choose your best photo as the cover. It is the first thing people see in search results.",
            ],
         },
         { type: "h2", text: "Descriptions: answer the questions people ask" },
         {
            type: "p",
            text: "Think about the questions customers always ask you on the phone, then answer them in the description. What is included? How long does it take? Do you bring the materials? Which areas do you cover? Short paragraphs and simple words work better than long blocks of text.",
         },
         {
            type: "tip",
            title: "Use the What's included list",
            text: "Each item you add appears with a green tick on your service page. Customers scan this list to compare providers, so keep each item short and specific.",
         },
         { type: "h2", text: "Price honestly" },
         {
            type: "p",
            text: "A starting price that is too low can bring disappointed customers when the real bill arrives. Set a fair starting price and explain in the description what can make the final price higher. Honest pricing leads to better reviews.",
         },
         {
            type: "p",
            text: "Finally, keep your page up to date. When you learn a new skill or buy better equipment, add it. A page that changes over time shows customers that you are active and growing.",
         },
      ],
   },
   {
      slug: "learn-a-new-skill-with-short-courses",
      title: "Learn a new skill in a month with short local courses",
      excerpt:
         "You do not need years of study to learn a useful skill. Short, hands on courses from local experts can get you started in weeks.",
      category: "Learning",
      date: "2026-08-18",
      author: "URAAN Team",
      cover: {
         src: "/blog/learn-a-skill-with-short-courses.webp",
         alt: "Students shaping clay on pottery wheels in a workshop class",
      },
      cta: { text: "Browse courses", to: "/courses" },
      body: [
         {
            type: "p",
            text: "Many of the most useful skills are learned by doing, next to someone who already knows the craft. Stitching, basic electrical work, phone repair, cooking and design are all skills where a few weeks of focused practice make a real difference.",
         },
         { type: "h2", text: "Why short local courses work" },
         {
            type: "list",
            items: [
               "You learn from people who use the skill every day in your city.",
               "Small groups mean you can ask questions and get feedback on your work.",
               "A clear start and end date keeps you motivated.",
               "You can try a skill before committing to longer training.",
            ],
         },
         { type: "h2", text: "Choosing the right course" },
         {
            type: "p",
            text: "Start with the level. Beginner courses assume no experience, Intermediate courses expect you to know the basics and Advanced courses are for people who already work in the field. Read the course description to see what you will practise and whether you need to bring any tools.",
         },
         {
            type: "tip",
            title: "Practise between lessons",
            text: "Set aside twenty minutes a day to repeat what you learned. Small, regular practice beats one long session a week.",
         },
         { type: "h2", text: "Turning a skill into income" },
         {
            type: "p",
            text: "Once you are confident, you can offer the skill as a service on URAAN. Start with small jobs for friends and neighbours, collect honest reviews and grow from there. Many of today's providers started exactly this way.",
         },
         {
            type: "p",
            text: "Browse the courses on URAAN by level, enroll in one that interests you and find it any time under My learning.",
         },
      ],
   },
   {
      slug: "turn-tailoring-skills-into-a-business",
      title: "From hobby to income: turning tailoring skills into a business",
      excerpt:
         "If friends and family already ask you to stitch their clothes, you may have a business waiting. Here is how to start small and grow.",
      category: "Learning",
      date: "2026-08-08",
      author: "URAAN Team",
      cover: {
         src: "/blog/tailoring-skills-into-a-business.webp",
         alt: "Tailor working at a sewing machine in his workshop",
      },
      cta: { text: "Offer your tailoring service", to: "/add" },
      body: [
         {
            type: "p",
            text: "Tailoring is one of the most dependable skills you can have. People always need clothes stitched, altered or repaired, and a tailor who is careful with measurements quickly builds loyal customers.",
         },
         { type: "h2", text: "Start with what you already do well" },
         {
            type: "p",
            text: "You do not need to offer everything on day one. If you are best at shalwar kameez, start there. Add alterations, school uniforms or bridal work as your confidence and equipment grow.",
         },
         {
            type: "image",
            src: "/blog/tailoring-tools.webp",
            alt: "Rotary cutters, thread, buttons and printed fabric on a cutting mat",
            caption: "Good basic tools save time on every order.",
         },
         { type: "h2", text: "Tools worth investing in" },
         {
            type: "list",
            items: [
               "A reliable sewing machine that you keep oiled and serviced.",
               "Sharp fabric scissors used only for cloth.",
               "A measuring tape, tailor's chalk and a good set of pins.",
               "A notebook or phone file to save every customer's measurements.",
            ],
         },
         {
            type: "tip",
            title: "Keep every measurement",
            text: "Saving each customer's measurements means repeat orders are faster and fit perfectly. Customers notice this, and they come back.",
         },
         { type: "h2", text: "Set clear prices and delivery dates" },
         {
            type: "p",
            text: "Write down your price for each type of garment and the number of days you need. Busy seasons like Eid and the wedding months fill up quickly, so tell customers early when your last booking date is.",
         },
         { type: "h2", text: "Bring your work online" },
         {
            type: "p",
            text: "Create a service on URAAN with photos of your best pieces, your prices and your delivery time. Customers in your city can then find you, message you and place orders directly. If you enjoy teaching, a beginner stitching course is a natural next step.",
         },
      ],
   },
];

const words = (post) =>
   post.body
      .map((b) => [b.text, b.title, ...(b.items || [])].filter(Boolean).join(" "))
      .join(" ")
      .split(/\s+/).length;

export const readMinutes = (post) => Math.max(1, Math.ceil(words(post) / 200));

export const getPost = (slug) => BLOG_POSTS.find((p) => p.slug === slug);

// newest first
export const sortedPosts = () => [...BLOG_POSTS].sort((a, b) => b.date.localeCompare(a.date));
