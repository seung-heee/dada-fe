import { useNavigate } from 'react-router';
import { useEffect } from 'react';

const OnBoardingPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/create-room');
    }, 2000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="flex flex-col justify-center min-h-screen p-10 pl-4 text-5xl gap-2">
      <p className="animate-bounce text-emerald-400 text-7xl mitmiFont">DADA</p>
      <p className="animate-bounce mitmiFont">
        <span className="text-emerald-400 mitmiFont">다</span> 같이,
        <span className="text-emerald-400 mitmiFont"> 다</span> 되는 날
      </p>
    </div>
  );
};

export default OnBoardingPage;
