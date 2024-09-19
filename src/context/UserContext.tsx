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
	if (!context) {
		throw new Error(
			'useUserContext must be used within a UserContextProvider'
		);
	}
	return context;
};

const fetchUserData = async (username: string): Promise<User | null> => {
	try {
		const user = await fetchUser(username);
		if (!user._id) throw new Error("User couldn't be found");
		storeData('storedUser', user);
		return user;
	} catch (error) {
		console.error('Error fetching user:', error);
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
			const storedUser = await getData('storedUser');
			if (storedUser) {
				updateUser(storedUser);
			} else {
				const user = await fetchUserData('johndoe01');
				if (user) updateUser(user);
			}
		} catch (error) {
			console.error('Error initializing user:', error);
		}
	}, [updateUser]);

	const handleLogOut = () => {
		if (currentUser?._id) {
			setCurrentUser({ ...currentUser, isLoggedIn: false });
		}
	};

	useEffect(() => {
		initializeUser();
	}, [initializeUser]);

	return (
		<UserContext.Provider
			value={{ currentUser, setCurrentUser, handleLogOut }}>
			{children}
		</UserContext.Provider>
	);
};

export default UserContextProvider;
