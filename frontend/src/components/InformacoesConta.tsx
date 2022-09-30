import { Button, Divider, Flex, Heading, Text } from "@chakra-ui/react";
import { Conta } from "../models/Conta";
import { useEffect, useState } from "react";
import { listarInfoCliente } from "../services/ClienteService";
import { useAuth } from "../hooks/useAuth";
export function InformacoesConta() {
  const [conta, setConta] = useState<Conta>();
  const { auth } = useAuth();

  useEffect(() => {
    listarInfoCliente(auth.usuario)
      .then((res) => {
        setConta(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <Flex
      flexDir="column"
      boxShadow="rgba(0, 0, 0, 0.15) 0px 2px 8px;"
      width={["390px"]}
      height="300px"
      borderRadius={7}
    >
      <Flex p={5}>
        <Heading fontSize="18px">Conta</Heading>
      </Flex>
      <Divider />

      <Flex p={2}>
        <Flex flexDir="column">
          <Text color="rgba(0,0,0,.45)">Dinheiro disponível</Text>
          <Text fontSize="24px" color="#008744" fontWeight="600">{conta?.saldo}</Text>
        </Flex>
      </Flex>
      <Flex justifyContent="space-around" alignItems="center" height="200px">
        <Button colorScheme="teal" variant="outline">Depositar dinheiro</Button>
        <Button colorScheme="teal" variant="outline">Transferir dinheiro</Button>
      </Flex>
    </Flex>
  );
}
