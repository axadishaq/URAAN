import React from "react";

export const FeatureBlog = () => {
   return (
      <>
         <div className="bg-gray-50" id="blog">
            <section className="py-16 px-4">
               <div className="container mx-auto max-w-8xl">
                  {/* <!-- Header section with title and button --> */}
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10">
                     <div>
                        <h3 className="text-3xl font-bold mb-2">Blog Post</h3>
                        <p className="text-gray-600 text-lg">
                           Featured blog posts
                        </p>
                     </div>
                     <a
                        href="/blog"
                        className="mt-4 md:mt-0 px-6 py-2 bg-theme-light border-2 text-theme-dark font-medium rounded hover:bg-theme-accent hover:text-white transition duration-300">
                        View Blog
                     </a>
                  </div>

                  {/* <!-- Blog posts grid --> */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-8">
                     {/* <!-- Blog post 1 --> */}
                     <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg/30 transition duration-500 hover:-translate-y-1">
                        <a
                           href="/post/eliminate-your-fear-and-pick-up-job-today"
                           className="block">
                           <img
                              src="https://images.pexels.com/photos/4348404/pexels-photo-4348404.jpeg?auto=compress&cs=tinysrgb&w=600"
                              alt="Fear blog"
                              className="w-full h-75 object-cover"
                           />
                        </a>
                        <div className="p-6">
                           <div className="mb-4">
                              <div className="flex items-center text-md text-theme-light mb-2">
                                 <span>February 10, 2020</span>
                                 <span className="mx-2">|</span>
                                 <a
                                    href="/post-category/inspiration"
                                    className="hover:text-theme-dark">
                                    Inspiration
                                 </a>
                              </div>
                              <a
                                 href="/post/eliminate-your-fear-and-pick-up-job-today"
                                 className="text-xl font-semibold text-theme-dark  block mb-4">
                                 Eliminate Your Fear And Pick Up Job Today
                              </a>
                           </div>
                           <a
                              href="/post/eliminate-your-fear-and-pick-up-job-today"
                              className="inline-block px-5 py-2 bg-theme-light border-2 text-theme-dark font-medium rounded hover:bg-theme-accent hover:text-white transition duration-300">
                              Read More
                           </a>
                        </div>
                     </div>

                     {/* <!-- Blog post 2 --> */}
                     <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg/30 transition duration-500 hover:-translate-y-1">
                        <a
                           href="/post/eliminate-your-fear-and-pick-up-job-today"
                           className="block">
                           <img
                              src="https://images.pexels.com/photos/4052198/pexels-photo-4052198.jpeg?auto=compress&cs=tinysrgb&w=600"
                              alt="Fear blog"
                              className="w-full h-75 object-cover"
                           />
                        </a>
                        <div className="p-6">
                           <div className="mb-4">
                              <div className="flex items-center text-md text-theme-light mb-2">
                                 <span>February 10, 2020</span>
                                 <span className="mx-2">|</span>
                                 <a
                                    href="/post-category/inspiration"
                                    className="hover:text-theme-dark">
                                    Inspiration
                                 </a>
                              </div>
                              <a
                                 href="/post/eliminate-your-fear-and-pick-up-job-today"
                                 className="text-xl font-semibold text-theme-dark  block mb-4">
                                 Eliminate Your Fear And Pick Up Job Today
                              </a>
                           </div>
                           <a
                              href="/post/eliminate-your-fear-and-pick-up-job-today"
                              className="inline-block px-5 py-2 bg-theme-light border-2 text-theme-dark font-medium rounded hover:bg-theme-accent hover:text-white transition duration-300">
                              Read More
                           </a>
                        </div>
                     </div>

                     {/* <!-- Blog post 3 --> */}
                     <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg/30 transition duration-500 hover:-translate-y-1">
                        <a
                           href="/post/eliminate-your-fear-and-pick-up-job-today"
                           className="block">
                           <img
                              src="https://images.pexels.com/photos/965117/pexels-photo-965117.jpeg?auto=compress&cs=tinysrgb&w=600"
                              alt="Fear blog"
                              className="w-full h-75 object-cover"
                           />
                        </a>
                        <div className="p-6">
                           <div className="mb-4">
                              <div className="flex items-center text-md text-theme-light mb-2">
                                 <span>February 10, 2020</span>
                                 <span className="mx-2">|</span>
                                 <a
                                    href="/post-category/inspiration"
                                    className="hover:text-theme-dark">
                                    Inspiration
                                 </a>
                              </div>
                              <a
                                 href="/post/eliminate-your-fear-and-pick-up-job-today"
                                 className="text-xl font-semibold text-theme-dark  block mb-4">
                                 Eliminate Your Fear And Pick Up Job Today
                              </a>
                           </div>
                           <a
                              href="/post/eliminate-your-fear-and-pick-up-job-today"
                              className="inline-block px-5 py-2 bg-theme-light border-2 text-theme-dark font-medium rounded hover:bg-theme-accent hover:text-white transition duration-300">
                              Read More
                           </a>
                        </div>
                     </div>
                  </div>
               </div>
            </section>
         </div>
      </>
   );
};
