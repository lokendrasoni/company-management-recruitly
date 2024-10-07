import { useState } from 'react';
import { Button, Flex, Input, Modal, Title } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { updateCompany } from '@/apis';

export default function EditModal({
    opened,
    onClose,
    company,
    refetch,
}: {
    opened: boolean;
    onClose: () => void;
    company: any;
    refetch: any;
}) {
    const [companyToEdit, setCompanyToEdit] = useState(company);
    const [loading, setLoading] = useState<boolean>(false);

    const editCompany = (val: any) => {
        setCompanyToEdit((c: any) => {
            return { ...c, ...val };
        });
    };

    const handleEdit = async (e: Event) => {
        e.preventDefault();
        setLoading(true);

        await updateCompany(companyToEdit);
        await refetch();

        notifications.show({
            message: 'Details updated!',
            color: 'green',
        });

        setLoading(false);
    };

    return (
        <Modal
            opened={opened}
            onClose={loading ? () => {} : onClose}
            title={`Edit ${company?.name}`}
        >
            <form onSubmit={handleEdit as any}>
                <Flex direction="column" gap="md">
                    <Flex justify="space-between">
                        <Title size="h6">Owner Name</Title>
                        <Input
                            value={companyToEdit?.ownerName}
                            placeholder="Owner Name"
                            onChange={(e) => {
                                editCompany({ ownerName: e.target.value });
                            }}
                        />
                    </Flex>
                    <Flex justify="space-between">
                        <Title size="h6">Country</Title>
                        <Input
                            value={company?.headOffice?.address?.countryName}
                            placeholder="Country"
                            onChange={(e) => {
                                editCompany({
                                    headOffice: {
                                        address: {
                                            countryName: e.target.value,
                                        },
                                    },
                                });
                            }}
                        />
                    </Flex>
                    <Flex justify="space-between">
                        <Title size="h6">State</Title>
                        <Input
                            value={company?.headOffice?.address?.regionName}
                            placeholder="State"
                            onChange={(e) => {
                                editCompany({
                                    headOffice: {
                                        address: {
                                            regionName: e.target.value,
                                        },
                                    },
                                });
                            }}
                        />
                    </Flex>
                    <Flex justify="space-between">
                        <Title size="h6">City</Title>
                        <Input
                            value={company?.headOffice?.address?.cityName}
                            placeholder="City"
                            onChange={(e) => {
                                editCompany({
                                    headOffice: {
                                        address: {
                                            cityName: e.target.value,
                                        },
                                    },
                                });
                            }}
                        />
                    </Flex>
                    <Flex justify="space-between">
                        <Title size="h6">Website</Title>
                        <Input
                            value={companyToEdit?.website}
                            placeholder="Website"
                            onChange={(e) => {
                                editCompany({ website: e.target.value });
                            }}
                        />
                    </Flex>
                    <Flex justify="space-between">
                        <Title size="h6">LinkedIn</Title>
                        <Input
                            value={companyToEdit?.linkedin}
                            placeholder="LinkedIn"
                            onChange={(e) => {
                                editCompany({ linkedin: e.target.value });
                            }}
                        />
                    </Flex>
                    <Flex justify="space-around">
                        <Button type="submit" color="green" loading={loading}>
                            Edit
                        </Button>
                        <Button type="button" onClick={onClose} disabled={loading} color="red">
                            Cancel
                        </Button>
                    </Flex>
                </Flex>
            </form>
        </Modal>
    );
}
