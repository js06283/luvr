import React, { createContext, useContext, useState, ReactNode } from "react";

interface FormData {
	date: string;
	date_num: string;
	name: string;
	height: string;
	industry: string;
	home: string;
	hair_color: string;
	eye_color: string;
	how_we_met: string;
	activity: string;
	rating: string;
	emoji: string;
	icks: string;
	liked: string;
	mutuals: string;
}

interface FormContextType {
	formData: FormData;
	updateFormData: (field: keyof FormData, value: string) => void;
	clearFormData: () => void;
}

const FormContext = createContext<FormContextType | undefined>(undefined);

export const useFormData = () => {
	const context = useContext(FormContext);
	if (!context) {
		throw new Error("useFormData must be used within a FormProvider");
	}
	return context;
};

interface FormProviderProps {
	children: ReactNode;
}

export const FormProvider: React.FC<FormProviderProps> = ({ children }) => {
	const [formData, setFormData] = useState<FormData>({
		date: "",
		date_num: "",
		name: "",
		height: "",
		industry: "",
		home: "",
		hair_color: "",
		eye_color: "",
		how_we_met: "",
		activity: "",
		rating: "",
		emoji: "",
		icks: "",
		liked: "",
		mutuals: "",
	});

	const updateFormData = (field: keyof FormData, value: string) => {
		setFormData((prev) => ({
			...prev,
			[field]: value,
		}));
	};

	const clearFormData = () => {
		setFormData({
			date: "",
			date_num: "",
			name: "",
			height: "",
			industry: "",
			home: "",
			hair_color: "",
			eye_color: "",
			how_we_met: "",
			activity: "",
			rating: "",
			emoji: "",
			icks: "",
			liked: "",
			mutuals: "",
		});
	};

	return (
		<FormContext.Provider value={{ formData, updateFormData, clearFormData }}>
			{children}
		</FormContext.Provider>
	);
};
