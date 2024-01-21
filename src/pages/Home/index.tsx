import { useNavigate } from "react-router-dom";
import Button from "../../components/Button";

const HomePage = () => {
	const navigate = useNavigate();

	return (
		<>
			<Button onClick={() => navigate("/create")}>Create a ride</Button>
		</>
	);
};

export default HomePage;
