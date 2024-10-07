import moment from 'moment';
import { Flex, Modal, Text, Title } from '@mantine/core';

export default function ViewModal({
    opened,
    onClose,
    company,
}: {
    opened: boolean;
    onClose: () => void;
    company: any;
}) {
    return (
        <Modal opened={opened} onClose={onClose} title={company?.name}>
            <Flex direction="column" gap="md">
                <Flex justify="space-between">
                    <Title size="h6">Owner Name</Title>
                    <Text>{company?.ownerName}</Text>
                </Flex>
                <Flex justify="space-between">
                    <Title size="h6">Reference</Title>
                    <Text>{company?.reference}</Text>
                </Flex>
                {company?.headOffice?.address?.countryName && (
                    <Flex justify="space-between">
                        <Title size="h6">Country</Title>
                        <Text>{company?.headOffice?.address?.countryName}</Text>
                    </Flex>
                )}
                {company?.headOffice?.address?.regionName && (
                    <Flex justify="space-between">
                        <Title size="h6">State</Title>
                        <Text>{company?.headOffice?.address?.regionName}</Text>
                    </Flex>
                )}
                {company?.headOffice?.address?.cityName && (
                    <Flex justify="space-between">
                        <Title size="h6">City</Title>
                        <Text>{company?.headOffice?.address?.cityName}</Text>
                    </Flex>
                )}
                {company?.website && (
                    <Flex justify="space-between">
                        <Title size="h6">Website</Title>
                        <Text>{company?.website}</Text>
                    </Flex>
                )}
                {company?.linkedin && (
                    <Flex justify="space-between">
                        <Title size="h6">LinkedIn</Title>
                        <Text>{company?.linkedin}</Text>
                    </Flex>
                )}
                <Flex justify="space-between">
                    <Title size="h6">Created On</Title>
                    <Text>{moment(company?.createdOn).format('ll')}</Text>
                </Flex>
            </Flex>
        </Modal>
    );
}
