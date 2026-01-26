import {useLocation} from "react-router";

const Header = () => {
  const location = useLocation()
  const onBoarding = location.pathname === '/'

  return (
      <div className={`text-emerald-400 p-5 text-3xl mitmiFont ${onBoarding && 'hidden'}`}>
        DADA
      </div>
  );
};

export default Header;