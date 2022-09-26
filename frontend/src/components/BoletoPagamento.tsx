import {
  Button,
  Flex,
  Input,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Tr,
} from "@chakra-ui/react";
import { ErrorMessage } from "@hookform/error-message";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

import { Boleto } from "../models/Boleto";
import { PagarBoleto } from "../models/PagarBoleto";
import { pagarBoleto } from "../services/BoletoService";
import { useNavigate } from "react-router-dom";
import { BolePagoInformacoes } from "../models/BoletoPagoInformacoes";
import { BoletoPagoInformacoes } from "./BoletoPagoInformacoes";
export function BoletoPagamento(boleto: Boleto) {
  const campoSenha = document.getElementById("password") as HTMLInputElement;
  const [isPaying, setIsPaying] = useState<boolean>();
  const [isPago, setIsPago] = useState<boolean>();
  const [boletoInfo, setBoletoInfo] = useState<BolePagoInformacoes>();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<PagarBoleto>({ criteriaMode: "all" });

  const navigate = useNavigate();

  const pagar: SubmitHandler<PagarBoleto> = (data) => {
    setIsPaying(true);
    const boletoASerPago: PagarBoleto = {
      password: data.password,
      codigoDeBarras: boleto.codigoDeBarras,
    };

    pagarBoleto(boletoASerPago)
      .then((res) => {
        console.log(res.data);
        setBoletoInfo(res.data);
        setIsPaying(false);
        setIsPago(true);
      })
      .catch((error) => {
        console.log(error);
        setIsPaying(false);
      });
  };
  return (
    <>
      {isPago ? (
        <BoletoPagoInformacoes
          valor={boletoInfo!.valor}
          beneficiario={boletoInfo!.beneficiario}
          pagoEm={boletoInfo!.pagoEm}
          pagador={boletoInfo!.pagador}
        />
      ) : (
        <Flex justifyContent="center" alignItems="center">
          <form onSubmit={handleSubmit(pagar)}>
            <TableContainer>
              <Table>
                <Tbody>
                  <Tr>
                    <Td>Valor:</Td>
                    <Td>{boleto.valor}</Td>
                  </Tr>
                  <Tr>
                    <Td>Beneficiário:</Td>
                    <Td>Samuel Camargo</Td>
                  </Tr>
                  <Tr>
                    <Td>Validade:</Td>
                    <Td>{boleto.validade}</Td>
                  </Tr>

                  <Tr>
                    <Td>Senha:</Td>

                    <Td>
                      <Input
                        id="password"
                        type="password"
                        {...register("password", {
                          required: 'O campo "Senha" é obrigatório',
                        })}
                      />
                      <ErrorMessage
                        errors={errors}
                        name="password"
                        render={({ messages }) =>
                          messages &&
                          Object.entries(messages).map(([type, message]) => (
                            <Text fontSize="10px" color="red" key={type}>
                              {message}
                            </Text>
                          ))
                        }
                      />
                    </Td>
                  </Tr>
                  <Tr>
                    <Td>
                      <Button colorScheme="red">Cancelar</Button>
                    </Td>
                    <Td>
                      <Button
                        isLoading={isPaying}
                        type="submit"
                        width="200px"
                        colorScheme="teal"
                      >
                        Pagar
                      </Button>
                    </Td>
                  </Tr>
                </Tbody>
              </Table>
            </TableContainer>
          </form>
        </Flex>
      )}
    </>
  );
}
