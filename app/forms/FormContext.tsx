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
	doc,
	updateDoc,
} from "firebase/firestore";
import { app } from "../../firebaseConfig";

interface PersonData {
	id?: string;
	name: string;
	age: string;
	industry: string; // "What they do"
	how_we_met: string; // "How did you meet"
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
	location: string;
	time_of_day: string;
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
	addPerson: (person: PersonData) => Promise<string | undefined>;
	updatePerson: (
		personId: string,
		personData: Partial<PersonData>
	) => Promise<void>;
	setCurrentPersonById: (personId: string) => void;
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
			age: "",
			industry: "",
			how_we_met: "",
		},
		currentDate: {
			personId: "",
			personName: "",
			date: "",
			date_num: "",
			how_we_met: "",
			activity: "",
			location: "",
			time_of_day: "",
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

	const addPerson = async (person: PersonData): Promise<string | undefined> => {
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
				currentPerson: newPerson,
				loading: false,
			}));
			return docRef.id;
		} catch (error) {
			console.error("Error adding person:", error);
			setFormData((prev) => ({ ...prev, loading: false }));
		}
	};

	const updatePerson = async (
		personId: string,
		personData: Partial<PersonData>
	) => {
		if (!auth.currentUser) return;

		try {
			setFormData((prev) => ({ ...prev, loading: true }));
			const personRef = doc(db, "people", personId);
			await updateDoc(personRef, personData);

			// Update local state
			const updatedPeople = formData.people.map((p) =>
				p.id === personId ? { ...p, ...personData } : p
			);

			setFormData((prev) => ({
				...prev,
				people: updatedPeople,
				currentPerson: { ...prev.currentPerson, ...personData },
				loading: false,
			}));
		} catch (error) {
			console.error("Error updating person:", error);
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
			const q = query(
				collection(db, "people"),
				where("authorId", "==", auth.currentUser.uid)
			);
			const querySnapshot = await getDocs(q);
			const peopleList: PersonData[] = querySnapshot.docs.map((doc) => {
				const data = doc.data();
				return {
					id: doc.id,
					name: data.name || "",
					age: String(data.age || ""), // Ensure age is always a string
					industry: data.industry || "",
					how_we_met: data.how_we_met || "",
					createdAt: data.createdAt?.toDate(),
					authorId: data.authorId,
					authorEmail: data.authorEmail,
				};
			});
			setFormData((prev) => ({
				...prev,
				people: peopleList,
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

	const setCurrentPersonById = (personId: string) => {
		const person = formData.people.find((p) => p.id === personId);
		if (person) {
			setFormData((prev) => ({
				...prev,
				currentPerson: person,
			}));
		}
	};

	const clearPersonData = () => {
		setFormData((prev) => ({
			...prev,
			currentPerson: {
				name: "",
				age: "",
				industry: "",
				how_we_met: "",
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
				location: "",
				time_of_day: "",
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
				age: "",
				industry: "",
				how_we_met: "",
			},
			currentDate: {
				personId: "",
				personName: "",
				date: "",
				date_num: "",
				how_we_met: "",
				activity: "",
				location: "",
				time_of_day: "",
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
				updatePerson,
				setCurrentPersonById,
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
