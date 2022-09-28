import {
  Button,
  Flex,
  Input,
  Table,
  TableContainer,
  Tbody,
  Td,
  Tr,
} from "@chakra-ui/react";
import { GerarBoletoType } from "../models/GerarBoleto";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { enviarBoletoEmail } from "../services/EmailService";
import { BoletoEmail } from "../models/BoletoEmail";

export function BoletoGerado(boleto: GerarBoletoType) {
  const { register, handleSubmit } = useForm<BoletoEmail>();
  const [email, setEmail] = useState<string>("");

  const enviarEmail: SubmitHandler<BoletoEmail> = (data) => {
    const objetoBoleto: BoletoEmail = {
      valor: boleto.valor,
      descricao: boleto.descricao,
      codigoDeBarras: boleto.codigoDeBarras,
      email: email,
    };

    enviarBoletoEmail(objetoBoleto).then(res => {
        console.log(res);
    }).catch(err => {
        console.log(err)
    });
    console.log(objetoBoleto);
  };
  return (
    <>
      <Flex flexDir="column">
        <form onSubmit={handleSubmit(enviarEmail)}>
          <TableContainer>
            <Table>
              <Tbody>
                <Tr>
                  <Td>Valor:</Td>
                  <Td>{boleto.valor}</Td>
                </Tr>

                <Tr>
                  <Td>Descrição:</Td>
                  <Td>{boleto.descricao}</Td>
                </Tr>

                <Tr>
                  <Td>Validade:</Td>
                  <Td>{boleto.validade}</Td>
                </Tr>
                <Tr>
                  <Td>Gerado em:</Td>
                  <Td>{boleto.geradoEm}</Td>
                </Tr>

                <Tr>
                  <Td>Email:</Td>
                  <Td>
                    <Input
                      type="text"
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </Td>
                </Tr>
              </Tbody>
            </Table>
            <Flex mt={3} justifyContent="space-around">
              <Button colorScheme="red">Cancelar</Button>
              <Button type="submit" colorScheme="teal">
                Enviar por Email
              </Button>
            </Flex>
          </TableContainer>
        </form>
      </Flex>
    </>
  );
}
