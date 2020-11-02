import React from "react";
import {
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Text,
  SimpleGrid,
  Box,
  Stack,
  Flex,
} from "@chakra-ui/core";
import CartLogo from "../../../assets/cart2.svg";
import { Divider } from "@material-ui/core";
const Menu = () => {
  interface values {
    id: String;
    name: String;
    qty: Number;
    price: Number;
  }
  const [data, setData] = React.useState<values[]>([
    { id: "Pizza", name: "Pizza", qty: 0, price: 63 },
    {
      id: "Burger",
      name: "Burger",
      qty: 0,
      price: 34,
    },
  ]);
  const handleChange = (ct: String, id: String): void => {
    let tp = Object.values(data).map((q) =>
      q.id === id ? { ...q, qty: Number(ct) } : { ...q }
    );
    setData({ ...tp });
    console.log(tp);
  };
  return (
    <>
      <Box
        bg="#fff"
        d="flex"
        flex="1"
        w="100%"
        h="87vh"
        p={4}
        color="#000"
        justifyContent="space-around"
        alignItems="center"
      >
        <Box
          justifyContent="center"
          alignItems="center"
          d="flex"
          flexDirection="column"
        >
          <img width={220} height={220} src={CartLogo} />
          <Text
            alignSelf="center"
            m={5}
            fontSize="2xl"
            fontWeight={500}
            fontFamily={"monospace"}
            color="#505050"
          >
            Add your favourite food to cart.
          </Text>
        </Box>
        <Divider orientation="vertical" />
        <Box d="flex" flexDirection="column">
          <Box
            spacing={10}
            p={7}
            m={10}
            borderWidth="1px"
            flex="1"
            rounded="md"
            justifyContent="flex-end"
          >
            <Flex
              flexDirection="row"
              alignSelf="center"
              justifyContent="space-between"
            >
              <Box
                height="3px"
                d="flex"
                justifyContent="center"
                flexDirection="column"
                fontWeight="600"
              >
                Item Name
              </Box>
              <Box
                height="3px"
                d="flex"
                justifyContent="center"
                flexDirection="column"
                fontWeight="600"
              >
                Price
              </Box>
              <Box
                height="3px"
                d="flex"
                justifyContent="center"
                flexDirection="column"
              >
                Quantity
              </Box>
              <Box
                height="3px"
                d="flex"
                justifyContent="center"
                flexDirection="column"
              >
                TotalPrice
              </Box>
            </Flex>
          </Box>
          {Object.values(data).map((q) => (
            <Box
              spacing={10}
              p={7}
              ml={10}
              mr={10}
              mb={2}
              borderWidth="1px"
              flex="1"
              rounded="md"
            >
              <Flex
                flexDirection="row"
                alignSelf="center"
                w={600}
                justifyContent="space-between"
              >
                <Box
                  height="3px"
                  w={100}
                  d="flex"
                  justifyContent="center"
                  alignItems="center"
                  fontWeight="600"
                >
                  {q.name}
                </Box>
                <Box
                  height="3px"
                  w={100}
                  d="flex"
                  justifyContent="center"
                  alignItems="center"
                  flexDirection="column"
                  fontWeight="600"
                >
                  ₹ {q.price}
                </Box>
                <Box
                  height="3px"
                  w={100}
                  d="flex"
                  justifyContent="center"
                  alignItems="center"
                  flexDirection="column"
                >
                  <NumberInput
                    defaultValue={Number(q.qty)}
                    onChange={(ct) => handleChange(ct, q.id)}
                    min={0}
                    max={20}
                    maxWidth={100}
                  >
                    <NumberInputField />
                    <NumberInputStepper>
                      <NumberIncrementStepper />
                      <NumberDecrementStepper />
                    </NumberInputStepper>
                  </NumberInput>
                </Box>
                <Box
                  height="3px"
                  w={100}
                  d="flex"
                  justifyContent="center"
                  alignItems="flex-end"
                  flexDirection="column"
                >
                  ₹ {Number(q.price)*Number(q.qty)}
                </Box>
              </Flex>
            </Box>
          ))}
        </Box>
      </Box>
    </>
  );
};
export default Menu;