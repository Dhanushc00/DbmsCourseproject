import React from "react";
import {
  Box,
  Divider,
  Text,
  Flex,
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
} from "@chakra-ui/core";
import { useHistory, useRouteMatch } from "react-router-dom";
import OrderLogo from "../../../assets/orderr.svg";
import Moment from "moment";
import { MdKeyboardArrowRight } from "react-icons/md";
import { mdiChevronRight } from "@mdi/js";
import Header from "./DeliveryHeader";
import { idText } from "typescript";
import EmptyLogo from "../../../assets/empty.svg";
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
  // interface Ordervalues {
  //   id: String;
  //   timestamp: String;
  //   paymentMethod: String;
  //   Order: values[];
  // }
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [value, setValue] = React.useState("COD");
  const [data1, setData1] = React.useState<values[]>([
    { id: "Pizza", name: "Pizza", qty: 10, price: 63 },
    {
      id: "Burger",
      name: "Burger",
      qty: 12,
      price: 34,
    },
  ]);
  // const [data, setData] = React.useState<Ordervalues[]>([
  //   {
  //     id: "389r9ha",
  //     timestamp: Moment().format("lll"),
  //     paymentMethod: "UPI",
  //     Order: [
  //       { id: "Pizza", name: "Pizza", qty: 10, price: 63 },
  //       {
  //         id: "Burger",
  //         name: "Burger",
  //         qty: 12,
  //         price: 34,
  //       },
  //     ],
  //   },
  //   {
  //     id: "98shsgd",
  //     timestamp: Moment().format("lll"),
  //     paymentMethod: "Card",
  //     Order: [
  //       { id: "Pasta", name: "Pasta", qty: 10, price: 63 },
  //       {
  //         id: "Veg Burger",
  //         name: "Veg Burger",
  //         qty: 10,
  //         price: 34,
  //       },
  //     ],
  //   },
  // ]);
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
  const [isempty, setIsEmpty] = React.useState(data1.length == 0);
  if (isempty) {
    return (
      <>
      <Header/>
      <Box d="flex" justifyContent="center" alignItems="center" w="100%" h="87vh" flexDirection="column">
        <img width={220} height={220} src={EmptyLogo} />
        <Text fontFamily="monospace" fontSize="2xl" fontWeight={600} pb={8}>. . . Empty . . .</Text>
        <Text fontFamily="monospace" fontSize="2xl" fontWeight={600} pb={8}>Order will be assigned soon</Text>
      </Box>
      </>
    );
  }

  return (
    <>
      <Header />
      <Box
        bg="#fff"
        d="flex"
        flex="1"
        w="100%"
        h="87vh"
        p={4}
        color="#000"
        justifyContent="center"
        alignItems="center"
        flexDirection="column"
      >
        <Text fontFamily="monospace" fontSize="2xl" fontWeight={600} pb={8}>
          Delivery Order
        </Text>
        <Box
          borderWidth={4}
          borderColor="#6d56d8"
          w="50%"
          d="flex"
          flexDirection="column"
          p={5}
          justifyContent="center"
          alignItems="center"
        >
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
          <Box p={1}>Delivery Address : {"Delivery address"}</Box>
          <Box p={1} pb={2}>
            LandMark : {"Delivery address"}
          </Box>
          <Button bg="#2ECC71" textColor="#fff">
            {" "}
            Delivered
          </Button>
        </Box>
      </Box>
    </>
  );
};

export default Orders;
