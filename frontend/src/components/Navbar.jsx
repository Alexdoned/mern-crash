import { Container, Flex, Text, Button, HStack} from "@chakra-ui/react"
import { Link } from "react-router-dom"
import { FaPlus } from "react-icons/fa"
import { useColorMode } from "../components/ui/color-mode"
import { LuSunMoon } from "react-icons/lu";
import { IoIosSunny } from "react-icons/io";






const Navbar = () => {
  const{ colorMode, toggleColorMode } = useColorMode();
  
  return (
    <Container maxW={"1140px"} px={4} >
        <Flex h={16} flexDirection={{base:"row"}} textAlign={"center"} justifyContent={"space-between"} >
            <Text fontSize={{base: "22px", sm: "28px"}} fontWeight={"bold"} textTransform={"uppercase"}
            bgGradient={"to-r"} gradientFrom={"cyan.400"} gradientTo={"blue.800"} bgClip={"text"}
            >
               
             <Link to={"/"}>
             Product Store🛒
             </Link>
            </Text>

            <HStack spacing={20} alignItems={"center"}>
                <Link to={"create"}>
                <Button>
                  <FaPlus fontSize={2} color={"white"} />
                </Button>
                </Link>
                <Button onClick={toggleColorMode}>
                  {colorMode == "light" ? <IoIosSunny/> : <LuSunMoon/>}
                </Button>
            </HStack>
        </Flex>
    </Container>
  )
}

export default Navbar
