import * as React from "react";
import { Formik, Field, Form, FormikHelpers, FormikProps } from "formik";
import * as Yup from "yup";
import {
  Box,
  Input,
  Flex,
  Text,
  Button,
  Link as Lp,
  InputGroup,
  InputLeftAddon,
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  useToast
} from "@chakra-ui/core";
import "yup-phone";
import { Router, Route, Switch, useLocation,Redirect,Link ,useHistory} from "react-router-dom";
import EmpLogo from '../../assets/emp.svg'
import DelLogo from '../../assets/delivery.svg'
import { Divider } from "@material-ui/core";
interface Values {
  EmpId: string;
  Password: string;
}

const App = () => {
  let InitialValues: Values = {
    EmpId: "",
    Password: "",
  };
  const history=useHistory();
  const toast = useToast();
  return (
    <Box
      d="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      h="100vh"
    >
      <Box d="flex" flexDirection="row">
      <img src={EmpLogo} width={100} height={100}/>
      <Box m={5}></Box>
      <Divider orientation="vertical"/>
      <Box m={5}></Box>
      <img src={DelLogo} width={130} height={130}/>
      </Box>
      <Text fontSize="2xl" fontWeight={600} mt={5}>
        Employee Login
      </Text>
      <Formik
        initialValues={InitialValues}
        onSubmit={(
          values: Values,
          { setSubmitting }: FormikHelpers<Values>
        ) => {
        //   setTimeout(() => {
        //     toast({
        //       title: "Account created.",
        //       description: "We've created your account for you. Enter OTP to complete verification",
        //       status: "success",
        //       duration: 9000,
        //       isClosable: true,
        //     })
        //     //alert(JSON.stringify(values, null, 2));
        //     setSubmitting(false);
        //   }, 10);
          setTimeout(()=>history.push('/otp'),1000)
        }}
        validationSchema={Yup.object().shape({
          EmpId: Yup.string().required("Enter EmpId"),
          Password: Yup.string().required(),
        })}
      >
        {(props: FormikProps<Values>) => {
          const {
            values,
            touched,
            errors,
            handleBlur,
            handleChange,
            isSubmitting,
            handleSubmit,
          } = props;
          return (
            <form onSubmit={handleSubmit}>
              <FormControl
                isInvalid={Boolean(errors.EmpId) && Boolean(touched.EmpId)}
              >
                <FormLabel>EmpId</FormLabel>
                <Input
                  type="string"
                  id="EmpId"
                  value={values.EmpId}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  w={300}
                  aria-describedby="email-helper-text"
                />
                <FormErrorMessage>{errors.EmpId}</FormErrorMessage>
                <FormHelperText id="email-helper-text">
                  Enter Your full EmpId
                </FormHelperText>
              </FormControl>
              <FormControl
                isInvalid={Boolean(errors.Password) && Boolean(touched.Password)}
              >
                <FormLabel>Password</FormLabel>
                <Input
                  type="password"
                  id="Password"
                  value={values.Password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  aria-describedby="email-helper-text"
                />
                <FormErrorMessage>{errors.Password}</FormErrorMessage>
                <FormHelperText id="email-helper-text">
                  Enter Your Password
                </FormHelperText>
              </FormControl>
              <Button
                mt={4}
                w={300}
                variantColor="teal"
                isLoading={isSubmitting}
                style={{ alignSelf: "center" }}
                type="submit"
                bg="#6d56d8"
                color="#fff"
              >
                Submit
              </Button>
            </form>
          );
        }}
      </Formik>
    </Box>
  );
};
export default App;
