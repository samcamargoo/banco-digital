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

import { Conta } from "../models/Conta";
import { listarInfoCliente } from "../services/ClienteService";
import { Atividade } from "./Atividade";
import { InformacoesConta } from "./InformacoesConta";

export function Dashboard() {
 


  

  return (
    <>
      <Flex
        height="500px"
        justifyContent="space-around"
        flexDir={["column", "column", "column", "row"]}
        p={1}
        alignItems={["center"]}
      >
          <InformacoesConta/>

          <Atividade />
      </Flex>
    </>
  );
}
