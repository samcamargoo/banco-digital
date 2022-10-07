import { ArrowForwardIcon, LockIcon, UnlockIcon } from "@chakra-ui/icons";
import {
  Button,
  Flex,
  FormControl,
  Heading,
  Hide,
  HStack,
  Icon,
  IconButton,
  Input,
  Link,
  Menu,
  MenuButton,
  MenuList,
  Show,
  Spacer,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { LoginUsuario } from "../models/LoginUsuario";
import { Link as ReachLink, Navigate } from "react-router-dom";
import { loginDeUsuario } from "../services/LoginService";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { setToken } from "../services/Api";
import { listarInfoCliente } from "../services/ClienteService";
import { Conta } from "../models/Conta";
import { CgProfile } from "react-icons/cg";
export function Navbar() {
  const { register, handleSubmit, reset } = useForm<LoginUsuario>();
  const [usuario, setUsuario] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [conta, setConta] = useState<Conta>();
  const navigate = useNavigate();
  const [isLogado, setIsLogado] = useState<boolean>(false);
  const { setAuth } = useAuth();
  const { auth } = useAuth();

  function getClienteInfo() {
    listarInfoCliente(usuario).then((res) => {
      setConta(res.data);
    });
  }

  useEffect(() => {
    if (isLogado) {
      getClienteInfo();
    }
  }, [isLogado]);

  const login: SubmitHandler<LoginUsuario> = (data: LoginUsuario) => {
    loginDeUsuario(data)
      .then((res) => {
        const tokenJwt = res.data.token;
        console.log(res.data);
        setToken(tokenJwt);
        setAuth({ usuario, password, tokenJwt });
        navigate("/conta");
        setIsLogado(true);
        reset();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  function displayNaoLogado() {
    return (
      <>
        <HStack>
          <Show below="md">
            <Menu>
              <MenuButton
                as={IconButton}
                aria-label="options"
                icon={<LockIcon />}
                variant="outline"
              />

              <MenuList>
                <Flex justifyContent="center">
                  <form onSubmit={handleSubmit(login)}>
                    <VStack>
                      <FormControl>
                        <Input
                          type="text"
                          placeholder="Email"
                          {...register("email")}
                          onChange={(e) => setUsuario(e.target.value)}
                        />
                      </FormControl>
                      <FormControl>
                        <Input
                          type="password"
                          placeholder="Senha"
                          {...register("password")}
                          onChange={(e) => setPassword(e.target.value)}
                        />
                      </FormControl>
                    </VStack>
                    <Flex mt={1}>
                      {password.length < 1 ? (
                        <Button
                          type="submit"
                          disabled
                          colorScheme="teal"
                          width="100%"
                        >
                          Entrar
                        </Button>
                      ) : (
                        <Button type="submit" colorScheme="teal" width="100%">
                          Entrar
                        </Button>
                      )}
                    </Flex>
                  </form>
                </Flex>
              </MenuList>
            </Menu>
          </Show>
          <form onSubmit={handleSubmit(login)}>
            <Hide below="md">
              <Input
                width="250px"
                height="40px"
                type="text"
                bgColor="white"
                placeholder="Email"
                mr={1}
                {...register("email")}
                onChange={(e) => setUsuario(e.target.value)}
              />
              <Input
                width="100px"
                type="password"
                placeholder="Senha"
                bgColor="white"
                {...register("password")}
                onChange={(e) => setPassword(e.target.value)}
              />

              {password.length < 1 ? (
                <Button
                  disabled
                  as={IconButton}
                  background="none"
                  color="#4717F6"
                  variant="ghost"
                  borderColor="#4717F6"
                  icon={<LockIcon />}
                />
              ) : (
                <Button
                  as={IconButton}
                  type="submit"
                  background="none"
                  color="#4717F6"
                  variant="ghost"
                  borderColor="#4717F6"
                  icon={<ArrowForwardIcon />}
                />
              )}
            </Hide>
            <Link
              as={ReachLink}
              to="/criar-conta"
              _hover={{
                textDecoration: "none",
              }}
            >
              <Button
                variant="outline"
                color="white"
                fontSize="12px"
                borderColor="#4717F6"
                fontWeight="700"
                textTransform="uppercase"
                _hover={{
                  background: "#4717F6",
                }}
              >
                abra sua conta
              </Button>
            </Link>
          </form>
        </HStack>
      </>
    );
  }
  function deslogarUsuario() {
    setAuth({});
    navigate("/");
    setIsLogado(false);
  }
  function displayLogado() {
    return (
      <>
        <Flex alignItems="center" flexDir="column" pr={2} color="white">
          <Flex alignItems="center">
            <IconButton
              aria-label="profile"
              variant="ghost"
              fontSize="20px"
              icon={<CgProfile />}
              _hover={{}}
              _active={{}}
            ></IconButton>
          </Flex>
          <Link onClick={deslogarUsuario}>Sair</Link>
        </Flex>
      </>
    );
  }
  return (
    <Flex
      alignItems="center"
      backgroundColor="#121214"
      height="100px"
      boxShadow="inset 0 -1px 0 #29292e"
    >
      <Flex>
        {auth.usuario ? (
          <>
            <Link
              as={ReachLink}
              to="/conta"
              _hover={{
                textDecoration: "none",
              }}
            >
              <Heading as="h4" size="md" ml={1} color="#4717F6">
                Banco Digital
              </Heading>
            </Link>
          </>
        ) : (
          <>
            <Link
              as={ReachLink}
              to="/"
              _hover={{
                textDecoration: "none",
              }}
            >
              <Heading size="md" ml={1} color="white">
                Banco Digital
              </Heading>
            </Link>
          </>
        )}

        <Spacer />
      </Flex>
      <Spacer />
      <Flex mr={1}>{auth.usuario ? displayLogado() : displayNaoLogado()}</Flex>
    </Flex>
  );
}
