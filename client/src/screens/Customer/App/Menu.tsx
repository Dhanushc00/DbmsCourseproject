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
  Button,
} from "@chakra-ui/core";
import CartLogo from "../../../assets/cart2.svg";
//import axios, { AxiosResponse } from "axios";
import { Divider } from "@material-ui/core";
import Axios from "../../../axios";
import { useLocation, useHistory, useRouteMatch } from "react-router-dom";
import swal from "sweetalert";
import { useSelector } from "react-redux";
import { CustIDAction, CustID, CustIDState } from "../../../store/Cust";
import { rootReducerType } from "../../../store/store";
import Lottie from "react-lottie";
import foodCarousel from "../../../assets/Food-carousel1.json";
const Menu: React.FC = (props) => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: foodCarousel,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  let history = useHistory();
  const location = useLocation();
  let { path, url } = useRouteMatch();
  //console.log(location.state);
  const id: number = useSelector((state: rootReducerType) => {
    console.log(state.CustID.id);
    return Number(state.CustID.id);
  });
  interface values {
    id: string;
    name: string;
    qty: number;
    price: number;
  }
  interface Rec {
    ItemID: string;
    ItemPrice: number;
    ItemName: string;
    Item_Status: string;
    Quantity: number;
  }
  const [data, setData] = React.useState<values[]>([]);
  let price: number;
  React.useEffect(() => {
    price = 0;
    Object.values(data).map((q) => {
      price += Number(q.qty) * Number(q.price);
    });
    setPrice(price);
  }, [data]);
  const [price1, setPrice] = React.useState<Number>(0);

  React.useEffect(() => {
    Axios.get("/menu", {
      params: { CustID: id },
    })
      .then((res: any) => {
        //console.log(res.data);
        const tp = res.data.map((q: Rec) => {
          return {
            id: String(q.ItemID),
            qty: isNaN(q.Quantity) ? 0 : Number(q.Quantity),
            price: q.ItemPrice,
            name: q.ItemName,
          };
        });
        //console.log(tp);
        setData(tp);
        //setData(tp);
      })
      .catch((err: any) => {
        if (err.response) {
          console.log("menu fetch failure");
          console.log(err);
        } else {
          console.log("not connected to internet");
        }
      })
      .finally(() => console.log("stop loading"));
  }, []);
  const handleChange = (ct: String, id: String): void => {
    let tp = Object.values(data).map((q) =>
      q.id === id ? { ...q, qty: Number(ct) } : { ...q }
    );
    setData({ ...tp });
    // console.log(tp);
  };
  const cartPostHandeler = (data: values[]) => {
    console.log("inside post handeler");
    let tp = Object.values(data).filter((q) => q.qty != 0);
    console.log(tp);
    Axios.post("/cart/upd", {
      data: tp,
      id,
    })
      .then((res: any) => {
        console.log(res.data);
        //swal("Good job!", "You clicked the button!", "success");
        history.push("/CustApp/cart", location.state);
      })
      .catch((err: any) => {
        if (err.response) {
          console.log("Cart Post fetch failure");
          console.log(err);
        } else {
          console.log("not connected to internet");
        }
      })
      .finally(() => console.log("stop loading"));
  };
  if (data.length == 0) {
    return (
      <Box
        d="flex"
        justifyContent="center"
        alignItems="center"
        h="87vh"
        w="100%"
      >
        <Lottie options={defaultOptions} height={250} width={250} />
        {/* <img width={220} height={220} src={CartLogo} /> */}
      </Box>
    );
  }
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
          {/* <img width={220} height={220} src={CartLogo} /> */}
          <Lottie options={defaultOptions} height={250} width={250} />
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
        <Box d="flex" flexDirection="column" mt={300}>
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
              //key={q.id}
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
                  ₹ {Number(q.price) * Number(q.qty)}
                </Box>
              </Flex>
            </Box>
          ))}
          <Button
            color="#fff"
            bg="#CB202D"
            disabled={price1 == 0}
            onClick={() => cartPostHandeler(data)}
          >
            Move to cart!!
          </Button>
        </Box>
      </Box>
    </>
  );
};
export default Menu;
