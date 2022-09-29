import { ChevronDownIcon } from "@chakra-ui/icons";
import {
  Button,
  Divider,
  Flex,
  Heading,
  Link,
  Menu,
  MenuButton,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Link as ReachLink } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { Conta } from "../models/Conta";
import { listarInfoCliente } from "../services/ClienteService";
import { Atividade } from "./Atividade";

export function Dashboard() {
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
    <>
      <Flex
        height="500px"
        justifyContent="space-around"
        flexDir={["column", "column", "column", "row"]}
        p={1}
        alignItems={["center"]}
      >
        <Flex
          alignItems="center"
          flexDir="column"
          boxShadow="rgba(0, 0, 0, 0.15) 0px 2px 8px;"
          width={["390px"]}
          height="300px"
          borderRadius={7}
          justifyContent="center"
        >
          <Text fontSize="14px">Saldo disponível</Text>
          <Heading fontSize="16px">{conta?.saldo}</Heading>

          <Text fontSize="14px">Conta: </Text>
          <Heading fontSize="16px">{conta?.numero}</Heading>
        </Flex>

          <Atividade />
      </Flex>
    </>
  );
}
