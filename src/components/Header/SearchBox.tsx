import { Flex, Icon, Input } from "@chakra-ui/react";
import { RiSearchLine } from "react-icons/ri";

export function SearchBox() {
    return (
        <Flex
            as="label"
            flex="1"
            py="4"
            px="8"
            ml="6"
            maxWidth={400}
            color="gray.200"
            position="relative"
            bg="gray.700"
            borderRadius="full"
        >
            <Input
                color="gray.50"
                variant="unstyled"
                px="4"
                mr="4"
                placeholder="Buscar na plataforma"
                _placeholder={{ color: 'gray.300' }}
            />
            <Icon as={RiSearchLine} fontSize="20" />
        </Flex>
    )
}