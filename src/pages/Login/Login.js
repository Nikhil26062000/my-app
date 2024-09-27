// import React, { useEffect } from "react";
// import Login_Container from "./Login_Container";

// const Login = () => {
  
//   return (
//     <main className="box-border px-5">
//       <section className="relative w-[100%] h-[100vh] ">
//         <Login_Container />
//       </section>
//     </main>
//   );
// };

// export default Login;





import React, { useState, useEffect } from "react";
import Login_Container from "./Login_Container";
import LoadingAnimation from "../../components/LoadingAnimation";

const Login = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
   
  }, []);

  return (
    <main className="box-border px-5">
      <section className="relative w-[100%] h-[100vh] ">
        

          <Login_Container />
        
      </section>
    </main>
  );
};

export default Login;
