export { default } from "next-auth/middleware";

export const config = {
  matcher: [
    "/admindashboard",  
    "/admindashboard/page",  
    "/dashboard", 
    "/dashboard/page", 

  ],
};
