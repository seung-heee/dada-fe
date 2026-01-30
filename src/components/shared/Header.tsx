import { Link, useLocation } from 'react-router';

const Header = () => {
  const location = useLocation();
  const onBoarding = location.pathname === '/';

  return (
    <div className={`p-5 ${onBoarding && 'hidden'}`}>
      <Link to="/" className="flex gap-2">
        <span className="text-emerald-400 text-3xl mitmiFont">DADA</span>
      </Link>
    </div>
  );
};

export default Header;
