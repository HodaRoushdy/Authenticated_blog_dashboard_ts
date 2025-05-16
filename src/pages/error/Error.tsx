import errorAnimation from "../../../public/error.json";
import Lottie from "lottie-react";

const ErrorPage = () => {
	return (
		<Lottie
			animationData={errorAnimation}
			loop={true}
		/>
	);
};
export default ErrorPage;
