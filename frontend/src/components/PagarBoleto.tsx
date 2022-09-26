import {
  Button,
  Flex,
  FormControl,
  Spinner,
  Text,
  Textarea,
} from "@chakra-ui/react";
import { ErrorMessage } from "@hookform/error-message";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm, UseFormHandleSubmit } from "react-hook-form";
import { AcharBoleto } from "../models/AcharBoleto";
import { Boleto } from "../models/Boleto";
import { getBoleto } from "../services/BoletoService";
import { BoletoPagamento } from "./BoletoPagamento";
export function PagarBoleto() {
  const [isPago, setIsPago] = useState<boolean>(false);
  const [boleto, setBoleto] = useState<Boleto>();
  const [errorMsg, setErrorMsg] = useState<string>("");
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Boleto>({ criteriaMode: "all" });
  const [boletoValido, setBoletoValido] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  function caracteresValidos(letra: string) {
    const invalidChars = /[^0-9]/gi;

    if (invalidChars.test(letra)) {
      let documento = document.getElementById("boleto") as HTMLInputElement;
      documento.value = letra.replace(invalidChars, "");
    }
  }

  function montarBoleto(valorBoleto: string) {
    return (
      <>
        <BoletoPagamento
          valor={valorBoleto}
          codigoDeBarras={boleto!.codigoDeBarras}
          validade={boleto!.validade}
        />
      </>
    );
  }

  function verificarBoletoPago() {}

  const acharBoleto: SubmitHandler<Boleto> = (data) => {
    setIsLoading(true);
    getBoleto(data.codigoDeBarras)
      .then((res) => {
        setBoletoValido(true);
        setBoleto(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        let documento = document.getElementById("boleto") as HTMLInputElement;
        documento.style.borderColor = "red";

        setErrorMsg(err.response.data);
        setIsPago(true);
        setIsLoading(false);
      });
  };

  return (
    <>
      <Flex justifyContent="center">
        <Flex height="300px" alignItems="center">
          {isLoading ? <Spinner /> : <></>}

          {boletoValido ? (
            <Spinner /> && montarBoleto(boleto!.valor)
          ) : (
            <Flex
              width="max-content"
              height="300px"
              alignItems="center"
              hidden={isLoading}
            >
              <form onSubmit={handleSubmit(acharBoleto)}>
                <FormControl>
                  <Text fontSize="12px">insira o código de barras abaixo</Text>
                  <Textarea
                    width="250px"
                    resize="none"
                    id="boleto"
                    maxLength={48}
                    {...register("codigoDeBarras", {
                      required: "Campo obrigatório",

                      minLength: {
                        value: 48,
                        message: "mínimo 48 números",
                      },
                    })}
                    onChange={(e) => caracteresValidos(e.target.value)}
                    disabled={isLoading}
                  />
                  {isPago ? (
                    <Text fontSize="10px" color="red">
                      {errorMsg}
                    </Text>
                  ) : (
                    <> </>
                  )}

                  <ErrorMessage
                    errors={errors}
                    name="codigoDeBarras"
                    render={({ messages }) =>
                      messages &&
                      Object.entries(messages).map(([type, message]) => (
                        <Text fontSize="10px" color="red" key={type}>
                          {message}
                        </Text>
                      ))
                    }
                  />
                </FormControl>
                <Button
                  type="submit"
                  mt={2}
                  colorScheme="teal"
                  isLoading={isLoading}
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
