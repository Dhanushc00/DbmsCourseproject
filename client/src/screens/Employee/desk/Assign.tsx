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
import {
  Router,
  Route,
  Switch,
  useLocation,
  withRouter,
  useRouteMatch,
  Link,
  useHistory,
} from "react-router-dom";
import ApproveLogo from "../../../assets/approve.svg";
import Moment from "moment";
import { MdKeyboardArrowRight } from "react-icons/md";
import { mdiChevronRight } from "@mdi/js";
import AssignAgent from "./AssignAgent";
import Axios from '../../../axios';
import {rootReducerType} from '../../../store/store';
import {useSelector} from 'react-redux';
const Assign = () => {
  const location = useLocation();
  let history = useHistory();
  let { path, url } = useRouteMatch();
  React.useEffect(()=>{},[location,history]);
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
    id: number;
    timestamp: String;
    //paymentMethod: String;
    //Order: values[];
  }
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
  const [data, setData] = React.useState<Ordervalues[]>([]);
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
  const id: number = useSelector(
    (state:rootReducerType) => {console.log(state.DeskID.id); return Number(state.DeskID.id);},
  )
  interface IRec{
      OrderID: number,
      OrderTimeStamp: string
  }
  interface IData{
    data:IRec[],
  }
  React.useEffect(()=>{
    Axios.get("/deskApp", {
      params: { DeskID: id },
    })
      .then((res: IData) => {
        //console.log(res.data);
        const tp = res.data.map((q: IRec) => {
          return {
            id: q.OrderID,
            timestamp:String(Moment(q.OrderTimeStamp).format('lll'))
          };
        });
        //console.log(tp);
        setData(tp);
        //setData(tp);
      })
      .catch((err: any) => {
        if (err.response) {
          console.log("deskApp fetch failure");
          console.log(err);
        } else {
          console.log("not connected to internet");
        }
      })
      .finally(() => console.log("stop loading"));
  },[]);
  if (data.length == 0) {
    return (
      <Box
        d="flex"
        justifyContent="center"
        alignItems="center"
        h="87vh"
        w="100%"
      >
        <img width={220} height={220} src={ApproveLogo} />
      </Box>
    );
  }
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
  interface RecItems {
    ItemName: string;
    Quantity: number;
    ItemPrice: number;
    Payment_Amt: number;
    Payment_method: string;
  }
  interface IRecItems{
    data:RecItems[]
  }
  //const [order, setOrder] = React.useState("");
  const fetchOrderDetail=(id:number)=>{
    Axios.get("/myOrders/Items", {
      params: { OrderID: id },
    })
      .then((res: IRecItems) => {
        console.log(res.data);
        let tp = res.data.map((q: RecItems) => ({
          id: q.ItemName+q.ItemPrice,
          name: q.ItemName,
          qty: q.Quantity,
          price:q.ItemPrice,
        }));
        setData1(tp);
      })
      .catch((err: any) => {
        if (err.response) {
          console.log("deskApp fetch failure");
          console.log(err);
        } else {
          console.log("not connected to internet");
        }
      })
      .finally(() => console.log("stop loading"));
  }
  return (
    <>
      {paymentModal}
      <Switch location={location}>
        <Route path={`${path}/AssignAgent`} render={() => <AssignAgent />} />
      </Switch>
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
          <img width={220} height={220} src={ApproveLogo} />
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
            <Box
              bg="#505050"
              color="#fff"
              spacing={10}
              p={7}
              m={2}
              borderWidth="1px"
              flex="1"
              rounded="md"
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
                  ml={5}
                  //p={5}
                >
                  <Button
                    bg="#2ECC71"
                    borderColor="#fff"
                    borderWidth="2"
                    onClick={() => {
                      //setData1(q.Order);
                      fetchOrderDetail(q.id);
                      onOpen();
                      //setValue(String(q.paymentMethod));
                    }}
                  >
                    View Full Bill
                  </Button>
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
                  <Button
                    bg="#EEB422"
                    borderColor="#fff"
                    borderWidth="2"
                    onClick={() =>
                      history.push(`${path}/AssignAgent/:${q.id}`, q.id)
                    }
                  >
                    Assign delivery Agent
                  </Button>
                </Box>
              </Flex>
            </Box>
          ))}
        </Box>
      </Box>
    </>
  );
};

export default Assign;
