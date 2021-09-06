import { Box, Button, Checkbox, Flex, Heading, Icon, Table, Tbody, Td, Th, Thead, Tr, Text, useBreakpointValue, Spinner, Link } from "@chakra-ui/react";
import { GetServerSideProps } from "next";
import NextLink from "next/link";
import React, { useState } from "react";
import { RiAddLine, RiPencilLine } from "react-icons/ri";
import { Header } from "../../components/Header";
import { Pagination } from "../../components/Pagination";
import { SideBar } from "../../components/SideBar";
import { api } from "../../services/api";
import { getUsers, useUsers } from "../../services/hooks/useUsers";
import { queryClient } from "../../services/queryClient";

interface Users {
    users: {
        id: string;
        name: string;
        email: string;
        createdAt: string;
    }[]
}

export default function UserList({ users }: Users) {
    const [page, setPage] = useState(1);
    const { data, isLoading, isFetching, error } = useUsers(page, { initialData: users });


    const isWideVersion = useBreakpointValue({
        base: false,
        lg: true,
    });

    async function handlePrefetchUser(userId: string) {
        await queryClient.prefetchQuery(['user', userId], async () => {
            const response = await api.get(`users/${userId}`);

            return response.data.user;
        })
    }

    return (
        <Box>
            <Header />

            <Flex w="100%" my="6" maxWidth={1480} mx="auto" px="6">
                <SideBar />

                <Box flex="1" borderRadius={8} bg="gray.800" p="8">
                    <Flex mb="8" justify="space-between" align="center">
                        <Heading size="lg" fontWeight="normal">
                            Usuários
                            {!isLoading && isFetching && <Spinner size="sm" color="gray.500" ml="4" />}
                        </Heading>
                        <NextLink href="/users/create" passHref>
                            <Button as="a" size="sm" fontSize="sm" colorScheme="pink" leftIcon={<Icon as={RiAddLine} />}>Criar Novo</Button>
                        </NextLink>
                    </Flex>

                    {isLoading ? (
                        <Flex justify="center">
                            <Spinner />
                        </Flex>
                    ) : error ? (
                        <Flex justify="center">
                            <Text>Falha ao obter dados dos usuários.</Text>
                        </Flex>
                    ) : (
                        <>
                            <Table colorScheme="whiteAlpha">
                                <Thead>
                                    <Tr >
                                        <Th px={['4', '4', '6']} color="gray.300" width="8">
                                            <Checkbox colorScheme="pink" />
                                        </Th>
                                        <Th>Usuários</Th>
                                        {isWideVersion && <Th>Data de Cadastros</Th>}
                                        <Th width="8"></Th>
                                    </Tr>
                                </Thead>
                                <Tbody>
                                    {data?.users?.map((user) => {
                                        return (
                                            <Tr key={user.id}>
                                                <Td px={['4', '4', '6']}>
                                                    <Checkbox colorScheme="pink" />
                                                </Td>
                                                <Td>
                                                    <Box>
                                                        <Link color="purple.400" onMouseEnter={() => handlePrefetchUser(user.id)}>
                                                            <Text fontWeight="bold">{user.name}</Text>
                                                        </Link>
                                                        <Text fontSize="sm" color="gray.300">{user.email}</Text>
                                                    </Box>
                                                </Td>

                                                {isWideVersion && <Td px={['4', '4', '6']}>{user.createdAt}</Td>}
                                                {isWideVersion && (
                                                    <Td>
                                                        <Button as="a" size="sm" fontSize="sm" colorScheme="purple" leftIcon={<Icon as={RiPencilLine} />}>Editar</Button>
                                                    </Td>
                                                )}
                                            </Tr>
                                        )
                                    })}

                                </Tbody>
                            </Table>

                            <Pagination
                                totalCountOfRegisters={data!.totalCount}
                                currentPage={page}
                                onPageChange={setPage}
                            />
                        </>
                    )}
                </Box>
            </Flex>
        </Box>
    )
}

export const getServerSideProps: GetServerSideProps = async () => {
    const { users, totalCount } = await getUsers(1);

    return {
        props: {
            users,
        }
    }
}