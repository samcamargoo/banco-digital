import {
  Button,
  Flex,
  Heading,
  HStack,
  Icon,
  Text,
  VStack,
} from "@chakra-ui/react";
import { FaBarcode, FaQrcode } from "react-icons/fa";
import { BiTransfer } from "react-icons/bi";
export function MainPage() {
  return (
    <>
      <main>
        {/*Header*/}
        <Flex justifyContent="center">
          <Flex maxWidth="800px" height="400px" alignItems="center">
            <VStack>
              <Heading
                textAlign="center"
                fontSize={["2.25rem", "2.25rem", "2.25rem", "4rem"]}
              >
                Faça parte do Mock Banco Digital
              </Heading>
              <Button
                borderRadius="2px"
                size={["sm", "md", "md", "lg"]}
                colorScheme="teal"
              >
                Crie sua conta
              </Button>
            </VStack>
          </Flex>
        </Flex>
        {/*Serviços*/}
        <section>
          <Flex justifyContent="center">
            <Flex flexDir={["column", "column", "column", "row"]}>
              <Flex
                width="200px"
                height="200px"
                border="1px solid"
                borderRadius="8px"
                justifyContent="center"
                m="3px"
                alignItems="center"
              >
                <VStack>
                  <Icon as={FaBarcode}></Icon>
                  <Heading fontSize={["1.5rem"]}>Boleto</Heading>
                  <Text>Pague seus boletos</Text>
                </VStack>
              </Flex>

              <Flex
                width="200px"
                height="200px"
                border="1px solid"
                borderRadius="8px"
                justifyContent="center"
                m="3px"
                alignItems="center"
              >
                <VStack>
                  <Icon as={BiTransfer}></Icon>
                  <Heading fontSize={["1.5rem"]}>Transferência</Heading>
                  <Text>Sem limites</Text>
                </VStack>
              </Flex>

              <Flex
                width="200px"
                height="200px"
                border="1px solid"
                borderRadius="8px"
                justifyContent="center"
                m="3px"
                alignItems="center"
              >
                <VStack>
                  <Icon as={FaQrcode}></Icon>
                  <Heading fontSize={["1.5rem"]}>Pix</Heading>
                  <Text>Sem limites</Text>
                </VStack>
              </Flex>
            </Flex>
          </Flex>
        </section>
      </main>
    </>
  );
}
