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
import Axios from '../../../axios';
import {rootReducerType} from '../../../store/store';
import {useSelector} from 'react-redux';
const AssignAgent:React.FC = () => {
  const location = useLocation();
  // interface ParamTypes {
  //     id: string
  //   }
  //  let id = location.state;
  let history =useHistory();
  // const id: number = useSelector(
  //   (state:rootReducerType) => {console.log(state.DelD.id); return Number(state.DelID.id);},
  // )
  console.log(location.state);
  interface Idata{
    Empid:number,
    EmpName:string,
    PhoneNo:string,
  }
  interface IRec {
    EmpID: number,
    EmpName: string,
    Phone: string,
  }
  interface IDataRec {
    data: IRec[],
  }
  const [data, setData] = React.useState<Idata[]>([]);
  React.useEffect(()=>{
    Axios.get("/deskApp/AssignAgent",{
      
    })
      .then((res: IDataRec) => {
        console.log(res.data);
        let tp = res.data.map((q: IRec) => ({
            Empid:q.EmpID,
            EmpName:q.EmpName,
            PhoneNo:q.Phone
        }));
        setData(tp);
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
  },[])
  const AssignAgentPost=(id1:number)=>{
    Axios.post("/deskApp/AssignAgent",{
      EmpID:id1,OrderID:location.state
    })
      .then((res: any) => {
        console.log(res.data);
        setTimeout(()=>history.goBack(),2000);
        swal("Job Assigned", "", "success");
        // let tp = res.data.map((q: IRec) => ({
        //     Empid:q.EmpID,
        //     EmpName:q.EmpName,
        //     PhoneNo:q.Phone
        // }));
        // setData(tp);
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
            <Box>Emp PhoneNo</Box>
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
                  <Box>{q.PhoneNo}</Box>
                  <Button bg="#2ECC71" textColor="#fff" onClick={()=>{AssignAgentPost(q.Empid);}}>
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
