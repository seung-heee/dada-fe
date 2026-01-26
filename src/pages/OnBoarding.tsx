import {useNavigate} from "react-router";
import {useEffect} from "react";

const OnBoarding = () => {
  const navigate = useNavigate()

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/meetingName')
    }, 2000)

    return () => clearTimeout(timer)
  }, [navigate]);


  return (
      <div className='MitmiFont flex flex-col justify-center min-h-screen P-10 pl-10 text-5xl gap-2'>
        <p className='animate-bounce text-emerald-400 text-7xl'>DADA</p>
        <p className='animate-bounce'>
          <span className='text-emerald-400'>다</span> 같이,
          <span className='text-emerald-400'> 다</span> 되는 날
        </p>
      </div>
  );
};

export default OnBoarding;