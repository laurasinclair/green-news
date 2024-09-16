import {
	createContext,
	useCallback,
	useContext,
	useEffect,
	useState,
} from 'react';
import { useNavigate } from 'react-router-dom';

import { fetchUser } from 'api';
import { paths } from 'router/paths';
import { getData, storeData } from 'utils';
import { User } from 'src/types';

const UserContext = createContext({});
export const useUserContext = () => useContext(UserContext);

export const getUser = async (): Promise<User | void> => {
	try {
		const userRes = await fetchUser('johndoe01');
		if (!userRes._id) {
			throw new Error("User couldn't be found");
		}
		storeData('storedUser', userRes);
		return userRes;
	} catch (error) {
		console.error(error);
	}
};

const UserContextProvider: React.FC<{ children: React.ReactNode }> = ({
	children,
}) => {
	const navigate = useNavigate();

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

	const setUser = useCallback((newUser: User): void => {
		setCurrentUser((prev) => ({
			...prev,
			_id: newUser._id,
			userInfo: {
				...newUser.userInfo,
			},
		}));
	}, []);

	useEffect(() => {
		if (currentUser._id && !currentUser.isLoggedIn) {
			setCurrentUser((prev) => ({
				...prev,
				isLoggedIn: true,
			}));
		}
	}, [setUser, currentUser, setCurrentUser]);

	useEffect(() => {
		const fetchData = async (): Promise<void> => {
			try {
				const storedUser = getData('storedUser');
				if (!storedUser) {
					const user: User | void = await getUser();
					if (!user) {
						throw new Error('Problem retrieving user');
					}
					setUser(user);
				} else {
					setUser(storedUser);
				}
			} catch (error) {
				console.log(error);
			}
		};

		fetchData();
	}, [getUser, setUser]);

	const handleLogOut = (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();

		setCurrentUser((prev) => ({
			...prev,
			isLoggedIn: false,
		}));
		navigate(paths.base);
	};

	return (
		<UserContext.Provider
			value={{ currentUser, setCurrentUser, handleLogOut }}>
			{children}
		</UserContext.Provider>
	);
};

export default UserContextProvider;
