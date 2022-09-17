import { Flex, FormControl, Input } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import InputMask from "react-input-mask";
import { Navbar } from "./Navbar";
export function Cadastro() {
  const { register, handleSubmit } = useForm();

  return (
    <>
    <Navbar />
      <Flex justifyContent="center" height="500px" alignItems="center">
        <Flex>
          <form>
            <FormControl>
              <Input type="text" placeholder="Nome" />
            </FormControl>

            <FormControl>
              <Input type="text" placeholder="Email" />
            </FormControl>

            <FormControl>
              <Input
                as={InputMask}
                mask="99/99/9999"
                type="text"
                placeholder="Data de Nascimento"
              />
            </FormControl>

            <FormControl>
              <Input
                as={InputMask}
                mask="999.999.999-99"
                type="text"
                placeholder="CPF"
              />
            </FormControl>

            <FormControl>
                <Input type="password" placeholder="Senha" />
            </FormControl>
          </form>
        </Flex>
      </Flex>
    </>
  );
}
