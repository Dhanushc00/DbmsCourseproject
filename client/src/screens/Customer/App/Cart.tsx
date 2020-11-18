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
} from "@chakra-ui/core";
import { useHistory, useRouteMatch } from "react-router-dom";
import CartLogo from "../../../assets/cart1.svg";
import swal from "sweetalert";
import Axios from "../../../axios";
import { rootReducerType } from "../../../store/store";
import { useSelector } from "react-redux";
export default function Cart() {
  const toast = useToast();
  const history = useHistory();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [address, setAddress] = React.useState("");
  const [change, setChange] = React.useState(false);
  const [CVV, setCVV] = React.useState("");
  const [value, setValue] = React.useState("COD");
  let { path, url } = useRouteMatch();
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
  interface ICartItems {
    ItemName: string;
    Quantity: number;
    ItemPrice: number;
    ItemID: number;
  }
  const [data, setData] = React.useState<values[]>([
    { id: "Pizza", name: "Pizza", qty: 10, price: 63 },
    {
      id: "Burger",
      name: "Burger",
      qty: 10,
      price: 34,
    },
  ]);

  let price: number = 0;
  const [pr, setPr] = React.useState(0);
  React.useEffect(() => {
    price = 0;
    // if (Object.keys(data1).length != 0) {
    Object.values(data).map((q) => (price += Number(q.qty) * Number(q.price)));
    // }
    setPr(price);
    console.log("Rupees" + price);
  }, [data]);
  const id: number = useSelector((state: rootReducerType) => {
    console.log(state.CustID);
    return Number(state.CustID.id);
  });
  React.useEffect(() => {
    Axios.get("/cart", {
      params: { CustID: id },
    })
      .then((res: any) => {
        console.log(res.data);
        let tp = Object.values(res.data).map((q: ICartItems|any|unknown) => ({
          id: q.ItemID,
          name: q.ItemName,
          qty: q.Quantity,
          price: q.ItemPrice,
        }));
        setData(tp);
      })
      .catch((err: any) => {
        if (err.response) {
          console.log("CART GET fetch failure");
          swal("Error", String(err), "error");
          console.log(err);
        } else {
          swal("Error", "not connected to internet", "error");
          console.log("not connected to internet");
        }
      })
      .finally(() => console.log("stop loading"));
      Axios.get("/address", {
        params: { CustID: id },
      })
        .then((res: any) => {
          console.log(res.data);
          setAddress(res.data[0].Address);
        })
        .catch((err: any) => {
          if (err.response) {
            console.log("Address GET fetch failure");
            swal("Error", String(err), "error");
            console.log(err);
          } else {
            swal("Error", "not connected to internet", "error");
            console.log("not connected to internet");
          }
        })
        .finally(() => console.log("stop loading"));
  }, []);
  let paymentModal = (
    <>
      {/* <Button onClick={onOpen}>Open Modal</Button> */}

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Payment Gateway</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Stack spacing={3}>
              {value != "COD" ? (
                <Text fontSize="2xl" fontFamily={"monospace"}>
                  {"CARD NO: XXXX XXXX XXXX XX76"}
                </Text>
              ) : null}
              <InputGroup size="sm">
                <Input
                  placeholder="Shipping Address"
                  value={address}
                  onChange={(e)=>setAddress(e.target.value)}
                  size="sm"
                  disabled={change}
                  noOfLines={2}
                />
                <InputRightElement width="4.5rem">
                  <Button
                    h="1.75rem"
                    w={"20rem"}
                    size="sm"
                    bg="transparent"
                    onClick={() => setChange(!change)}
                  >
                    {change ? "+change" : "-change"}
                  </Button>
                </InputRightElement>
              </InputGroup>
              {value != "COD" ? (
                <InputGroup size="sm">
                  <InputLeftAddon children="CVV" />
                  <Input
                    placeholder="CVV"
                    value={CVV}
                    type="password"
                    inputMode="numeric"
                    pattern="[0-9\s]"
                    onChange={(e) => setCVV(e.target.value)}
                    size="sm"
                    maxLength={3}
                  />
                </InputGroup>
              ) : null}
            </Stack>
          </ModalBody>

          <ModalFooter>
            <Button
              variantColor="blue"
              mr={3}
              color="#fff"
              bg={"#2D2D2D"}
              onClick={onClose}
            >
              Close
            </Button>
            <Button
              variant="ghost"
              disabled={
                (Boolean(CVV.length == 3) || Boolean(value != "COD")) &&
                !(Boolean(CVV.length == 3) && Boolean(value != "COD"))
              }
              color="#fff"
              bg={"#CB202D"}
              onClick={() => {
                Axios.post("/placeOrder", {
                  CustID: id,
                  data,
                  address,
                  price:pr,
                  meth:value
                })
                  .then((res: any) => {
                    console.log(res.data);
                    setTimeout(
                      () =>
                        toast({
                          title: "Payment Success",
                          description: "View your orders here !!",
                          status: "success",
                          duration: 9000,
                          isClosable: true,
                        }),
                      1000
                    );
                    onClose();
                    history.push(`/CustApp/orders`);
                  })
                  .catch((err: any) => {
                    if (err.response) {
                      console.log("SignIN Post fetch failure");
                      swal("Error", String(err), "error");
                      console.log(err);
                    } else {
                      swal("Error", "not connected to internet", "error");
                      console.log("not connected to internet");
                    }
                  })
                  .finally(() => console.log("stop loading"));
              }}
            >
              Pay
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );

  //price = price * 1.18;
  console.log(getWidth());
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
        {getWidth() <= 767 ? null : (
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
              Your Cart {data.length == 0 ? " is empty." : "."}
            </Text>
          </Box>
        )}
        <Divider orientation="vertical" />
        {data.length == 0 ? (
          <Box />
        ) : (
          <Box w={getWidth() < 767 ? "90%" : "35%"} border="1px" p={5}>
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
            {Object.values(data).map((q) => (
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
              Payment Method :
              <RadioGroup
                defaultValue="2"
                spacing={5}
                value={value}
                onChange={(e) => setValue(String(e))}
                isInline
              >
                <Radio
                  variantColor="green"
                  fontFamily={"monospace"}
                  value="COD"
                  m={1}
                  size="sm"
                >
                  COD
                </Radio>
                <Radio
                  variantColor="green"
                  fontFamily={"monospace"}
                  value="Card"
                  m={1}
                  size="sm"
                >
                  Card
                </Radio>
                <Radio
                  variantColor="green"
                  fontFamily={"monospace"}
                  value="UPI"
                  m={1}
                  size="sm"
                >
                  UPI
                </Radio>
              </RadioGroup>
            </Box>
            <Box
              fontFamily={"monospace"}
              d="flex"
              flexDirection="row"
              justifyContent="flex-end"
              alignItems="center"
              mt={5}
            >
              <Button color="#fff" bg={"#2D2D2D"} size="sm" onClick={onOpen}>
                Proceed to pay
              </Button>
            </Box>
          </Box>
        )}
      </Box>
    </>
  );
}
