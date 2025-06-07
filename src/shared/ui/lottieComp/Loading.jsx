import Lottie from 'lottie-react';
import loading from '@shared/assets/lotties/LoadReport.json';

const Loading = () => {
    return <Lottie animationData={loading} loop={true} />;
};

export default Loading;
