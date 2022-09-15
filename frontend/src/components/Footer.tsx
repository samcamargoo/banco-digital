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
export function Footer() {
  return (
    <>
      <footer>
        <Flex
          height={["max-content", "max-content", "max-content", "300px"]}
          backgroundColor="teal"
          flexDir={["column", "column", "column", "row"]}
          justifyContent="space-around"
          alignItems={["flex-start", "flex-start", "flex-start", "center"]}
          color="white"
        >
          <Flex>
            <VStack>
              <Heading fontSize="1.5rem">nosso serviços</Heading>

              <Text>conta</Text>
              <Text>cartão de crédito</Text>
              <Text>empréstimos</Text>
            </VStack>
          </Flex>

          <Flex>
            <VStack>
              <Heading fontSize="1.5rem">sobre nós</Heading>
              <Text>sobre o projeto</Text>
              <Text>sobre o desenvolvedor</Text>
              <Text>sobre o desenvolvedor</Text>
            </VStack>
          </Flex>

          <Flex>
            <VStack>
              <Heading fontSize="1.5rem">fale conosco</Heading>
              <Text>envie sua mensagem</Text>
              <Text>linkedin</Text>
              <Text>github</Text>
            </VStack>
          </Flex>
        </Flex>
      </footer>
    </>
  );
}
