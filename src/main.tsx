import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { Auth0Provider } from "@auth0/auth0-react";
import { AUTH_CLIENT_ID, AUTH_DOMAIN } from "./lib/constants.ts";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import AddressFill from "./pages/Address/index.tsx";

const router = createBrowserRouter([
	{
		path: "/",
		element: <App />,
	},
	{
		path: "/fill",
		element: <AddressFill />,
	},
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
	<React.StrictMode>
		<Auth0Provider
			domain={AUTH_DOMAIN}
			clientId={AUTH_CLIENT_ID}
			authorizationParams={{
				redirect_uri: window.location.origin,
			}}
		>
			<RouterProvider router={router} />
		</Auth0Provider>
	</React.StrictMode>
);
