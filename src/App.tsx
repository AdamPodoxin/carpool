import { useAuth0 } from "@auth0/auth0-react";
import HomePage from "./pages/Home";
import SignInPage from "./pages/LogIn";
import LogoutButton from "./components/LogoutButton";

import "./App.css";

import carIcon from "./assets/icons/favicon-32x32.png";

const App = () => {
	const { isAuthenticated } = useAuth0();

	return (
		<>
			<div className="topBar">
				<span>
					<h1>
						<img src={carIcon} alt="car-icon"></img> Carpool
					</h1>
				</span>
				{isAuthenticated && (
					<span>
						<LogoutButton />
					</span>
				)}
			</div>

			<div className="content">
				{!isAuthenticated && <SignInPage />}
				{isAuthenticated && <HomePage />}
			</div>
		</>
	);
};

export default App;
