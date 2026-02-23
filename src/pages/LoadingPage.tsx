import { DotLottieReact } from '@lottiefiles/dotlottie-react';

const LoadingPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center w-full">
      <DotLottieReact
        src="https://lottie.host/5dda0de6-8b47-4fde-8d7f-cebef88e0134/Ob7giARYYc.lottie"
        loop
        autoplay
        style={{ width: '500px' }}
      />
    </div>
  );
};

export default LoadingPage;
