import { ChevronDownIcon } from "@chakra-ui/icons";
import {
  Button,
  Flex,
  Heading,
  Link,
  Menu,
  MenuButton,
  Text,
} from "@chakra-ui/react";
import {Link as ReachLink} from "react-router-dom";

export function Dashboard() {
  return (
    <>
      <Flex
        height="200px"
        justifyContent="space-around"
        flexDir={["column", "column", "column", "row"]}
        alignItems="center"
      >
        <Flex>
          <Flex flexDir="column" alignItems="center">
            <Heading fontSize="20px">Boletos</Heading>
            <Link as={ReachLink} to="pagar-boleto">Pagar conta</Link>
            <Link as={ReachLink} to="gerar-boleto">Gerar boleto</Link>
          </Flex>
        </Flex>


        <Flex>
          <Flex flexDir="column"  alignItems="center">
            <Heading fontSize="20px">Transferências</Heading>
            <Text>Pagar conta</Text>
            <Text>Gerar boleto</Text>
          </Flex>
        </Flex>

        <Flex backgroundColor="blue">basdasdasda</Flex>
        <Flex backgroundColor="yellow">aasdasdas</Flex>
        <Flex backgroundColor="red">basdasdasd</Flex>
      </Flex>
    </>
  );
}
