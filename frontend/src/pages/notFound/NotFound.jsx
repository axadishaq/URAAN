import { Link } from "react-router";

export default function NotFound() {
   return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-theme-bg text-theme-foreground">
         <div className="flex-col gap-4 w-full h-auto flex items-center justify-center">
            <div className="w-20 h-20 border-4 border-transparent text-blue-400 text-4xl animate-spin flex items-center justify-center border-t-blue-400 rounded-full">
               <div className="w-16 h-16 border-4 border-transparent text-red-400 text-2xl animate-spin flex items-center justify-center border-t-red-400 rounded-full"></div>
            </div>
         </div>

         <h1 className="text-4xl font-extrabold mb-4 text-theme-accent drop-shadow-lg">
            Page Not Found !
         </h1>
         <p className="text-xl text-theme-dark mb-12 max-w-96 text-center ">
            Sorry, the page you are looking for does not exist or has been
            moved.
         </p>
         <Link
            to="/"
            className="px-8 py-3 rounded-xl bg-theme-accent text-white font-semibold shadow hover:bg-theme-accent-dark transition ">
            Go Home
         </Link>
      </div>
   );
}
