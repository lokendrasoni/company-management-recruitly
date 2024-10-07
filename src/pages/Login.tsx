import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Center, Input, PasswordInput, Title } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import UserStore from '@/contexts/UserStore';
import useSetTitle from '@/hooks/useSetTitle';

export function Login() {
    const { isLogin, setIsLogin } = useContext(UserStore);

    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const navigate = useNavigate();

    useSetTitle('Login');

    useEffect(() => {
        if (isLogin) {
            navigate('/home', { replace: true });
        }
    }, [isLogin]);

    const handleLogin = (e: Event): void => {
        e.preventDefault();

        if (!username || !password) {
            notifications.show({
                message: 'Please provide username and password',
                color: 'red',
            });
            return;
        }

        if (username === 'admin' && password === 'test') {
            localStorage.setItem('isLogin', 'true');
            setIsLogin(true);
        } else {
            notifications.show({
                message: 'Username or password does not match',
                color: 'red',
            });
        }
    };

    return (
        <>
            <Center
                maw="100dvw"
                h="100dvh"
                bg="var(--mantine-color-gray-light)"
                display="flex"
                style={{
                    flexDirection: 'column',
                    gap: '20px',
                }}
            >
                <Title>Login</Title>
                <Title size="h3">Please use admin as username and test as password</Title>
                <form
                    style={{
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        gap: '20px',
                        width: '100%',
                        display: 'flex',
                    }}
                    onSubmit={handleLogin as any}
                >
                    <Input
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="Username"
                        name="username"
                        type="text"
                        style={{
                            width: '20%',
                        }}
                    />
                    <PasswordInput
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Password"
                        name="password"
                        style={{
                            width: '20%',
                        }}
                    />
                    <Button type="submit">Login</Button>
                </form>
            </Center>
        </>
    );
}
