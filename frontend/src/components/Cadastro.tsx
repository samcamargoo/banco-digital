import {
  Button,
  Center,
  Divider,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Hide,
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
import { cadastrarCliente, checarCpfExistente, checarEmailExistente } from "../services/ClienteService";
import { Footer } from "./Footer";
import { useNavigate } from "react-router-dom";
import {toast} from "react-toastify"
import 'react-toastify/dist/ReactToastify.min.css';
export function Cadastro() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<CadastroUsuario>({ criteriaMode: "all" });

  const [cpf, setCpf] = useState<boolean>(false);
  const [email, setEmail] = useState<boolean>(false);
  const password = useRef({});
  password.current = watch("password", "");

  const [buttonDisable, setButtonDisable] = useState<boolean>(false);
  const navigate = useNavigate();
  const documentoCpf = document.getElementById('cpf') as HTMLInputElement
  const documentoEmail = document.getElementById('email') as HTMLInputElement
  const cadastrar: SubmitHandler<CadastroUsuario> = (data: CadastroUsuario) => {
   
    setButtonDisable(true);
    cadastrarCliente(data)
      .then((res) => {
        setButtonDisable(false);
        toast.success("Cadastrado com sucesso!")
      })
      .catch((error) => {
        setButtonDisable(false);
        toast.error(error.response.data);
      });
  };

  function checarEmail(e: string) {
    setEmail(false)
    checarEmailExistente(e).then(res => {
      if(res.data) {
        setEmail(true);
        documentoEmail.style.borderColor = "red"
      }
    })
  }

  function checarCPF(e: string) {
    setCpf(false)
    checarCpfExistente(e).then(res => {
      if(res.data) {
       setCpf(true);
        documentoCpf.style.borderColor = "red"
      }
    }).catch(error =>{
      console.log(error);
    });
  }
  function cancel() {
    navigate("/")
  }
  return (
    <>
      <Navbar />
      <Flex
        justifyContent={["center", "center", "center", "space-around"]}
        alignItems="center"
        height="100%"
        p={4}
      >
        <Hide below="lg">
          <Flex maxWidth="400px" flexDir="column">
            <Heading fontSize="20px">
              Vantagens de ter uma conta no Mock Banco Digital
            </Heading>
            <Text mt={2}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam
              semper posuere tempor. Morbi sodales eros nunc, vel convallis mi
              scelerisque at. Integer blandit tortor quis cursus consectetur. Ut
              ac lacus eget sapien faucibus gravida. Sed mattis lectus augue,
              non hendrerit dui imperdiet eu. Integer ac nibh odio. Mauris
              rhoncus accumsan sagittis.
            </Text>
          </Flex>
          <Flex height="300px">
            <Divider orientation="vertical" />
          </Flex>
        </Hide>
        <form onSubmit={handleSubmit(cadastrar)}>
          <FormControl>
            <FormLabel>Nome*</FormLabel>
            <Input
              width={["max-content", "200px", "200px", "400px"]}
              type="text"
              placeholder="Nome"
              {...register("nome", {
                required: 'O campo "Nome" é obrigatório',
                minLength: {
                  value: 2,
                  message: 'O campo "Nome" precisa ter pelo menos 2 caracteres',
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
            id="email"
              type="text"
              placeholder="Email"
              {...register("email", {
                required: 'O campo "Email" é obrigatório',
                pattern: {
                  value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g,
                  message: "Email inválido",
                },
              })}
              onBlur={(e) => checarEmail(e.target.value)}
              onFocus={() => documentoEmail.style.borderColor = ""}
            />
          </FormControl>
          {email ? (<Text fontSize="10px" color="red">Este email já está em uso. Tente outro.</Text>): <Text></Text>}
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
            id="cpf"
              as={InputMask}
              mask="999.999.999-99"
              type="text"
              placeholder="CPF"
              {...register("cpf", {
                required: 'O campo "CPF" é obrigatório',
              })}
              onBlur={(e) => checarCPF(e.target.value)}
              onFocus={() => {
                
                documentoCpf.style.borderColor = ""
              }}
            />
          </FormControl>
          {cpf ? (<Text color="red" fontSize="10px">CPF em uso</Text>) : (<Text></Text>)}
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
             
              placeholder="Data de Nascimento"
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
                  {message} min={new Date().toISOString().split('T')[0]}
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
              <Button colorScheme="red" onClick={cancel}>Cancelar</Button>

              <Button
                disabled={cpf || email}
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
    </>
  );
}
