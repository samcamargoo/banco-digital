import {
  Button,
  Flex,
  Heading,
  Hide,
  HStack,
  Icon,
  Link,
  Show,
  Spacer,
  Text,
  VStack,
} from "@chakra-ui/react";

import { FaBarcode, FaQrcode } from "react-icons/fa";
import { BiTransfer, BiCreditCard } from "react-icons/bi";
import "../assets/styles.css";
import { Footer } from "./Footer";
import { Navbar } from "./Navbar";
import { useEffect } from "react";
import { Link as ReachLink } from "react-router-dom";
export function MainPage() {
  useEffect(() => {
    document.title = "Mock - Banco Digital";
  }, []);

  return (
    <>
      {/*Header*/}
      <Flex justifyContent="center">
        <Flex maxWidth="700px" height="400px" alignItems="center">
          <VStack>
            <Heading
              textAlign="center"
              fontSize={["2.25rem", "2.25rem", "2.25rem", "4rem"]}
            >
              <Text color="#E7DFDD">Faça parte do Mock Banco Digital</Text>
            </Heading>
            <Link
              as={ReachLink}
              to="/criar-conta"
              _hover={{
                textDecoration: "none",
              }}
            >
              <Button
                borderRadius="7px"
                size={["sm", "md", "md", "lg"]}
                color="#E7DFDD"
                variant="outline"
                textTransform="uppercase"
                borderColor="#4717F6"
                _hover={{
                  background: "#4717F6",
                }}
              >
                Crie sua conta
              </Button>
            </Link>
          </VStack>
        </Flex>
      </Flex>

      <Flex justifyContent="center" height="150px">
        <Heading>Por que usar o Mock Banco Digital?</Heading>
      </Flex>

      <Flex
        justifyContent="space-around"
        flexDir={["column", "column", "column", "row"]}
        alignItems="center"
      >
        <Flex
          flexDir="column"
          alignItems={["center", "center", "center", "flex-start"]}
          mb={10}
        >
          <Icon w="30px" h="30px" color="white" as={FaBarcode} mb={5} />
          <Heading as="h4" size="md">
            Boletos
          </Heading>
          <Text color="#a8a8b3">pague seus boletos sem taxas</Text>
        </Flex>

        <Flex
          flexDir="column"
          alignItems={["center", "center", "center", "flex-start"]}
          mb={10}
        >
          <Icon w="30px" h="30px" color="white" as={BiTransfer} mb={5} />
          <Heading as="h4" size="md">
            Transferências
          </Heading>
          <Text color="#a8a8b3">transferências ilimitadas</Text>
        </Flex>
        <Flex
          flexDir="column"
          alignItems={["center", "center", "center", "flex-start"]}
          mb={10}
        >
          <Icon w="30px" h="30px" color="white" as={FaQrcode} mb={5} />
          <Heading as="h4" size="md">
            PIX
          </Heading>
          <Text color="#a8a8b3">sem limites</Text>
        </Flex>

        <Flex
          flexDir="column"
          alignItems={["center", "center", "center", "flex-start"]}
          mb={10}
        >
          <Icon w="30px" h="30px" color="white" as={FaQrcode} mb={5} />
          <Heading as="h4" size="md">
            Fatura Digital
          </Heading>
          <Text color="#a8a8b3">fatura digital no seu email</Text>
        </Flex>
      </Flex>
    </>
  );
}
