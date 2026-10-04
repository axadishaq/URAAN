import React from "react";
import { useParams } from "react-router-dom";
import Gigs from "../gigs/Gigs";

// City pages are the services list with the city fixed
const GigsByCountry = () => {
   const { country } = useParams();
   return <Gigs city={country} />;
};

export default GigsByCountry;
