const style = {
	multiValue: (style) => {
		return {
			...style,
			borderRadius: "18px",
			backgroundColor: "#323232",
			color: "#fff",
			border: "1px solid #7a7a7a",
			padding: "1px 5px",
			marginBottom: "3px",
		};
	},
	multiValueRemove: (base) => ({
		...base,
		"&:hover": {
			backgroundColor: "rgba(255,255,255,0)",
		},
	}),
	multiValueLabel: (base) => ({
		...base,
		color: "white",
		maxWidth: "74px",
	}),
	option: (base) => ({
		...base,
		fontFamily: "Poppins",
		cursor: "pointer !important",
		fontSize: "0.95em",
		fontWeight: "300",
		backgroundColor: "rgba(35, 66, 39, 0.85)",
		padding: "6px 15px",
		"&:hover": {
			backgroundColor: "#54a611",
		},
	}),
	control: (base, state) => ({
		...base,
		fontFamily: "Poppins",
		fontSize: "0.85rem",
		fontWeight: "300",
		background: "#323232",
		borderRadius: state.isFocused ? "3px 3px 0 0" : 3,
		borderColor: state.isFocused ? "#FCAC0D" : "#323232",
		boxShadow: state.isFocused ? null : null,
		cursor: "pointer !important",
		"&:hover": {
			borderColor: "#FCAC0D",
		},
	}),
	dropdownIndicator: (base) => ({
		...base,
		color: "#FCAC0D",
		"&:hover": {
			color: "#FCAC0D",
			cursor: "pointer !important",
		},
	}),
	clearIndicator: (base) => ({
		...base,
		color: "#FCAC0D",
		"&:hover": {
			color: "#FCAC0D",
			cursor: "pointer !important",
		},
	}),
	menu: (base) => ({
		...base,
		marginTop: 0,
		fontFamily: "Poppins",
		backgroundColor: "rgba(35, 66, 39, 0.85)",
		backdropFilter: "blur(5px)",
		borderRadius: "6px !important",
		"&:hover": {
			borderRadius: "6px",
			cursor: "pointer !important",
		},
	}),
	menuList: (base) => ({
		...base,
		fontSize: "0.95rem",
		color: "#fff",
		borderRadius: "6px !important",
		"&:hover": {
			cursor: "pointer !important",
		},
	}),
};

export default style;
