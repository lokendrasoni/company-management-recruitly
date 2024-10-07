import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';

import { useState } from 'react';
import { MantineProvider } from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import UserStore from './contexts/UserStore';
import { Router } from './Router';
import { theme } from './theme';

export default function App() {
    const [isLogin, setIsLogin] = useState(localStorage.getItem('isLogin') === 'true');

    return (
        <MantineProvider theme={theme}>
            <Notifications position="top-right" />
            <UserStore.Provider value={{ isLogin, setIsLogin }}>
                <Router />
            </UserStore.Provider>
        </MantineProvider>
    );
}
