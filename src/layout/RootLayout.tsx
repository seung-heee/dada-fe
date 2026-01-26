import {Outlet} from "react-router";
import Header from "@/components/Header.tsx";

const RootLayout = () => {
  return (
      <div className='app-wrapper'>
        <Header/>
        <div className='p-5'>
          <Outlet/>
        </div>
      </div>
  );

};

export default RootLayout;