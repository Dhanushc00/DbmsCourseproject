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
import { useSelector } from "react-redux";
import Axios from "../../../axios";
import swal from 'sweetalert';
//import {CustIDAction,CustID,CustIDState} from '../../../store/Cust';
import { rootReducerType } from "../../../store/store";
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
  const id: number = useSelector((state: rootReducerType) => {
    console.log(state.DelID.id);
    return Number(state.DelID.id);
  });
  interface Ivalues {
    ItemID: number;
    ItemName: string;
    ItemPrice: number;
    Quantity: number;
    OrderID: number;
  }
  interface IRec {
    data: Ivalues[];
  }

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [value, setValue] = React.useState("COD");
  const [data1, setData1] = React.useState<values[]>([]);
  interface Idetails {
    EmpID: number;
    EmpName: string;
    Phone: string;
    Gender: string;
    Joindate: string;
    Password: string;
    LocID: number | null;
    Address: string | null;
    Landmarks: string | null;
  }
  interface IRec2 {
    data: Idetails;
  }
  interface IAddress {
    address: string | null;
    landmark: string | null;
  }
  const [address, setAddress] = React.useState<IAddress>({
    address: "",
    landmark: "",
  });
  const [name, setName] = React.useState("");
  const [orderid, setOrderid] = React.useState(0);
  React.useEffect(() => {
    Axios.get("/delAgt/Details", {
      params: { EmpID: id },
    })
      .then((res: IRec2) => {
        console.log(res);
        setName(res.data.EmpName);
        setAddress({ address: res.data.Address, landmark: res.data.Landmarks });
        // const tp = Object.values(res.data).map((q: Ivalues) => {
        //   return {
        //     id: String(q.ItemPrice) + q.ItemName,
        //     qty: Number(q.Quantity),
        //     price: q.ItemPrice,
        //     name: q.ItemName,
        //   };
        // });
        // console.log(tp);
        // setData1(tp);
      })
      .catch((err: any) => {
        if (err.response) {
          console.log("delAgt details fetch failure");
          console.log(err);
        } else {
          console.log("not connected to internet");
        }
      })
      .finally(() => console.log("stop loading"));
    /*------------*/
    Axios.get("/delAgt", {
      params: { EmpID: id },
    })
      .then((res: IRec) => {
        setOrderid(res.data[0].OrderID);
        const tp = res.data.map((q: Ivalues) => {
          return {
            id: String(q.ItemPrice) + q.ItemName,
            qty: Number(q.Quantity),
            price: q.ItemPrice,
            name: q.ItemName,
          };
        });
        console.log(tp);
        setData1(tp);
      })
      .catch((err: any) => {
        if (err.response) {
          console.log("delAgt details fetch failure");
          console.log(err);
        } else {
          console.log("not connected to internet");
        }
      })
      .finally(() => console.log("stop loading"));
  }, []);
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
  const [isempty, setIsEmpty] = React.useState(data1.length == 0);
  React.useEffect(() => {
    price = 0;
    // if (Object.keys(data1).length != 0) {
    Object.values(data1).map((q) => (price += Number(q.qty) * Number(q.price)));
    // }
    setPr(price);
    setIsEmpty(data1.length == 0);
    console.log("Rupees" + price);
  }, [data1]);
  if (isempty) {
    return (
      <>
        <Header />
        <Box
          d="flex"
          justifyContent="center"
          alignItems="center"
          w="100%"
          h="87vh"
          flexDirection="column"
        >
          <img width={220} height={220} src={EmptyLogo} />
          <Text fontFamily="monospace" fontSize="2xl" fontWeight={600} pb={8}>
            . . . Empty . . .
          </Text>
          <Text fontFamily="monospace" fontSize="2xl" fontWeight={600} pb={8}>
            Order will be assigned to you soon Mr.{name}
          </Text>
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
          Please deliver this order to the Address given below Mr.{name}
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
          <Box p={1}>Delivery Address : {address.address}</Box>
          <Box p={1} pb={2}>
            LandMark : {address.landmark}
          </Box>
          <Button
            bg="#2ECC71"
            textColor="#fff"
            onClick={() => {
              Axios.get("/delAgt/Delivered", {
                params: { EmpID: id, OrderID: orderid },
              })
                .then((res: IRec) => {
                  console.log(res);
                  setData1([]);
                  swal("Delivered", "", "success");
                })
                .catch((err: any) => {
                  if (err.response) {
                    console.log("delAgt details fetch failure");
                    console.log(err);
                  } else {
                    console.log("not connected to internet");
                  }
                })
                .finally(() => console.log("stop loading"));
            }}
          >
            {" "}
            Delivered
          </Button>
        </Box>
      </Box>
    </>
  );
};

export default Orders;
