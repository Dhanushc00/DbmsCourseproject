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
interface Values {
  Name: string;
  PhNo: string;
  AddressLine1:string,
  AddressLine2:string,
}

const App = () => {
  let InitialValues: Values = {
    Name: "",
    PhNo: "",
    AddressLine1:"",
    AddressLine2:"",
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
      <Text fontSize="2xl" fontWeight={600}>
        Signup
      </Text>
      <Formik
        initialValues={InitialValues}
        onSubmit={(
          values: Values,
          { setSubmitting }: FormikHelpers<Values>
        ) => {
          setTimeout(() => {
            toast({
              title: "Account created.",
              description: "We've created your account for you. Enter OTP to complete verification",
              status: "success",
              duration: 9000,
              isClosable: true,
            })
            //alert(JSON.stringify(values, null, 2));
            setSubmitting(false);
          }, 10);
          setTimeout(()=>history.push('/otp'),1000)
        }}
        validationSchema={Yup.object().shape({
          Name: Yup.string().required("Enter Name").required(),
          PhNo: Yup.string().phone("IN", true).required(),
          AddressLine1: Yup.string().required(),
          AddressLine2: Yup.string().required(),
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
                isInvalid={Boolean(errors.Name) && Boolean(touched.Name)}
              >
                <FormLabel>Name</FormLabel>
                <Input
                  type="string"
                  id="Name"
                  value={values.Name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  w={300}
                  aria-describedby="email-helper-text"
                />
                <FormErrorMessage>{errors.Name}</FormErrorMessage>
                <FormHelperText id="email-helper-text">
                  Enter Your full name
                </FormHelperText>
              </FormControl>
              <FormControl
                isInvalid={Boolean(errors.PhNo) && Boolean(touched.PhNo)}
              >
                <FormLabel>Phone No</FormLabel>
                <Input
                  type="string"
                  id="PhNo"
                  value={values.PhNo}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  aria-describedby="email-helper-text"
                />
                <FormErrorMessage>{errors.PhNo}</FormErrorMessage>
                <FormHelperText id="email-helper-text">
                  Enter Your Phone Number
                </FormHelperText>
              </FormControl>
              <FormControl
                isInvalid={Boolean(errors.AddressLine1) && Boolean(touched.AddressLine1)}
              >
                <FormLabel>Address:</FormLabel>
                <Input
                  type="string"
                  id="AddressLine1"
                  value={values.AddressLine1}
                  onChange={handleChange}
                  placeholder="Address Line 1"
                  onBlur={handleBlur}
                  aria-describedby="emai"
                />
                <FormErrorMessage>{errors.AddressLine1}</FormErrorMessage>
              </FormControl>
              <FormControl
                isInvalid={Boolean(errors.AddressLine2) && Boolean(touched.AddressLine2)}
              >
                <FormLabel></FormLabel>
                <Input
                  type="string"
                  id="AddressLine2"
                  value={values.AddressLine2}
                  placeholder="Address Line 2"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  aria-describedby="email-helper-text"
                />
                <FormErrorMessage>{errors.AddressLine2}</FormErrorMessage>
                <FormHelperText id="email-helper-text">
                  Enter Your Address
                </FormHelperText>
              </FormControl>
              <Button
                mt={4}
                w={300}
                variantColor="teal"
                isLoading={isSubmitting}
                style={{ alignSelf: "center" }}
                type="submit"
              >
                Submit
              </Button>
            </form>
          );
        }}
      </Formik>
      <Text d="flex" mt={5}>
        Already have account{" "}
        <Lp d="flex" color="#0645AD" href="/signinc">
          Click to here Sign In
        </Lp>
      </Text>
    </Box>
  );
};
export default App;
