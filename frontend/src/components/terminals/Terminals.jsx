import React from "react";

// To show a photo, put the image in frontend/public/team/ and set `photo`,
// e.g. photo: "/team/ahsan.jpg". Without one, initials are shown.
const team = [
   { name: "Chaudhary Ahsan", role: "Front End Developer", photo: "" },
   { name: "Asad Chaudhary", role: "Lead Developer", photo: "" },
   { name: "Malik Zeeshan", role: "Project Manager", photo: "" },
];

const initials = (name) =>
   name
      .split(" ")
      .map((p) => p[0])
      .join("")
      .slice(0, 2)
      .toUpperCase();

export const Terminals = () => {
   return (
      <section id="terminals" className="bg-cream px-4 py-20">
         <div className="mx-auto flex max-w-[1100px] flex-col gap-8">
            <div className="flex flex-col gap-2.5 text-center">
               <span className="text-[15px] font-semibold text-clay">
                  Creative Brains, Calm Chaos Managers, and Code Wizards
               </span>
               <h2 className="m-0 font-display text-3xl font-bold sm:text-4xl">That's Our Kind of Team</h2>
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
               {team.map((t) => (
                  <div
                     key={t.name}
                     className="flex flex-col items-center gap-2.5 rounded-2xl border border-line bg-white p-7 text-center">
                     {t.photo ? (
                        <img src={t.photo} alt={t.name} className="h-24 w-24 rounded-full object-cover" />
                     ) : (
                        <span
                           aria-hidden="true"
                           className="flex h-24 w-24 items-center justify-center rounded-full bg-blush font-display text-3xl font-bold">
                           {initials(t.name)}
                        </span>
                     )}
                     <span className="text-lg font-bold">{t.name}</span>
                     <span className="text-[15px] text-muted">{t.role}</span>
                  </div>
               ))}
            </div>
         </div>
      </section>
   );
};
