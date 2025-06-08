import React, { useState } from "react";
import { Link } from "react-router";

export const Howitworks = () => {
   const [activeIndex, setActiveIndex] = useState(null);

   const faqs = [
      {
         question: "How do I create an account?",
         answer:
            "Creating an account is simple! Click on the 'Sign Up' button in the top right corner, fill in your details, and verify your email address. You'll be ready to go in just a few minutes.",
      },
      {
         question: "What payment methods do you accept?",
         answer:
            "We accept all major credit cards (Visa, MasterCard, American Express), PayPal, and bank transfers. All payments are processed securely through our encrypted payment gateway.",
      },
      {
         question: "Can I cancel my subscription anytime?",
         answer:
            "Yes, you can cancel your subscription at any time. There are no cancellation fees, and you'll continue to have access to the service until the end of your current billing period.",
      },
      {
         question: "How do I reset my password?",
         answer:
            "Click on 'Forgot Password' on the login page, enter your email address, and we'll send you a link to reset your password. The link will expire in 24 hours for security reasons.",
      },
   ];

   const toggleFAQ = (index) => {
      setActiveIndex(activeIndex === index ? null : index);
   };
   return (
      <>
         <section className="py-16 bg-white" id="how-it-works">
            <div className="container mx-auto px-4 md:px-8">
               <div className="text-center mb-12">
                  <h2 className="text-3xl font-bold text-theme-dark mb-4">
                     How It Works
                  </h2>
                  <p className="text-theme-medium max-w-2xl mx-auto">
                     Follow these simple steps to find your dream job quickly
                     and efficiently
                  </p>
               </div>

               <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {/* <!-- Step 1 --> */}
                  <div className="text-center">
                     <div className="w-16 h-16 bg-theme-light rounded-full flex items-center justify-center mx-auto mb-4">
                        <span className="text-theme-accent font-bold text-xl">
                           1
                        </span>
                     </div>
                     <h3 className="font-semibold text-xl mb-3">
                        Create Account
                     </h3>
                     <p className="text-theme-medium">
                        Sign up and complete your profile with all the relevant
                        information to get noticed by employers.
                     </p>
                  </div>

                  {/* <!-- Step 2 --> */}
                  <div className="text-center">
                     <div className="w-16 h-16 bg-theme-light rounded-full flex items-center justify-center mx-auto mb-4">
                        <span className="text-theme-accent font-bold text-xl">
                           2
                        </span>
                     </div>
                     <h3 className="font-semibold text-xl mb-3">
                        Post Service
                     </h3>
                     <p className="text-theme-medium">
                        Browse through our extensive list of job opportunities
                        or use our advanced search filters.
                     </p>
                  </div>

                  {/* <!-- Step 3 --> */}
                  <div className="text-center">
                     <div className="w-16 h-16 bg-theme-light rounded-full flex items-center justify-center mx-auto mb-4">
                        <span className="text-theme-accent font-bold text-xl">
                           3
                        </span>
                     </div>
                     <h3 className="font-semibold text-xl mb-3">Get Hired</h3>
                     <p className="text-theme-medium">
                        Send your application, attend interviews, and get hired
                        for your dream position.
                     </p>
                  </div>
               </div>

               <div className="text-center mt-10">
                  <Link
                     to="/register"
                     className="bg-theme-accent border-3 hover:border-amber-900 hover:text-theme-dark hover:bg-theme-light  font-bold text-white py-3 px-8 rounded-lg font-2xl transition-colors inline-block traansition-all duration-700">
                     Get Started Now
                  </Link>
               </div>
            </div>
         </section>
         <div className="bg-theme-light">
            {/* FAQ Section */}
            <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
               <div className="text-center mb-12">
                  <h2 className="text-3xl md:text-4xl font-bold text-theme-dark mb-4">
                     Frequently Asked Questions
                  </h2>
                  <p className="text-lg text-theme-medium">
                     Find answers to common questions about our services
                  </p>
               </div>

               <div className="space-y-4">
                  {faqs.map((faq, index) => (
                     <div
                        key={index}
                        className="border-b-4 border-theme-accent rounded-lg overflow-hidden">
                        <button
                           onClick={() => toggleFAQ(index)}
                           className="faq-toggle w-full text-left p-6 flex justify-between items-center bg-white hover:bg-theme-light transition-colors">
                           <h3 className="text-lg font-medium text-theme-dark">
                              {faq.question}
                           </h3>
                           <svg
                              className={`w-6 h-6 text-theme-dark transform transition-transform duration-300 ${
                                 activeIndex === index ? "rotate-180" : ""
                              }`}
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24">
                              <path
                                 strokeLinecap="round"
                                 strokeLinejoin="round"
                                 strokeWidth="2"
                                 d="M19 9l-7 7-7-7"></path>
                           </svg>
                        </button>
                        <div
                           className={`transition-all duration-300 ease-in-out overflow-hidden ${
                              activeIndex === index ? "max-h-96" : "max-h-0"
                           }`}>
                           <div className="p-6 pt-0 text-theme-medium ">
                              <p>{faq.answer}</p>
                           </div>
                        </div>
                     </div>
                  ))}
               </div>
            </section>{" "}
         </div>
      </>
   );
};
