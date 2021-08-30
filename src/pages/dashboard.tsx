import { Box, Flex, SimpleGrid, Text, theme } from '@chakra-ui/react'
import dynamic from 'next/dynamic';
import { NextPage } from 'next'
import { Header } from '../components/Header'
import { SideBar } from '../components/SideBar'

import { ApexOptions } from 'apexcharts';
const Chart = dynamic(() => import('react-apexcharts'), {
    ssr: false
})
const options: ApexOptions = {
    chart: {
        toolbar: {
            show: false,
        },
        zoom: {
            enabled: false,
        },
        foreColor: theme.colors.gray[500],
    },
    grid: {
        show: false,
    },
    dataLabels: {
        enabled: false,
    },
    tooltip: {
        enabled: false,
    },
    xaxis: {
        type: 'datetime',
        axisBorder: {
            color: theme.colors.gray[600],
        },
        axisTicks: {
            color: theme.colors.gray[600]
        },
        categories: [
            '2021-08-12T00:00:00.000Z',
            '2021-08-14T00:00:00.000Z',
            '2021-08-15T00:00:00.000Z',
            '2021-08-16T00:00:00.000Z',
            '2021-08-18T00:00:00.000Z',
            '2021-08-22T00:00:00.000Z',
            '2021-08-30T00:00:00.000Z',
        ],
    },
    fill: {
        opacity: 0.3,
        type: 'gradient',
        gradient: {
            shade: 'dark',
            opacityFrom: 0.7,
            opacityTo: 0.3,
        }
    }
};

const series = [
    { name: 'series1', data: [31, 120, 10, 28, 61, 18, 109] }
];


const Dashboard: NextPage = () => {
    return (
        <Flex direction="column" h="100vh">
            <Header />

            <Flex w="100%" my="6" maxWidth={1480} mx="auto" px="6">
                <SideBar />

                <SimpleGrid gap="4" flex="1" minChildWidth="320px" align="flex-start">
                    <Box p={['6', '8']} bg="gray.800" borderRadius={8} pb="4">
                        <Text fontSize="lg" mb="4">Inscritos da Semana</Text>
                        <Chart options={options} series={series} type="area" height={160} />
                    </Box>
                    <Box p={['6', '8']} bg="gray.800" borderRadius={8} pb="4">
                        <Text>Inscritos da Semana</Text>
                        <Chart options={options} series={series} type="area" height={160} />
                    </Box>
                </SimpleGrid>
            </Flex>

        </Flex>
    )
}

export default Dashboard