import { Button, Flex, FormControl, Text, Textarea } from "@chakra-ui/react";
import { useState } from "react";
import { SubmitHandler, useForm, UseFormHandleSubmit } from "react-hook-form";
import { AcharBoleto } from "../models/AcharBoleto";
import { Boleto } from "../models/Boleto";
import { getBoleto } from "../services/BoletoService";
import { BoletoPagamento } from "./BoletoPagamento";
export function PagarBoleto() {
  let documento = document.getElementById("boleto") as HTMLInputElement;
  const [value, setValue] = useState<string>("");
  const [boleto, setBoleto] = useState<Boleto>();
  const { register, handleSubmit, reset } = useForm<Boleto>();
  const [boletoValido, setBoletoValido] = useState<boolean>(false);

  function caracteresValidos(letra: string) {
    const invalidChars = /[^0-9]/gi;

    if (invalidChars.test(letra)) {
      documento.value = letra.replace(invalidChars, "");
    }
  }
  function montarBoleto(valorBoleto: string) {
    return (
      <>
        <BoletoPagamento valor={valorBoleto} codigoDeBarras={boleto!.codigoDeBarras} validade={boleto!.validade}/>
      </>
    );
  }

  const acharBoleto: SubmitHandler<Boleto> = (data) => {
    getBoleto(data.codigoDeBarras).then((res) => {
      setBoletoValido(true);
      setBoleto(res.data);
    });
  };

  return (
    <>
      <Flex justifyContent="center">
        <Flex height="300px" alignItems="center">
          {boletoValido ? (
            montarBoleto(boleto!.valor)
          ) : (
            <Flex width="max-content" height="300px" alignItems="center">
              <form onSubmit={handleSubmit(acharBoleto)}>
                <FormControl>
                  <Text fontSize="12px">insira o código de barras abaixo</Text>
                  <Textarea
                    width="250px"
                    maxLength={49}
                    resize="none"
                    id="boleto"
                    {...register("codigoDeBarras", { required: true })}
                    onChange={(e) => caracteresValidos(e.target.value)}
                    disabled={boletoValido}
                  />
                </FormControl>
                <Button
                  type="submit"
                  mt={2}
                  colorScheme="teal"
                  isLoading={boletoValido}
                >
                  Continuar
                </Button>
              </form>
            </Flex>
          )}
        </Flex>
      </Flex>
    </>
  );
}
