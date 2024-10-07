import { useCallback, useContext, useEffect, useState } from 'react';
import { IconEye, IconMoon, IconPencil, IconSun } from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';
import {
    AppShell,
    Button,
    Center,
    Flex,
    Loader,
    rem,
    Table,
    Text,
    Title,
    Tooltip,
    useMantineColorScheme,
} from '@mantine/core';
import { listCompany } from '@/apis';
import EditModal from '@/components/Modals/EditModal';
import ViewModal from '@/components/Modals/ViewModal';
import UserStore from '@/contexts/UserStore';
import useSetTitle from '@/hooks/useSetTitle';

export default function Home() {
    useSetTitle('Home');

    const { isLogin, setIsLogin } = useContext(UserStore);
    const navigate = useNavigate();
    const { setColorScheme, colorScheme } = useMantineColorScheme();

    const [companies, setCompanies] = useState<any>(null);
    const [openEdit, setOpenEdit] = useState<boolean>(false);
    const [openView, setOpenView] = useState<boolean>(false);
    const [selectedCompany, setSelectedCompany] = useState<any>(null);

    useEffect(() => {
        if (!isLogin) {
            navigate('/', { replace: true });
        }
    }, [isLogin]);

    const getCompanies = useCallback(async () => {
        const data: any = await listCompany();

        setCompanies(data);
    }, []);

    useEffect(() => {
        getCompanies();
    }, [getCompanies]);

    return (
        <AppShell
            header={{ height: 60 }}
            navbar={{
                width: 300,
                breakpoint: 'sm',
            }}
            padding="md"
        >
            <AppShell.Header
                style={{
                    display: 'flex',
                    justifyContent: 'end',
                    alignItems: 'center',
                    paddingRight: '20px',
                    gap: '10px',
                }}
            >
                <Button
                    variant="default"
                    onClick={() => {
                        setColorScheme(colorScheme === 'light' ? 'dark' : 'light');
                    }}
                >
                    {colorScheme === 'light' ? <IconMoon /> : <IconSun />}
                </Button>
                <Button
                    color="red"
                    onClick={() => {
                        localStorage.removeItem('isLogin');
                        setIsLogin(false);
                    }}
                >
                    Logout
                </Button>
            </AppShell.Header>
            <AppShell.Main px={`calc(${rem(60)} + var(--mantine-spacing-md))`}>
                <Title mb="20px">Companies</Title>

                {companies?.length ? (
                    <Table striped highlightOnHover withTableBorder>
                        <Table.Thead>
                            <Table.Tr>
                                <Table.Th>Company Name</Table.Th>
                                <Table.Th>Owner Name</Table.Th>
                                <Table.Th>Reference</Table.Th>
                                <Table.Th />
                            </Table.Tr>
                        </Table.Thead>
                        <Table.Tbody>
                            {companies?.map((company: any) => {
                                return (
                                    <Table.Tr key={company?.id}>
                                        <Table.Td>{company?.name}</Table.Td>
                                        <Table.Td>{company?.ownerName}</Table.Td>
                                        <Table.Td>{company?.reference}</Table.Td>
                                        <Table.Td>
                                            <Flex justify="space-around">
                                                <Tooltip label="View">
                                                    <Button
                                                        onClick={() => {
                                                            setSelectedCompany(company);
                                                            setOpenView(true);
                                                        }}
                                                    >
                                                        <IconEye />
                                                    </Button>
                                                </Tooltip>
                                                <Tooltip label="Edit">
                                                    <Button
                                                        color="green"
                                                        onClick={() => {
                                                            setSelectedCompany(company);
                                                            setOpenEdit(true);
                                                        }}
                                                    >
                                                        <IconPencil />
                                                    </Button>
                                                </Tooltip>
                                            </Flex>
                                        </Table.Td>
                                    </Table.Tr>
                                );
                            })}
                        </Table.Tbody>
                    </Table>
                ) : !companies ? (
                    <Center maw="100dvw" h="100dvh">
                        <Loader color="blue" />
                    </Center>
                ) : !companies?.length ? (
                    <Text style={{ textAlign: 'center' }}>No Company Found.</Text>
                ) : (
                    <Center maw="100dvw" h="100dvh">
                        <Loader color="blue" />
                    </Center>
                )}

                {/* Edit Modal */}
                <EditModal
                    opened={openEdit}
                    onClose={() => {
                        setSelectedCompany(null);
                        setOpenEdit(false);
                    }}
                    company={selectedCompany}
                    refetch={getCompanies}
                />

                {/* View Modal */}
                <ViewModal
                    opened={openView}
                    onClose={() => {
                        setSelectedCompany(null);
                        setOpenView(false);
                    }}
                    company={selectedCompany}
                />
            </AppShell.Main>
        </AppShell>
    );
}
