import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Spinner,
  Text,
} from "@chakra-ui/react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useState } from "react";
import { GerarBoletoType } from "../models/GerarBoleto";
import { gerarBoleto } from "../services/BoletoService";
import { BoletoGerado } from "./BoletoGerado";

export function GerarBoleto() {
  const { register, handleSubmit } = useForm<GerarBoletoType>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isBoletoGerado, setIsBoletoGerado] = useState<boolean>(false);
const [boleto, setBoleto] = useState<GerarBoletoType>();

    function montarBoleto() {
        return (
            <>
                <BoletoGerado descricao={boleto!.descricao} valor={boleto!.valor} codigoDeBarras={boleto!.codigoDeBarras} validade={boleto!.validade} geradoEm={boleto!.geradoEm}/>
            </>
        )
    }


  const gerar: SubmitHandler<GerarBoletoType> = (data) => {
    setIsLoading(true);
    gerarBoleto(data)
      .then((res) => {
        setBoleto(res.data)
        console.log(res);
        setIsBoletoGerado(true);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <>
      <Flex
        justifyContent="center"
        height="600px"
        flexDir="column"
        alignItems="center"
        
      >
        <Heading fontSize="24px">Cobrança via boleto</Heading>
        {isLoading ? (
          <>
            <Flex alignItems="center" justifyContent="center">
              <Text mr={1} fontSize="14px">
                Aguarde enquanto geramos seu boleto
              </Text>
              <Spinner size="xs" color="teal" />
            </Flex>
          </>
        ) : (
          <>
            <Flex mt={4} hidden={isBoletoGerado}>
              <form onSubmit={handleSubmit(gerar)}>
                <FormControl>
                  <FormLabel fontSize="12px">
                    O quê você está vendendo?
                  </FormLabel>
                  <Input
                    type="text"
                    placeholder="Nome do produto ou serviço"
                    _placeholder={{
                      fontSize: "13px",
                    }}
                    {...register("descricao")}
                  />
                </FormControl>

                <FormControl>
                  <FormLabel fontSize="12px">Valor:</FormLabel>
                  <Input
                    type="number"
                    step="0.01"
                    placeholder="R$"
                    _placeholder={{
                      fontSize: "13px",
                    }}
                    {...register("valor")}
                  />
                </FormControl>
                <Button mt={2} mr={1} colorScheme="red">
                  Cancelar
                </Button>
                <Button type="submit" mt={2} colorScheme="teal">
                  Gerar boleto
                </Button>
              </form>
            </Flex>
          </>
        )}
        {isBoletoGerado ? montarBoleto() : <></>}
      </Flex>
    </>
  );
}
