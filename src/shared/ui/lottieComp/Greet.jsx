import Lottie from 'lottie-react';
import greet from '@shared/assets/lotties/signup.json';

const Greet = () => {
    return <Lottie animationData={greet} loop={true} />;
};

export default Greet;