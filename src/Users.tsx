import React, { useEffect } from "react";

// Define the type for the props
interface UsersProps {
  token: string; // Define that 'token' should be of type 'string'
}

const Users: React.FC<UsersProps> = ({ token }) => {
  // Log token before returning JSX
  console.log(token);

  //ignore 
  // 21 mins on video
//   useEffect(() => {

//   },[])
//   const fetchData = async () => {
//     const res = await
//   }

  return (
    <div>
      {/* Render the token */}
      <p>Token: {token}</p>
    </div>
  );
};

export default Users;