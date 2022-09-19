import {
  ButtonGroup,
  Divider,
  Flex,
  Heading,
  HStack,
  Icon,
  IconButton,
  Link,
  Text,
  useBreakpointValue,
  VStack,
} from "@chakra-ui/react";
import {
  TiSocialLinkedinCircular,
  TiSocialGithubCircular,
} from "react-icons/ti";
import { VscGithub } from "react-icons/vsc";
import "../assets/styles.css";
export function Footer() {
  return (
    <>
      <Flex justifyContent="space-around" alignItems="center" backgroundColor="teal" flexDir={["column", "column", "column", "row"]} color="white" p={10}>
        <VStack>
          <Heading fontSize="sm">produtos</Heading>
          <Text>conta</Text>
          <Text>cartão de crédito</Text>
          <Text>empréstimos</Text>
        </VStack>
        <VStack>
          <Heading fontSize="sm">Mock Banco Digital</Heading>
          <Text>sobre o projeto</Text>
          <Text>sobre o desenvolvedor</Text>
          <Text>testando</Text>
        </VStack>

        <VStack>
          <Heading fontSize="sm">produtos</Heading>
          <Link href="https://api.whatsapp.com/send?phone=5534991155634" isExternal>envie uma mensagem</Link>
          <Link href="https://linkedin.com/in/samuel-camargo" isExternal>linkedin</Link>
          <Link href="https://github.com/samcamargoo" isExternal>github</Link>
        </VStack>
      </Flex>
    </>
  );
}
