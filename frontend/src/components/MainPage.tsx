import {
  Button,
  Flex,
  Heading,
  Hide,
  HStack,
  Icon,
  Show,
  Text,
  VStack,
} from "@chakra-ui/react";
import { FaBarcode, FaQrcode } from "react-icons/fa";
import { BiTransfer, BiCreditCard } from "react-icons/bi";
import "../assets/styles.css";
export function MainPage() {
  return (
    <>
      {/*Header*/}
      <Flex justifyContent="center">
        <Flex maxWidth="800px" height="400px" alignItems="center">
          <VStack>
            <Heading
              textAlign="center"
              fontSize={["2.25rem", "2.25rem", "2.25rem", "4rem"]}
            >
              <Text>
                Faça parte do <Text color="teal">Mock Banco Digital</Text>
              </Text>
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

      <main>
        {/*Serviços*/}
        <Flex flexDir="column" ml={10} mr={10} mb={10}>
          <section>
            <Flex justifyContent={["center", "center", "center", "flex-start"]}>
              <Heading fontSize={["1.2rem", "1.2rem", "1.2rem", "24px"]}>
                resolva questões do dia a dia
              </Heading>
            </Flex>

            <Flex justifyContent={["center", "center", "center", "flex-start"]}>
              <Flex flexDir={["column", "column", "column", "row"]} mb={10}>
                <Flex
                  width={["300px", "300px", "300px", "200px"]}
                  height="200px"
                  border="1px solid #d6d0cc"
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
                  width={["300px", "300px", "300px", "200px"]}
                  height="200px"
                  border="1px solid #d6d0cc"
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
                  width={["300px", "300px", "300px", "200px"]}
                  height="200px"
                  border="1px solid #d6d0cc"
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

                <Flex
                  width={["300px", "300px", "300px", "200px"]}
                  height="200px"
                  border="1px solid #d6d0cc"
                  borderRadius="8px"
                  justifyContent="center"
                  m="3px"
                  alignItems="center"
                >
                  <VStack mt={6}>
                    <Icon as={FaQrcode}></Icon>
                    <Heading fontSize={["1.5rem"]}>Fatura Digital</Heading>
                    <Text textAlign="center">
                      Receba a fatura do seu cartão
                    </Text>
                  </VStack>
                </Flex>
              </Flex>
            </Flex>
          </section>
          {/* Produtos */}
          <section>
            <Flex flexDir="column">
              <Flex
                flexDir="column"
                alignItems={["center", "center", "center", "flex-start"]}
              >
                <Heading fontSize={["1.2rem", "1.2rem", "1.2rem", "24px"]}>
                  contrate nosso produtos
                </Heading>

                <Flex
                  width={["300px", "300px", "300px", "800px"]}
                  height={["250px", "250px", "250px", "200px"]}
                  border="1px solid #d6d0cc"
                  borderRadius="8px"
                  flexDir="column"
                  justifyContent="center"
                >
                  <Flex flexDir="column" ml={2}>
                    <Flex mt={3} height="25px">
                      <Icon mt={1.5} as={BiCreditCard}></Icon>
                      <span>
                        <Text>cartões</Text>
                      </span>
                    </Flex>
                    <Flex mb={2} mt={4}>
                      <Heading fontSize="18px">
                        o cartão de crédito ideal
                      </Heading>
                    </Flex>
                    <Flex mt={4}>
                      <Text>
                        São várias opções para escolher o cartão ideal para você
                      </Text>
                    </Flex>
                    <Button
                      mt={2}
                      width="max-content"
                      size="sm"
                      colorScheme="teal"
                    >
                      Peça já o seu
                    </Button>
                  </Flex>
                </Flex>
              </Flex>
            </Flex>
          </section>
        </Flex>
      </main>
    </>
  );
}
