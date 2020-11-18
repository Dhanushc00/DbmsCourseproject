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
import { useLocation, Link, match,useHistory } from "react-router-dom";
import CartLogo from "../../../assets/cart2.svg";
import { Divider } from "@material-ui/core";
import { useParams } from "react-router";
import swal from 'sweetalert';

const AssignAgent:React.FC = () => {
  const location = useLocation();
  // interface ParamTypes {
  //     id: string
  //   }
  //  let id = location.state;
  let history =useHistory();
  console.log(location.state);
  const [data, setData] = React.useState([
    { Empid: "301", EmpName: "JOHN" },
    { Empid: "302", EmpName: "JOHN" },
    { Empid: "303", EmpName: "JOHN" },
  ]);
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
        justifyContent="center"
        alignItems="center"
        flexDirection="column"
      >
        <Text fontFamily="monospace" fontSize="2xl" fontWeight={600} pb={8}>
          Assign Delivery Agent to Order id {location.state}
        </Text>
        <Box
          borderWidth={4}
          borderColor="#6d56d8"
          w="50%"
          d="flex"
          flexDirection="column"
          p={5}
        >
          <Box
            d="flex"
            flexDirection="row"
            justifyContent="space-between"
            pb={5}
          >
            <Box>EmpId</Box>
            <Box>EmpName</Box>
            <Box>Assign</Box>
          </Box>
          <Divider />
          <Box d="flex" flexDirection="column" pb={5}>
            {Object.values(data).map((q) => {
              return (
                <Box
                  d="flex"
                  justifyContent="space-between"
                  flexDirection="row"
                  pt={5}
                >
                  <Box>{q.Empid}</Box>
                  <Box>{q.EmpName}</Box>
                  <Button bg="#2ECC71" textColor="#fff" onClick={()=>{setTimeout(()=>history.goBack(),2000);swal("Job Assigned", "", "success");}}>
                    Assign
                  </Button>
                </Box>
              );
            })}
          </Box>
        </Box>
      </Box>
    </>
  );
};
export default AssignAgent;
