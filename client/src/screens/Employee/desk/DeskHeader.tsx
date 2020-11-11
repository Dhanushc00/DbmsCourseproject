import React from "react";
import { Box, Heading, Flex, Text, Button } from "@chakra-ui/core";
import {
  useHistory,
  Link,
  useRouteMatch,
  Switch,
  Route,
  useLocation,
} from "react-router-dom";
import MenuMod from "./MenuMod";
// Note: This code could be better, so I'd recommend you to understand how I solved and you could write yours better :)
const Header = () => {
  const location = useLocation();
  const [show, setShow] = React.useState(false);
  const history = useHistory();
  const handleToggle = () => setShow(!show);
  let { path, url } = useRouteMatch();
  return (
    <>
      <Flex
        as="nav"
        align="center"
        justify="space-between"
        wrap="wrap"
        padding="1.5rem"
        bg="#6d56d8"
        color="white"
      >
        <Flex align="center" mr={5}>
          <Heading as="h1" size="lg" letterSpacing={"-.1rem"}>
            Zomato - Desk Employee
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
          <Link to={`${url}/Assign`}>
            <Button bg="transparent" border="1px" mr={5}>
              Assign Delivery Agent
            </Button>
          </Link>
          <Link to={`${url}/MenuMod`}>
            <Button bg="transparent" border="1px" mr={5}>
              Modify Menu
            </Button>
          </Link>
          {/* <Link to={`${url}/orders`}>
        <Button bg="transparent" border="1px" mr={5}>
            Orders
        </Button>
        </Link> */}
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
    </>
  );
};

export default Header;
