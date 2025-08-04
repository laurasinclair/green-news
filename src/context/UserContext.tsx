import {
	createContext,
	useCallback,
	useContext,
	useEffect,
	useState,
} from 'react';

import { fetchUser } from 'api';
import { getData, storeData } from 'utils';
import { User } from 'src/types';

interface UserContextType {
	currentUser: User;
	setCurrentUser: React.Dispatch<React.SetStateAction<User>>;
	handleLogOut: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const useUserContext = () => {
	const context = useContext(UserContext);
	return context;
};

const getUserData = async (username: string): Promise<User | null> => {
	try {
		const localStorageUser = await getData(username);
		if (localStorageUser) {
			return localStorageUser;
		}

		const fetchedUser = await fetchUser(username);
		storeData(username, fetchedUser);
		return fetchedUser;
	} catch (error) {
		console.log("❌ getUserData()", error);
		return null;
	}
};

const UserContextProvider: React.FC<{ children: React.ReactNode }> = ({
	children,
}) => {
	const [currentUser, setCurrentUser] = useState<User>({
		_id: undefined,
		isLoggedIn: false,
		userInfo: {
			username: undefined,
			firstName: undefined,
			lastName: undefined,
			savedArticles: [],
			profilePicture: undefined,
		},
	});

	const updateUser = useCallback((user: User) => {
		setCurrentUser(user);
	}, []);

	const initializeUser = useCallback(async () => {
		try {
			const user = await getUserData("johndoe01");
			if (!user) throw new Error("user not found");
			updateUser(user);
		} catch (error) {
			console.error("❌ initializeUser()", error);
		}
	}, []);

	const handleLogOut = () => {
		try {
			setCurrentUser({ ...currentUser, isLoggedIn: false });
		} catch (error) {
			console.error("Error logging out:", error);
		}
	};

	useEffect(() => {
		initializeUser();
	}, []);

	return (
		<UserContext.Provider
			value={{ currentUser, setCurrentUser, handleLogOut }}>
			{children}
		</UserContext.Provider>
	);
};

export default UserContextProvider;
