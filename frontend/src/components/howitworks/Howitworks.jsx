import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ChevronDown } from "lucide-react";
import { btn } from "../ui/styles";

const steps = [
   {
      title: "Create Account",
      text: "Sign up as a customer, or as a provider to offer your own services and courses.",
   },
   {
      title: "Find or Post a Service",
      text: "Search by category and city, or publish your service with photos and a price.",
   },
   {
      title: "Order, Chat and Review",
      text: "Place an order, agree on the details in chat, and rate the provider when the job is done.",
   },
];

const faqs = [
   {
      question: "How do I create an account?",
      answer: "Click Join URAAN at the top, choose whether you want to hire or offer services, and fill in your details. It takes about a minute.",
   },
   {
      question: "How do I pay for a service?",
      answer: "Payments are not taken online yet. After you order, agree on the time and payment with the provider in chat.",
   },
   {
      question: "Can I offer my own services?",
      answer: "Yes. Register as a service provider, then use Post a service or Create a course from your account menu.",
   },
   {
      question: "How do reviews work?",
      answer: "After you order a service you can rate it from 1 to 5 stars and leave a short review for other customers.",
   },
];

export const Howitworks = () => {
   const [activeIndex, setActiveIndex] = useState(null);

   const toggleFAQ = (index) => {
      setActiveIndex(activeIndex === index ? null : index);
   };

   return (
      <>
         <section id="how-it-works" className="px-4 py-20">
            <div className="mx-auto flex max-w-[1200px] flex-col gap-8">
               <div className="flex flex-col gap-2.5 text-center">
                  <h2 className="m-0 font-display text-3xl font-bold sm:text-4xl">How It Works</h2>
                  <p className="m-0 text-base text-muted">Three simple steps to get help or start earning.</p>
               </div>
               <ol className="m-0 grid list-none grid-cols-1 gap-4 p-0 md:grid-cols-3">
                  {steps.map((s, i) => (
                     <li key={s.title} className="flex flex-col gap-2.5 rounded-2xl bg-blush p-6">
                        <span className="flex h-11 w-11 items-center justify-center rounded-full bg-white text-lg font-bold">
                           {i + 1}
                        </span>
                        <span className="text-lg font-bold">{s.title}</span>
                        <span className="text-[15px] leading-relaxed text-muted">{s.text}</span>
                     </li>
                  ))}
               </ol>
               <Link to="/register" className={`${btn.primary} self-center`}>
                  Get Started Now
               </Link>
            </div>
         </section>

         {/* FAQ Section (original layout) */}
         <div className="bg-theme-light">
            <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
               <div className="mb-12 text-center">
                  <h2 className="mb-4 font-display text-3xl font-bold text-theme-dark md:text-4xl">
                     Frequently Asked Questions
                  </h2>
                  <p className="text-lg text-theme-medium">
                     Find answers to common questions about our services
                  </p>
               </div>

               <div className="space-y-4">
                  {faqs.map((faq, index) => (
                     <div
                        key={faq.question}
                        className="overflow-hidden rounded-lg border-b-4 border-theme-accent">
                        <button
                           type="button"
                           onClick={() => toggleFAQ(index)}
                           aria-expanded={activeIndex === index}
                           aria-controls={`faq-answer-${index}`}
                           className="flex w-full items-center justify-between bg-white p-6 text-left transition-colors hover:bg-theme-light">
                           <h3 className="m-0 text-lg font-medium text-theme-dark">{faq.question}</h3>
                           <ChevronDown
                              aria-hidden="true"
                              className={`h-6 w-6 shrink-0 text-theme-dark transition-transform duration-300 ${
                                 activeIndex === index ? "rotate-180" : ""
                              }`}
                           />
                        </button>
                        <div
                           id={`faq-answer-${index}`}
                           className={`overflow-hidden bg-white transition-all duration-300 ease-in-out ${
                              activeIndex === index ? "max-h-96" : "max-h-0"
                           }`}>
                           <div className="p-6 pt-0 text-theme-medium">
                              <p className="m-0">{faq.answer}</p>
                           </div>
                        </div>
                     </div>
                  ))}
               </div>
            </section>
         </div>
      </>
   );
};
