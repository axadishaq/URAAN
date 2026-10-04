// Safe access to the logged-in user stored by the Login page
export const getCurrentUser = () => {
   try {
      return JSON.parse(localStorage.getItem("currentUser"));
   } catch {
      localStorage.removeItem("currentUser");
      return null;
   }
};
