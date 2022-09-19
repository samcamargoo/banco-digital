import {
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  HStack,
  Input,
  Text,
  useFormErrorStyles,
} from "@chakra-ui/react";
import { SubmitHandler, useForm } from "react-hook-form";
import InputMask from "react-input-mask";
import { CadastroUsuario } from "../models/CadastroUsuario";
import { Navbar } from "./Navbar";
import { useState, useRef } from "react";
import { ErrorMessage } from "@hookform/error-message";
import { cadastrarCliente } from "../services/ClienteService";
export function Cadastro() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<CadastroUsuario>({ criteriaMode: "all" });
  const [senhaConfirmada, setSenhaConfirmada] = useState<string>();
  console.log(isSubmitting);
  const password = useRef({});
  password.current = watch("password", "");

  const [buttonDisable, setButtonDisable] = useState<boolean>(false);

  const cadastrar: SubmitHandler<CadastroUsuario> = (data: CadastroUsuario) => {
    setButtonDisable(true);
    cadastrarCliente(data)
      .then((res) => {
        console.log("sucesso");
        setButtonDisable(false);
      })
      .catch((error) => {
        console.log("error");
      });
  };
  return (
    <>
      <Navbar />
      <Flex justifyContent="center" alignItems="center" mb={2}>
        <Flex
        >
          <form onSubmit={handleSubmit(cadastrar)}>
            <FormControl>
              <FormLabel>Nome*</FormLabel>
              <Input
                type="text"
                placeholder="Nome"
                {...register("nome", {
                  required: 'O campo "Nome" é obrigatório',
                  minLength: {
                    value: 2,
                    message:
                      'O campo "Nome" precisa ter pelo menos 2 caracteres',
                  },
                })}
              />
            </FormControl>
            <ErrorMessage
              errors={errors}
              name="nome"
              render={({ messages }) =>
                messages &&
                Object.entries(messages).map(([type, message]) => (
                  <Text fontSize="10px" color="red" key={type}>
                    {message}
                  </Text>
                ))
              }
            />

            <FormControl>
              <FormLabel>Email*</FormLabel>
              <Input
                type="text"
                placeholder="Email"
                {...register("email", {
                  required: 'O campo "Email" é obrigatório',
                  pattern: {
                    value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g,
                    message: "Email inválido",
                  },
                })}
              />
            </FormControl>
            <ErrorMessage
              errors={errors}
              name="email"
              render={({ messages }) =>
                messages &&
                Object.entries(messages).map(([type, message]) => (
                  <Text fontSize="10px" color="red" key={type}>
                    {message}
                  </Text>
                ))
              }
            />

            <FormControl>
              <FormLabel>CPF*</FormLabel>
              <Input
                as={InputMask}
                mask="999.999.999-99"
                type="text"
                placeholder="CPF"
                {...register("cpf", {
                  required: 'O campo "CPF" é obrigatório',
                })}
              />
            </FormControl>
            <ErrorMessage
              errors={errors}
              name="cpf"
              render={({ messages }) =>
                messages &&
                Object.entries(messages).map(([type, message]) => (
                  <Text fontSize="10px" color="red" key={type}>
                    {message}
                  </Text>
                ))
              }
            />
            <FormControl>
              <FormLabel>Data de Nascimento*</FormLabel>
              <Input
                type="date"
                {...register("dataNascimento", {
                  required: 'O campo "Data de Nascimento" é obrigatório',
                })}
              />
            </FormControl>
            <ErrorMessage
              errors={errors}
              name="dataNascimento"
              render={({ messages }) =>
                messages &&
                Object.entries(messages).map(([type, message]) => (
                  <Text fontSize="10px" color="red" key={type}>
                    {message}
                  </Text>
                ))
              }
            />
            <FormControl>
              <FormLabel>Senha*</FormLabel>
              <Input
                type="password"
                placeholder="Senha"
                {...register("password", {
                  required: 'O campo "Senha" é obrigatório',
                  minLength: {
                    value: 3,
                    message: "A senha deve ter no mínimo 3 caracteres",
                  },
                })}
              />
            </FormControl>
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
            <FormControl>
              <FormLabel>Confirmar senha*</FormLabel>
              <Input
                type="password"
                placeholder="Confirmar senha"
                {...register("confirma_password", {
                  validate: (value) =>
                    password.current === value || "Senhas não coincidem",
                })}
              />
            </FormControl>
            <ErrorMessage
              errors={errors}
              name="confirma_password"
              render={({ messages }) =>
                messages &&
                Object.entries(messages).map(([type, message]) => (
                  <Text fontSize="10px" color="red" key={type}>
                    {message}
                  </Text>
                ))
              }
            />
            <Flex mt={2}>
              <HStack>
                <Button colorScheme="red">Cancelar</Button>

                <Button
                  colorScheme="teal"
                  type="submit"
                  isLoading={buttonDisable}
                >
                  Cadastrar
                </Button>
              </HStack>
            </Flex>
          </form>
        </Flex>
      </Flex>
    </>
  );
}
