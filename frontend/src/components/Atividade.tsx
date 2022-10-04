import { Divider, Flex, Heading, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";

import { useAuth } from "../hooks/useAuth";
import { Atividade as AtividadeModel } from "../models/Atividade";
import { getAtividades } from "../services/AtividadeService";

export function Atividade() {
  const { auth } = useAuth();
  const [atividade, setAtividade] = useState<AtividadeModel[]>([]);

  function encontrarId() {
    getAtividades(auth.usuario).then((res) => {
      setAtividade(res.data);
    });
  }

  useEffect(() => {
    encontrarId();
  }, []);

  console.log(atividade);
  return (
    <Flex
      flexDir="column"
      boxShadow="rgba(0, 0, 0, 0.15) 0px 2px 8px;"
      width={["390px", "390px", "390px", "600px"]}
      height="300px"
      borderRadius={7}
    >
      <Flex flexDir="column">
        <Heading p={5} fontSize="18px">
          Sua atividade
        </Heading>
        <Divider />
      </Flex>

      {atividade.map(ativ => (
        <>
          <Flex p={2} justifyContent="space-between">
          <Flex flexDir="column">
            <Text fontSize="14px">{ativ.descricao}</Text>
            <Text fontSize="12px" color="rgba(0,0,0,.45)">
              {ativ.tipo}
            </Text>
          </Flex>

          <Flex flexDir="column">
          {ativ.valor.startsWith("-") ? (
              <Text fontSize="14px" color="red.400" fontWeight="600">
                {ativ.valor}
              </Text>
            ) : (
              <Text fontSize="14px" color="#008744" fontWeight="600">
                {ativ.valor}
              </Text>
            )}
            <Text fontSize="12px" color="rgba(0,0,0,.45)">
              {ativ.data.replace(" ", " de ")}
            </Text>
          </Flex>
        </Flex>
        <Divider />

        </>
      ))}




      {/* <Flex flexDir="column">
        <Flex p={2} justifyContent="space-between">
          <Flex flexDir="column">
            <Text fontSize="14px">{atividade[0]?.descricao}</Text>
            <Text fontSize="12px" color="rgba(0,0,0,.45)">
              {atividade[0]?.tipo}
            </Text>
          </Flex>

          <Flex flexDir="column">
          {atividade[0]?.valor.startsWith("-") ? (
              <Text fontSize="14px" color="red.400" fontWeight="600">
                {atividade[0]?.valor}
              </Text>
            ) : (
              <Text fontSize="14px" color="#008744" fontWeight="600">
                {atividade[0]?.valor}
              </Text>
            )}
            <Text fontSize="12px" color="rgba(0,0,0,.45)">
              29 de setembro
            </Text>
          </Flex>
        </Flex>
        <Divider />
        <Flex p={2} justifyContent="space-between">
          <Flex flexDir="column">
            <Text fontSize="14px">{atividade[1]?.descricao}</Text>
            <Text fontSize="12px" color="rgba(0,0,0,.45)">
              {atividade[1]?.tipo}
            </Text>
          </Flex>

          <Flex flexDir="column">
            {atividade[1]?.valor.startsWith("-") ? (
              <Text fontSize="14px" color="red.400" fontWeight="600">
                {atividade[1]?.valor}
              </Text>
            ) : (
              <Text fontSize="14px" color="#008744" fontWeight="600">
                {atividade[1]?.valor}
              </Text>
            )}

            <Text fontSize="12px" color="rgba(0,0,0,.45)">
              29 de setembro
            </Text>
          </Flex>
        </Flex>
      </Flex> */}
    </Flex>
  );
}
