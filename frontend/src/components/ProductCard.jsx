import { useState, useEffect } from "react";
import { Box, Image, Heading, Text, HStack, IconButton, Input, Button, Stack } from "@chakra-ui/react";
import { Pencil, Trash2 } from "lucide-react";
import { useProductStore } from "../store/Product";

// CHAKRA V3 LOCAL RE-PATHING: Pointing exactly to files inside your local ui folder
import { useColorModeValue } from "./ui/color-mode";
import { toaster } from "./ui/toaster";
import {
  DialogActionTrigger,
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogRoot,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog"; // Fixed to point cleanly to the newly created snippet folder

const ProductCard = ({ product }) => {
  const textColor = useColorModeValue("gray.600", "gray.200");
  const bg = useColorModeValue("white", "gray.800");
  
  const { deleteProduct, updateProduct, fetchProducts } = useProductStore();

  const [isEditOpen, setIsEditOpen] = useState(false);
  const [updatedProduct, setUpdatedProduct] = useState({
    name: product.name,
    price: product.price,
    image: product.image,
  });

  useEffect(() => {
    setUpdatedProduct({
      name: product.name,
      price: product.price,
      image: product.image,
    });
  }, [product]);

  const handleDeleteProduct = async (pid) => {
    const { success, message } = await deleteProduct(pid);
    
    toaster.create({
      title: success ? "Success" : "Error",
      description: message,
      type: success ? "success" : "error",
      duration: 3000,
    });

    if (success && fetchProducts) {
      await fetchProducts();
    }
  };

  const handleUpdateProduct = async (pid) => {
    const priceNum = Number(updatedProduct.price);
    if (Number.isNaN(priceNum) || priceNum <= 0) {
      toaster.create({ 
        title: "Error", 
        description: "Please enter a valid numeric price.", 
        type: "error" 
      });
      return;
    }

    const { success, message } = await updateProduct(pid, { 
      ...updatedProduct, 
      price: priceNum 
    });
    
    toaster.create({
      title: success ? "Success" : "Error",
      description: "Update successfully",
      type: success ? "success" : "error",
      duration: 3000,
    });

    if (success) {
      setIsEditOpen(false);
      if (fetchProducts) {
        await fetchProducts();
      }
    }
  };

  return (
    <Box shadow="lg" rounded="lg" overflow="hidden" bg={bg}>
      <Image src={product.image} alt={product.name} h={48} w="full" objectFit="cover" />
      
      <Box p={4}>
        <Heading as="h3" size="md" mb={2}>{product.name}</Heading>
        <Text fontWeight="bold" fontSize="xl" color={textColor} mb={4}>${product.price}</Text>
        
        <HStack gap={2}>
          
          {/* Chakra UI v3 Dialog component panel */}
          <DialogRoot open={isEditOpen} onOpenChange={(e) => setIsEditOpen(e.open)}>
            <DialogTrigger asChild>
              <IconButton aria-label="Edit item" variant="ghost" colorPalette="blue">
                <Pencil size={18} />
              </IconButton>
            </DialogTrigger>
            
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Update Product Details</DialogTitle>
              </DialogHeader>
              
              <DialogBody>
                <Stack gap={4}>
                  <Input 
                    placeholder="Product Name" 
                    value={updatedProduct.name} 
                    onChange={(e) => setUpdatedProduct({ ...updatedProduct, name: e.target.value })} 
                  />
                  <Input 
                    placeholder="Price" 
                    type="number" 
                    value={updatedProduct.price} 
                    onChange={(e) => setUpdatedProduct({ ...updatedProduct, price: e.target.value })} 
                  />
                  <Input 
                    placeholder="Image URL" 
                    value={updatedProduct.image} 
                    onChange={(e) => setUpdatedProduct({ ...updatedProduct, image: e.target.value })} 
                  />
                </Stack>
              </DialogBody>
              
              <DialogFooter>
                <DialogActionTrigger asChild>
                  <Button variant="outline">Cancel</Button>
                </DialogActionTrigger>
                <Button colorPalette="blue" onClick={() => handleUpdateProduct(product._id)}>
                  Save Changes
                </Button>
              </DialogFooter>
              <DialogCloseTrigger />
            </DialogContent>
          </DialogRoot>

          <IconButton 
            onClick={() => handleDeleteProduct(product._id)} 
            aria-label="Delete item" 
            variant="ghost" 
            colorPalette="red"
          >
            <Trash2 size={18} />
          </IconButton>
        </HStack>
      </Box>
    </Box>
  );
};

export default ProductCard;
