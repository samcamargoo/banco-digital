import { Button, Flex, HStack, Spacer, Table, TableContainer, Tbody, Td, Tr } from "@chakra-ui/react";
import { BolePagoInformacoes } from "../models/BoletoPagoInformacoes";
import {BsShare} from "react-icons/bs";
import {AiOutlineHome} from "react-icons/ai"
import {useNavigate} from "react-router-dom"
export function BoletoPagoInformacoes(boletoInformacoes: BolePagoInformacoes) {

    const navigate = useNavigate();

    function irParaPaginaInicial() {
        navigate("/conta");
    }
  return (
    <>
    <Flex flexDir="column">
      <TableContainer>
        <Table>
          <Tbody>
            <Tr>
              <Td>Valor:</Td>
              <Td>{boletoInformacoes.valor}</Td>
            </Tr>
            <Tr>
              <Td>Beneficiário:</Td>
              <Td>{boletoInformacoes.beneficiario}</Td>
            </Tr>
            <Tr>
              <Td>Pagador:</Td>
              <Td>{boletoInformacoes.pagador}</Td>
            </Tr>
            <Tr>
              <Td>Pago em:</Td>
              <Td>{boletoInformacoes.pagoEm}</Td>
            </Tr>
          </Tbody>
        </Table>
      </TableContainer>
      
      <HStack mt={2}>
        <Button leftIcon={<AiOutlineHome />} colorScheme="red" onClick={irParaPaginaInicial}>
            Página Inicial
        </Button>
        <Button leftIcon={<BsShare/>} colorScheme="teal">
            Compartilhar
        </Button>
      </HStack>
      </Flex>
    </>
  );
}
