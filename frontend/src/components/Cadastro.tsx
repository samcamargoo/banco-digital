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
  Icon,
  Input,
  InputGroup,
  InputLeftElement,
  Link,
  Text,
  useFormErrorStyles,
} from "@chakra-ui/react";
import { SubmitHandler, useForm } from "react-hook-form";
import InputMask from "react-input-mask";
import { CadastroUsuario } from "../models/CadastroUsuario";
import { Navbar } from "./Navbar";
import { useState, useRef } from "react";
import { ErrorMessage } from "@hookform/error-message";
import {
  cadastrarCliente,
  checarCpfExistente,
  checarEmailExistente,
} from "../services/ClienteService";
import { Footer } from "./Footer";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import { IMaskInput } from "react-imask";
import { PhoneIcon } from "@chakra-ui/icons";
import {
  AiOutlineArrowLeft,
  AiOutlineCalendar,
  AiOutlineCreditCard,
  AiOutlineLock,
  AiOutlineMail,
  AiOutlineUser,
} from "react-icons/ai";
export function Cadastro() {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<CadastroUsuario>({ criteriaMode: "all" });

  const [cpf, setCpf] = useState<boolean>(false);
  const [email, setEmail] = useState<boolean>(false);
  const password = useRef({});
  password.current = watch("password", "");

  const [buttonDisable, setButtonDisable] = useState<boolean>(false);
  const navigate = useNavigate();
  const documentoCpf = document.getElementById("cpf") as HTMLInputElement;
  const documentoEmail = document.getElementById("email") as HTMLInputElement;
  const cadastrar: SubmitHandler<CadastroUsuario> = (data: CadastroUsuario) => {
    data.dataNascimento = new Date(data.dataNascimento);
    setButtonDisable(true);

    cadastrarCliente(data)
      .then((res) => {
        setButtonDisable(false);
        toast.success("Cadastrado com sucesso!");
        reset();
        navigate("/");
      })
      .catch((error) => {
        setButtonDisable(false);
        toast.error(error.response.data);
      });
  };

  function checarEmail(e: string) {
    setEmail(false);
    checarEmailExistente(e).then((res) => {
      if (res.data) {
        setEmail(true);
        documentoEmail.style.borderColor = "red";
      }
    });
  }

  function checarCPF(e: string) {
    setCpf(false);
    checarCpfExistente(e)
      .then((res) => {
        if (res.data) {
          setCpf(true);
          documentoCpf.style.borderColor = "red";
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <>
      <Flex
        justifyContent={["center", "center", "center", "space-around"]}
        alignItems="center"
        height="37.5rem"
        p={4}
      >
        <Hide below="lg">
          <Flex maxWidth="400px" flexDir="column">
            <Heading fontSize="20px">
              Vantagens de ter uma conta no Mock Banco Digital
            </Heading>
            <Text mt={2} color="#a8a8b3">
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

        <Flex flexDir="column" color="rgb(130, 87, 230)">
          <Link
            mb={1}
            _hover={{
              textDecoration: "none",
            }}
            href="/"
          >
            <Flex alignItems="center">
              <Icon as={AiOutlineArrowLeft} mr={5} />

              <Text color="rgb(130, 87, 230)">
                voltar para a p??gina inicial
              </Text>
            </Flex>
          </Link>

          <Flex
            height="500px"
            backgroundColor="rgb(32, 32, 36)"
            borderRadius="7px"
            width="480px"
            justifyContent="space-around"
            p={35}
            flexDir="column"
          >
            <Heading>crie sua conta</Heading>
            <form onSubmit={handleSubmit(cadastrar)}>
              <FormControl>
                <InputGroup>
                  <InputLeftElement
                    pointerEvents="none"
                    children={<AiOutlineUser />}
                  />
                  <Input
                    
                    type="text"
                    placeholder="Seu nome"
                    mb={1}
                    {...register("nome", {
                      required: 'O campo "Nome" ?? obrigat??rio',
                      pattern: {
                        value: /[A-Za-z]/g,
                        message: "Somente caracteres de a-Z",
                      },
                      minLength: {
                        value: 2,
                        message:
                          'O campo "Nome" precisa ter pelo menos 2 caracteres',
                      },
                    })}
                  />
                </InputGroup>
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
                <InputGroup>
                  <InputLeftElement
                    pointerEvents="none"
                    children={<AiOutlineMail />}
                  />
                  <Input
                    id="email"
                    type="text"
                    placeholder="Seu E-mail"
                    mb={1}
                    {...register("email", {
                      required: 'O campo "Email" ?? obrigat??rio',
                      pattern: {
                        value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g,
                        message: "Email inv??lido",
                      },
                    })}
                    onBlur={(e) => checarEmail(e.target.value)}
                    onFocus={() => (documentoEmail.style.borderColor = "")}
                  />
                </InputGroup>
              </FormControl>
              {email ? (
                <Text fontSize="10px" color="red">
                  Este email j?? est?? em uso. Tente outro.
                </Text>
              ) : (
                <Text></Text>
              )}
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
                <InputGroup>
                  <InputLeftElement
                    pointerEvents="none"
                    children={<AiOutlineCreditCard />}
                  />
                  <Input
                    id="cpf"
                    as={InputMask}
                    mask="999.999.999-99"
                    type="text"
                    placeholder="Seu CPF"
                    mb={1}
                    {...register("cpf", {
                      required: 'O campo "CPF" ?? obrigat??rio',
                    })}
                    onBlur={(e) => checarCPF(e.target.value)}
                    onFocus={() => {
                      documentoCpf.style.borderColor = "";
                    }}
                  />
                </InputGroup>
              </FormControl>
              {cpf ? (
                <Text color="red" fontSize="10px">
                  CPF em uso
                </Text>
              ) : (
                <Text></Text>
              )}
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
                <InputGroup>
                  <InputLeftElement
                    pointerEvents="none"
                    children={<AiOutlineCalendar />}
                  />
                  <Input
                    as={InputMask}
                    mask="99/99/9999"
                    placeholder="Sua data de nascimento"
                    mb={1}
                    {...register("dataNascimento", {
                      required: 'O campo "Data de Nascimento" ?? obrigat??rio',
                    })}
                  />
                </InputGroup>
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
                <InputGroup>
                  <InputLeftElement
                    pointerEvents="none"
                    children={<AiOutlineLock />}
                  />
                  <Input
                    type="password"
                    placeholder="Sua senha"
                    mb={1}
                    {...register("password", {
                      required: 'O campo "Senha" ?? obrigat??rio',
                      minLength: {
                        value: 3,
                        message: "A senha deve ter no m??nimo 3 caracteres",
                      },
                    })}
                  />
                </InputGroup>
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
                <InputGroup>
                  <InputLeftElement
                    pointerEvents="none"
                    children={<AiOutlineLock />}
                  />
                  <Input
                    type="password"
                    placeholder="Confirme sua senha"
                    {...register("confirma_password", {
                      validate: (value) =>
                        password.current === value || "Senhas n??o coincidem",
                    })}
                  />
                </InputGroup>
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
                <Button
                  width="100%"
                  color="white"
                  textTransform="uppercase"
                  disabled={cpf || email}
                  background="rgb(130, 87, 229)"
                  type="submit"
                  isLoading={buttonDisable}
                >
                  Cadastrar
                </Button>
              </Flex>
            </form>
          </Flex>
        </Flex>
      </Flex>
    </>
  );
}
