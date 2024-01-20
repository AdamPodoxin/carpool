import { useAuth0 } from "@auth0/auth0-react";
import HomePage from "./pages/Home";
import SignInPage from "./pages/SignIn";

const App = () => {
	const { isAuthenticated } = useAuth0();

	return isAuthenticated ? <HomePage /> : <SignInPage />;
};

export default App;
