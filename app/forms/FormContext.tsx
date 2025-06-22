import React, {
	createContext,
	useContext,
	useState,
	ReactNode,
	useEffect,
} from "react";
import { getAuth } from "firebase/auth";
import {
	getFirestore,
	collection,
	addDoc,
	getDocs,
	query,
	where,
} from "firebase/firestore";
import { app } from "../../firebaseConfig";

interface PersonData {
	id?: string;
	name: string;
	height: string;
	industry: string;
	home: string;
	hair_color: string;
	eye_color: string;
	createdAt?: any;
	authorId?: string;
}

interface DateData {
	id?: string;
	personId: string;
	personName: string;
	date: string;
	date_num: string;
	how_we_met: string;
	activity: string;
	rating: string;
	emoji: string;
	icks: string;
	liked: string;
	mutuals: string;
	createdAt?: any;
	authorId?: string;
}

interface FormData {
	// Person being added/edited
	currentPerson: PersonData;
	// Date being added/edited
	currentDate: DateData;
	// List of all people (for selection)
	people: PersonData[];
	// List of all dates
	dates: DateData[];
	// Loading states
	loading: boolean;
}

interface FormContextType {
	formData: FormData;
	updatePersonData: (field: keyof PersonData, value: string) => void;
	updateDateData: (field: keyof DateData, value: string) => void;
	addPerson: (person: PersonData) => Promise<void>;
	addDate: (date: DateData) => Promise<void>;
	loadPeople: () => Promise<void>;
	loadDates: () => Promise<void>;
	clearPersonData: () => void;
	clearDateData: () => void;
	clearAllData: () => void;
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
		currentPerson: {
			name: "",
			height: "",
			industry: "",
			home: "",
			hair_color: "",
			eye_color: "",
		},
		currentDate: {
			personId: "",
			personName: "",
			date: "",
			date_num: "",
			how_we_met: "",
			activity: "",
			rating: "",
			emoji: "",
			icks: "",
			liked: "",
			mutuals: "",
		},
		people: [],
		dates: [],
		loading: false,
	});

	const auth = getAuth(app);
	const db = getFirestore(app);

	// Load people and dates when the provider mounts
	useEffect(() => {
		if (auth.currentUser) {
			loadPeople();
			loadDates();
		}
	}, [auth.currentUser]);

	const updatePersonData = (field: keyof PersonData, value: string) => {
		setFormData((prev) => ({
			...prev,
			currentPerson: {
				...prev.currentPerson,
				[field]: value,
			},
		}));
	};

	const updateDateData = (field: keyof DateData, value: string) => {
		setFormData((prev) => ({
			...prev,
			currentDate: {
				...prev.currentDate,
				[field]: value,
			},
		}));
	};

	const addPerson = async (person: PersonData) => {
		if (!auth.currentUser) return;

		try {
			setFormData((prev) => ({ ...prev, loading: true }));

			const personData = {
				...person,
				authorId: auth.currentUser.uid,
				authorEmail: auth.currentUser.email,
				createdAt: new Date(),
			};

			// Add to Firebase
			const docRef = await addDoc(collection(db, "people"), personData);

			// Add to local state with Firebase ID
			const newPerson = { ...personData, id: docRef.id };
			setFormData((prev) => ({
				...prev,
				people: [...prev.people, newPerson],
				loading: false,
			}));
		} catch (error) {
			console.error("Error adding person:", error);
			setFormData((prev) => ({ ...prev, loading: false }));
		}
	};

	const addDate = async (date: DateData) => {
		if (!auth.currentUser) return;

		try {
			setFormData((prev) => ({ ...prev, loading: true }));

			const dateData = {
				...date,
				authorId: auth.currentUser.uid,
				authorEmail: auth.currentUser.email,
				createdAt: new Date(),
			};

			// Add to Firebase
			const docRef = await addDoc(collection(db, "dates"), dateData);

			// Add to local state with Firebase ID
			const newDate = { ...dateData, id: docRef.id };
			setFormData((prev) => ({
				...prev,
				dates: [...prev.dates, newDate],
				loading: false,
			}));
		} catch (error) {
			console.error("Error adding date:", error);
			setFormData((prev) => ({ ...prev, loading: false }));
		}
	};

	const loadPeople = async () => {
		if (!auth.currentUser) return;

		try {
			setFormData((prev) => ({ ...prev, loading: true }));

			const peopleRef = collection(db, "people");
			const q = query(peopleRef, where("authorId", "==", auth.currentUser.uid));

			const querySnapshot = await getDocs(q);
			const peopleData: PersonData[] = [];

			querySnapshot.forEach((doc) => {
				peopleData.push({
					id: doc.id,
					...doc.data(),
				} as PersonData);
			});

			// Sort by createdAt in JavaScript
			peopleData.sort((a, b) => {
				const dateA = a.createdAt?.toDate?.() || a.createdAt || new Date(0);
				const dateB = b.createdAt?.toDate?.() || b.createdAt || new Date(0);
				return dateB.getTime() - dateA.getTime();
			});

			setFormData((prev) => ({
				...prev,
				people: peopleData,
				loading: false,
			}));
		} catch (error) {
			console.error("Error loading people:", error);
			setFormData((prev) => ({ ...prev, loading: false }));
		}
	};

	const loadDates = async () => {
		if (!auth.currentUser) return;

		try {
			setFormData((prev) => ({ ...prev, loading: true }));

			const datesRef = collection(db, "dates");
			const q = query(datesRef, where("authorId", "==", auth.currentUser.uid));

			const querySnapshot = await getDocs(q);
			const datesData: DateData[] = [];

			querySnapshot.forEach((doc) => {
				datesData.push({
					id: doc.id,
					...doc.data(),
				} as DateData);
			});

			// Sort by createdAt in JavaScript
			datesData.sort((a, b) => {
				const dateA = a.createdAt?.toDate?.() || a.createdAt || new Date(0);
				const dateB = b.createdAt?.toDate?.() || b.createdAt || new Date(0);
				return dateB.getTime() - dateA.getTime();
			});

			setFormData((prev) => ({
				...prev,
				dates: datesData,
				loading: false,
			}));
		} catch (error) {
			console.error("Error loading dates:", error);
			setFormData((prev) => ({ ...prev, loading: false }));
		}
	};

	const clearPersonData = () => {
		setFormData((prev) => ({
			...prev,
			currentPerson: {
				name: "",
				height: "",
				industry: "",
				home: "",
				hair_color: "",
				eye_color: "",
			},
		}));
	};

	const clearDateData = () => {
		setFormData((prev) => ({
			...prev,
			currentDate: {
				personId: "",
				personName: "",
				date: "",
				date_num: "",
				how_we_met: "",
				activity: "",
				rating: "",
				emoji: "",
				icks: "",
				liked: "",
				mutuals: "",
			},
		}));
	};

	const clearAllData = () => {
		setFormData({
			currentPerson: {
				name: "",
				height: "",
				industry: "",
				home: "",
				hair_color: "",
				eye_color: "",
			},
			currentDate: {
				personId: "",
				personName: "",
				date: "",
				date_num: "",
				how_we_met: "",
				activity: "",
				rating: "",
				emoji: "",
				icks: "",
				liked: "",
				mutuals: "",
			},
			people: [],
			dates: [],
			loading: false,
		});
	};

	return (
		<FormContext.Provider
			value={{
				formData,
				updatePersonData,
				updateDateData,
				addPerson,
				addDate,
				loadPeople,
				loadDates,
				clearPersonData,
				clearDateData,
				clearAllData,
			}}
		>
			{children}
		</FormContext.Provider>
	);
};
