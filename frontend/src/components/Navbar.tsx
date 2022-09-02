import { ArrowForwardIcon, LockIcon, UnlockIcon } from "@chakra-ui/icons";
import {
  Button,
  Flex,
  FormControl,
  Heading,
  Hide,
  HStack,
  IconButton,
  Input,
  Menu,
  MenuButton,
  MenuList,
  Show,
  Spacer,
  VStack,
} from "@chakra-ui/react";
import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Login } from "../models/Login";

export function Navbar() {
  const { register, handleSubmit, reset } = useForm<Login>();
  const [password, setPassword] = useState<string>("");

  const login: SubmitHandler<Login> = (data: Login) => {
    console.log("entrou");
  };
  return (
    <Flex alignItems="center" m={1}>
      <Flex>
        <Heading size="md">Banco Digital</Heading>
        <Spacer />
      </Flex>
      <Spacer />
      <Flex>
        <HStack>
          <Show breakpoint="(max-width: 800px)">
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
          <form>
            <Hide breakpoint="(max-width: 800px)">
              <Input
                width="250px"
                height="40px"
                type="text"
                placeholder="Email"
                mr={1}
                {...register("email")}
              />
              <Input
                width="100px"
                type="password"
                placeholder="Senha"
                {...register("password")}
                onChange={(e) => setPassword(e.target.value)}
              />

              {password.length < 1 ? (
                <Button
                disabled
                  as={IconButton}
                  background="none"
                  icon={<LockIcon />}
                />
              ) : (
                <Button
                  as={IconButton}
                  type="submit"
                  background="none"
                  icon={<ArrowForwardIcon />}
                />
              )}
            </Hide>
            <Button colorScheme="teal">abra sua conta</Button>
          </form>
        </HStack>
      </Flex>
    </Flex>
  );
}
