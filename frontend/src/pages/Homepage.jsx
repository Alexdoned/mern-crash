import { VStack, Container, SimpleGrid, Text } from "@chakra-ui/react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useProductStore } from "../store/Product";
import ProductCard from "../components/ProductCard";

const Homepage = () => {
  const { fetchProducts, products, deleteProduct, updateProduct } = useProductStore();

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  
  return (
    <Container maxW={"container.lg"} py={12}>
      <VStack gap={8}>
          <Text
          textAlign="center"
          fontSize={30}
          fontWeight="bold"
          bgGradient={"to-r"} gradientFrom={"cyan.400"} gradientTo={"blue.800"} bgClip={"text"}
        >
          Current Products 🚀
        </Text>

        {/* 2. Condition: Only render the layout grid if products exist */}
        {products && products.length > 0 ? (
          <SimpleGrid
            columns={{
              base: 1,
              md: 2,
              lg: 3,
            }}
            gap={10}
            w={"full"}
          >
            {products.map((product) => (
              <ProductCard
                key={product._id}
                product={product}
               
              />
              ))}
              </SimpleGrid>
              ) : (
                  
              <Text fontSize={"xl"} fontWeight={"bold"} textAlign={"center"} color={"gray.500"}>
                 No Product Found 😥{" "}
                <Link to={"/create"}>
              <Text as={"span"} color={"blue.700"} _hover={{ textDecoration: "underline" }}>
                Create a product
              </Text>
             </Link>
            </Text>
          )}
      </VStack>
    </Container>
  )
};

export default Homepage;
