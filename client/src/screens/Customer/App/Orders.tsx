import React from "react";
import {
  Box,
  Divider,
  Text,
  Flex,
  RadioGroup,
  Radio,
  SimpleGrid,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Stack,
  Input,
  InputRightAddon,
  InputGroup,
  InputLeftAddon,
  InputRightElement,
  useToast,
  IconButton,
  Icon,
} from "@chakra-ui/core";
import { useHistory, useRouteMatch } from "react-router-dom";
import OrderLogo from "../../../assets/orderr.svg";
import Moment from "moment";
import { MdKeyboardArrowRight } from "react-icons/md";
import { mdiChevronRight } from "@mdi/js";
const Orders = () => {
  function getWidth() {
    return Math.max(
      document.body.scrollWidth,
      document.documentElement.scrollWidth,
      document.body.offsetWidth,
      document.documentElement.offsetWidth,
      document.documentElement.clientWidth
    );
  }
  interface values {
    id: String;
    name: String;
    qty: Number;
    price: Number;
  }
  interface Ordervalues {
    id: String;
    timestamp: String;
    paymentMethod: String;
    Order: values[];
  }
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [value, setValue] = React.useState("COD");
  const [data1, setData1] = React.useState<values[]>([]);
  const [data, setData] = React.useState<Ordervalues[]>([
    {
      id: "389r9ha",
      timestamp: Moment().format("lll"),
      paymentMethod: "UPI",
      Order: [
        { id: "Pizza", name: "Pizza", qty: 10, price: 63 },
        {
          id: "Burger",
          name: "Burger",
          qty: 12,
          price: 34,
        },
      ],
    },
    {
      id: "98shsgd",
      timestamp: Moment().format("lll"),
      paymentMethod: "Card",
      Order: [
        { id: "Pasta", name: "Pasta", qty: 10, price: 63 },
        {
          id: "Veg Burger",
          name: "Veg Burger",
          qty: 10,
          price: 34,
        },
      ],
    },
  ]);
  let price: number = 0;
  const [pr, setPr] = React.useState(0);
  React.useEffect(() => {
    price = 0;
    // if (Object.keys(data1).length != 0) {
    Object.values(data1).map((q) => (price += Number(q.qty) * Number(q.price)));
    // }
    setPr(price);
    console.log("Rupees" + price);
  }, [data1]);

  let paymentModal = (
    <>
      {/* <Button onClick={onOpen}>Open Modal</Button> */}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Order Details</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box w={"52vh"} border="1px" p={5}>
              <SimpleGrid columns={2} spacing={1}>
                <Box height="40px" fontFamily={"monospace"}>
                  {"Item Name"}
                </Box>
                <Box
                  height="40px"
                  fontFamily={"monospace"}
                  d="flex"
                  flexDirection="column"
                  alignItems="flex-end"
                >
                  {"Unit Price"}
                </Box>
              </SimpleGrid>
              <Divider mb={5} />
              {Object.values(data1).map((q) => (
                <SimpleGrid columns={2} spacing={1}>
                  <Box height="40px" fontFamily={"monospace"}>
                    {q.name + " X " + q.qty}
                  </Box>
                  <Box
                    height="40px"
                    fontFamily={"monospace"}
                    d="flex"
                    flexDirection="column"
                    alignItems="flex-end"
                  >
                    ₹ {q.price + " per qty"}
                  </Box>
                </SimpleGrid>
              ))}
              <Box
                fontFamily={"monospace"}
                d="flex"
                flexDirection="column"
                alignItems="flex-end"
                m={1}
              >
                Total Price excluding tax: ₹ {pr}
              </Box>
              <Box
                fontFamily={"monospace"}
                d="flex"
                flexDirection="column"
                alignItems="flex-end"
                m={1}
              >
                Packaging and Shipping @5%: ₹ {Math.round(pr * 5) / 100}
              </Box>
              <Box
                fontFamily={"monospace"}
                d="flex"
                flexDirection="column"
                alignItems="flex-end"
                m={1}
              >
                GST @18%: ₹ {Math.round(pr * 18) / 100}
              </Box>
              <Box
                fontFamily={"monospace"}
                d="flex"
                flexDirection="column"
                alignItems="flex-end"
                m={1}
              >
                Total Price incl Tax: ₹ {Math.round(pr * 123) / 100}
              </Box>
              <Box
                fontFamily={"monospace"}
                d="flex"
                flexDirection="row"
                justifyContent="flex-end"
                alignItems="center"
                mt={5}
              >
                Payment Method : {value}
              </Box>
              <Box
                fontFamily={"monospace"}
                d="flex"
                flexDirection="row"
                justifyContent="flex-end"
                alignItems="center"
                mt={5}
              ></Box>
            </Box>
          </ModalBody>

          <ModalFooter>
            <Button variantColor="blue" onClick={onClose}>
              Close
            </Button>
            {/* <Button variant="ghost">Secondary Action</Button> */}
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
  return (
    <>
      {paymentModal}
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
          <img width={220} height={220} src={OrderLogo} />
          <Text
            alignSelf="center"
            m={5}
            fontSize="2xl"
            fontWeight={500}
            fontFamily={"monospace"}
            color="#505050"
          >
            Orders Page :)
          </Text>
        </Box>
        <Divider orientation="vertical" />
        <Box d="flex" flexDirection="column">
          {Object.values(data).map((q) => (
            <Button
              bg="#505050"
              color="#fff"
              spacing={10}
              p={7}
              m={2}
              borderWidth="1px"
              flex="1"
              rounded="md"
              //w="50%"
              onClick={() => {
                setData1(q.Order);
                onOpen();
                setValue(String(q.paymentMethod));
              }}
              justifyContent="space-between"
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
                  alignSelf="flex-start"
                  fontWeight="600"
                  pr={200}
                  fontFamily={"monospace"}
                >
                  Order Name: {q.id}
                </Box>
                <Box
                  height="3px"
                  d="flex"
                  justifyContent="center"
                  flexDirection="column"
                  fontWeight="600"
                  alignSelf="flex-end"
                  fontFamily={"monospace"}
                >
                  {q.timestamp}
                </Box>
                <Box
                  height="3px"
                  d="flex"
                  justifyContent="center"
                  flexDirection="column"
                  fontWeight="600"
                  alignSelf="flex-end"
                  fontFamily={"monospace"}
                  ml={5}
                >
                  <Box
                    as={MdKeyboardArrowRight}
                    size="32px"
                    color="green.400"
                  />
                </Box>
              </Flex>
            </Button>
          ))}
        </Box>
      </Box>
    </>
  );
};

export default Orders;
