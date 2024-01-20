import { Link } from "react-router-dom";
import LogoutButton from "../../components/LogoutButton";

const HomePage = () => {
	return (
		<>
			<LogoutButton />

			<br />

			<Link to={"/create"}>Create a Ride</Link>
		</>
	);
};

export default HomePage;
