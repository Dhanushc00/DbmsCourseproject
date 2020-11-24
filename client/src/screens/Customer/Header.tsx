import React from "react";
import { Box, Heading, Flex, Text, Button } from "@chakra-ui/core";
import {useHistory,Link,useRouteMatch,useLocation} from 'react-router-dom';
import {useDispatch} from 'react-redux';
import {ADD_ID} from '../../store/Cust';
// Note: This code could be better, so I'd recommend you to understand how I solved and you could write yours better :)
const Header = () => {
  const [show, setShow] = React.useState(false);
  const history=useHistory();
  const location=useLocation();
  const handleToggle = () => setShow(!show);
  let { path, url } = useRouteMatch();
  React.useEffect(()=>history.push(`${url}/menu`,location.state),[]);
  const dispatch = useDispatch();
  return (
    <Flex
      as="nav"
      align="center"
      justify="space-between"
      wrap="wrap"
      padding="1.5rem"
      bg="#CB202D"
      color="white"
    >
      <Flex align="center" mr={5}>
        <Heading as="h1" size="lg" letterSpacing={"-.1rem"}>
          Food Zone
        </Heading>
      </Flex>

      <Box display={{ base: "block", md: "none" }} onClick={handleToggle}>
        <svg
          fill="white"
          width="12px"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <title>Menu</title>
          <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
        </svg>
      </Box>

      <Box
        display={{ sm: show ? "block" : "none", md: "flex" }}
        width={{ sm: "full", md: "auto" }}
        alignItems="center"
        justifyContent="flex-end"
        flexGrow={1}
      >
        {/* <Text mt={{ base: 4, md: 0 }} mr={6} display="block">
          Menu
        </Text>
        <Text mt={{ base: 4, md: 0 }} mr={6} display="block">
          Cart
        </Text>
        <Text mt={{ base: 4, md: 0 }} mr={6} display="block">
          Orders
        </Text> */}
        <Button bg="transparent" border="1px" mr={5} onClick={()=>history.push(`${url}/menu`,location.state)}>
            Menu
        </Button>
        <Button bg="transparent" border="1px" mr={5} onClick={()=>history.push(`${url}/cart`,location.state)}>
            Cart
        </Button>
        <Button bg="transparent" border="1px" mr={5} onClick={()=>history.push(`${url}/orders`,location.state)}>
            Orders
        </Button>
        <Button bg="#2D2D2D" border="1px" mr={5} onClick={()=>{history.push('/signinc');dispatch({type:ADD_ID,id:0})}}>
            LogOut
        </Button>
      </Box>

      {/* <Box
        display={{ sm: show ? "block" : "none", md: "block" }}
        mt={{ base: 4, md: 0 }}
      >
        <Button bg="transparent" border="1px">
          Create account
        </Button>
      </Box> */}
    </Flex>
  );
};

export default Header;
