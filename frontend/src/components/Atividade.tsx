import { Divider, Flex, Heading, Text } from "@chakra-ui/react";

export function Atividade() {
    return (
        <Flex
        flexDir="column"
        boxShadow="rgba(0, 0, 0, 0.15) 0px 2px 8px;"
        width={["390px", "390px", "390px", "600px"]}
        height="300px"
        borderRadius={7}
      >
        <Flex flexDir="column">
          <Heading p={5} fontSize="18px">
            Sua atividade
          </Heading>
          <Divider />
        </Flex>

        <Flex flexDir="column">
          <Flex p={2} justifyContent="space-between">
            <Flex flexDir="column">
              <Text fontSize="14px">Bicicleta</Text>
              <Text fontSize="12px" color="rgba(0,0,0,.45)">
                boleto
              </Text>
            </Flex>

            <Flex flexDir="column">
              <Text fontSize="14px" color="#008744" fontWeight="600">
                + R$ 199,90
              </Text>
              <Text fontSize="12px" color="rgba(0,0,0,.45)">
                29 de setembro
              </Text>
            </Flex>
          </Flex>
          <Divider />
          <Flex p={2} justifyContent="space-between">
            <Flex flexDir="column">
              <Text fontSize="14px">Bicicleta</Text>
              <Text fontSize="12px" color="rgba(0,0,0,.45)">
                boleto
              </Text>
            </Flex>

            <Flex flexDir="column">
              <Text fontSize="14px" color="#008744" fontWeight="600">
                + R$ 199,90
              </Text>
              <Text fontSize="12px" color="rgba(0,0,0,.45)">
                29 de setembro
              </Text>
            </Flex>
          </Flex>
        </Flex>
      </Flex>
    )
}