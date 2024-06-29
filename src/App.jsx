import { HomePage, Article, UserPage, NotFound } from '@pages';
import { Navbar, Footer, Main } from '@components';
import { FeedContextProvider, UserContextProvider } from '@context';

import { Routes, Route, Navigate } from 'react-router-dom';

function App() {
    return (
        <div className="App">
            <UserContextProvider>
                <FeedContextProvider>
                    <Navbar />

                    <Main>
                        <Routes>
                            <Route path="/" element={<HomePage />} />
                            <Route
                                path="/articles/:articleSlug"
                                element={<Article />}
                            />
                            <Route
                                path="/user/:username"
                                element={<UserPage />}
                            />
                            <Route path="*" element={<NotFound />} />
                        </Routes>
                    </Main>

                    <Footer />
                </FeedContextProvider>
            </UserContextProvider>
        </div>
    );
}

export default App;
