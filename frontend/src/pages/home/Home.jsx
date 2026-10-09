import React from "react";
import Featured from "../../components/featured/Featured";
import CatCard from "../../components/catCard/CatCard";
import { FeatureCities } from "../../components/featurecities/FeatureCities";
import { FeatureCourses } from "../../components/featurecourse/FeatureCourses";
import { Terminals } from "../../components/terminals/Terminals";
import { Howitworks } from "../../components/howitworks/Howitworks";
import { FeatureBlog } from "../../components/featureblog/FeatureBlog";

export const Home = () => {
   return (
      <div className="bg-white">
         <Featured />
         <CatCard />
         <FeatureCities />
         <FeatureCourses />
         <Howitworks />
         <Terminals />
         <FeatureBlog />
      </div>
   );
};
