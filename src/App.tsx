import { useAuth0 } from "@auth0/auth0-react";
import HomePage from "./pages/Home";
import SignInPage from "./pages/LogIn";
import LogoutButton from "./components/LogoutButton";

import "./App.css";

const App = () => {
	const { isAuthenticated } = useAuth0();

	return (
		<>
			<div className="topBar">
				<span>
					<h1>Carpool</h1>
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
