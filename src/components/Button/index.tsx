import { ReactNode } from "react";
import "./style.css";

type ButtonProps = {
	children: ReactNode;
	onClick: Function;
	className?: string;
};

const Button = ({ children, onClick, className }: ButtonProps) => {
	return (
		<button className={`button ${className}`} onClick={() => onClick()}>
			{children}
		</button>
	);
};

export default Button;
