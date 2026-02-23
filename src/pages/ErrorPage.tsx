import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import BottomButton from '@/components/shared/BottomButton.tsx';
import { useNavigate } from 'react-router';

const ErrorPage = () => {
  const navigate = useNavigate();

  return (
    <div className="app-wrapper min-h-screen flex items-center justify-center w-full">
      <DotLottieReact
        src="https://lottie.host/8a599637-ebf7-4a73-b64a-81eccc37d141/OMuORGdsAm.json"
        loop
        autoplay
        style={{ width: '500px' }}
      />
      <BottomButton text="Home" onClick={() => navigate('/')} />
    </div>
  );
};

export default ErrorPage;
