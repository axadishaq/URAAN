// ---------- Buttons (class names, usable on <button> and <Link>) ----------
const base =
   "inline-flex items-center justify-center gap-2 rounded-xl font-semibold transition-colors disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer";
export const btn = {
   primary: `${base} bg-ink text-white hover:bg-[#4a1e14] h-12 px-6`,
   secondary: `${base} bg-white text-ink border border-ink hover:bg-blush h-12 px-6`,
   accent: `${base} bg-peach text-ink hover:bg-[#e8916c] h-12 px-6`,
   danger: `${base} bg-white text-danger border border-[#e7b9b3] hover:bg-danger-bg h-10 px-4 text-sm`,
   success: `${base} bg-success text-white hover:bg-[#175730] h-10 px-4 text-sm`,
   ghost: `${base} text-ink hover:bg-blush h-10 px-3`,
   small: `${base} bg-white text-ink border border-line-strong hover:bg-blush h-10 px-4 text-sm`,
   smallDark: `${base} bg-ink text-white hover:bg-[#4a1e14] h-10 px-4 text-sm`,
};
