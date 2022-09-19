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
      <Flex justifyContent="space-around" alignItems="center" backgroundColor="teal" flexDir={["column", "column", "column", "row"]}>
        <VStack>
          <Heading fontSize="sm">produtos</Heading>
          <Text>testando</Text>
          <Text>testando</Text>
          <Text>testando</Text>
        </VStack>
        <VStack>
          <Heading fontSize="sm">produtos</Heading>
          <Text>testando</Text>
          <Text>testando</Text>
          <Text>testando</Text>
        </VStack>

        <VStack>
          <Heading fontSize="sm">produtos</Heading>
          <Text>testando</Text>
          <Text>testando</Text>
          <Text>testando</Text>
        </VStack>
      </Flex>
    </>
  );
}
