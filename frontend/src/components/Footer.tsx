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
      <footer>
        <Flex
          height={["max-content", "max-content", "max-content", "300px"]}
          backgroundColor="teal"
          flexDir={["column", "column", "column", "row"]}
          justifyContent="space-around"
          alignItems={["center", "center", "center", "center"]}
          color="white"
        position="absolute"
        width="100%"
       
        >
          <Flex mb={["15px", "15px", "15px", "0"]}>
            <VStack>
              <Heading fontSize="1.5rem">nosso serviços</Heading>

              <Text>conta</Text>
              <Text>cartão de crédito</Text>
              <Text>empréstimos</Text>
            </VStack>
          </Flex>

          <Flex mb={["15px", "15px", "15px", "0"]}>
            <VStack>
              <Heading fontSize="1.5rem">sobre nós</Heading>
              <Text>sobre o projeto</Text>
              <Text>sobre o desenvolvedor</Text>
              <Text>sobre o desenvolvedor</Text>
            </VStack>
          </Flex>

          <Flex mb={["15px", "15px", "15px", "0"]}>
            <VStack>
              <Heading fontSize="1.5rem">fale conosco</Heading>
              <Link
                href="https://api.whatsapp.com/send?phone=5534991155634"
                isExternal
              >
                envie sua mensagem
              </Link>
              <Link href="https://linkedin.com/in/samuel-camargo" isExternal>
                linkedin
              </Link>
              <Link href="https://github.com/samcamargoo" isExternal>
                github
              </Link>
            </VStack>
          </Flex>
        </Flex>
      </footer>
    </>
  );
}
