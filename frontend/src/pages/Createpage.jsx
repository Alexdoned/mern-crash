// src/pages/Createpage.jsx
import { VStack, Container, Heading, Box, Button, Input, Text } from "@chakra-ui/react";
import { useColorModeValue } from "../components/ui/color-mode";
import { useState } from "react";
import { useProductStore } from "../store/Product";
import { toaster } from "../components/ui/toaster"; // Import lowercase toaster engine

const Createpage = () => {
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    image: ""
  });
  
  // 1. Local state tracking the network promise lifecycle
  const [isLoading, setIsLoading] = useState(false);
  
  // Optional local tracking if you want a warning block explicitly under the button
  const [inlineNotification, setInlineNotification] = useState(null);

  const { createProduct } = useProductStore();
   
  const handleAddProduct = async () => {
    // Prevent submissions if clicked multiple times during a network request
    if (isLoading) return; 

    setIsLoading(true);
    setInlineNotification(null); // Reset layout warnings
    
    try {
      const { success, message } = await createProduct(newProduct);
      
      if (!success) {
        const errorMsg = message || "Failed to create product.";
        
        // Option A: Fire the global window Toaster
        toaster.create({
          title: "Error",
          description: errorMsg,
          type: "error",
        });

        // Option B: Set local inline notice state to render beneath the button
        setInlineNotification({ type: "error", text: errorMsg });

      } else {
        toaster.create({
          title: "Product Created",
          description: " Product created successfully.",
          type: "success", 
          duration: 3000,
        });
        
        setInlineNotification({ type: "success", text: "Created successfully!" });
        setNewProduct({ name: "", price: "", image: "" }); // Clear inputs
      }
    } catch (err) {
      toaster.create({
        title: "Error",
        description: "An unexpected error occurred.",
        type: "error",
      });
    } finally {
      setIsLoading(false); // Stop the spinner animation 
    }
  };
  
  return (
    <Container maxW="sm" p={10}>
      <VStack gap={8}>
        <Heading as="h1" size="2xl" textAlign="center" mb={4}>
          Create New Product
        </Heading>
        
        <Box 
          w="full" 
          bg={useColorModeValue("white", "gray.700")} 
          p={6} 
          borderRadius="lg" 
          boxShadow="md"
        >
          <VStack gap={6} p={4}>
            <Input 
              type="text" 
              placeholder="Product Name" 
              value={newProduct.name} 
              disabled={isLoading}
              onChange={(e) => setNewProduct({...newProduct, name: e.target.value})} 
            />
            <Input 
              type="number" 
              placeholder="Price" 
              value={newProduct.price} 
              disabled={isLoading}
              onChange={(e) => setNewProduct({...newProduct, price: e.target.value})} 
            />
            <Input 
              type="text" 
              placeholder="Image URL" 
              value={newProduct.image} 
              disabled={isLoading}
              onChange={(e) => setNewProduct({...newProduct, image: e.target.value})} 
            />
            
            {/* 2. Pass 'loading' and 'loadingText' natively to the Chakra v3 Button */}
            <Button 
              colorPalette="blue" 
              onClick={handleAddProduct} 
              w="full"
              loading={isLoading}
              loadingText="Creating..."
            >
              Add Product
            </Button>

            {/* 3. Local notification displayed explicitly directly beneath the button */}
            {inlineNotification && (
              <Box 
                w="full" 
                p={3} 
               
                borderRadius="md" 
                textAlign="center"
                bg={inlineNotification.type === "success" ? "cyan.600" : "red.600"}
                border="1px solid"
                borderColor={inlineNotification.type === "success" ? "white" : "red.300"}
              >
                <Text fontSize="sm" fontWeight="lg" color={inlineNotification.type === "success" ? "white" : "red.300"}>
                  {inlineNotification.text}
                </Text>
              </Box>
            )}

          </VStack>
        </Box>
      </VStack>
    </Container>
  );
};

export default Createpage;
