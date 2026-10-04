import { Link } from "react-router-dom";
import { btn } from "../../components/ui/styles";

export default function NotFound() {
   return (
      <div className="hero-pattern flex min-h-screen flex-col items-center justify-center gap-5 px-6 text-center">
         <Link to="/" className="flex items-center gap-2.5 text-ink">
            <img src="/uraan.png" alt="" className="h-12 w-12 rounded-xl bg-white object-contain p-1" />
            <span className="font-display text-2xl font-bold">URAAN</span>
         </Link>
         <h1 className="m-0 font-display text-4xl font-bold sm:text-5xl">Page Not Found</h1>
         <p className="m-0 max-w-md text-lg text-muted">
            Sorry, the page you are looking for does not exist or has been moved.
         </p>
         <div className="flex flex-wrap justify-center gap-2.5">
            <Link to="/" className={btn.primary}>
               Go Home
            </Link>
            <Link to="/gigs" className={btn.secondary}>
               Browse services
            </Link>
         </div>
      </div>
   );
}
