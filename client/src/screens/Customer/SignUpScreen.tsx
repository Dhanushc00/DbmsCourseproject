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
import Axios from '../../axios';
import swal from 'sweetalert';
import {addID,ADD_ID} from '../../store/Cust'
import {useDispatch} from 'react-redux';
interface Values {
  Name: string;
  PhNo: string;
  AddressLine1:string,
  Landmark:string,
}

const App = () => {
  let InitialValues: Values = {
    Name: "",
    PhNo: "",
    AddressLine1:"",
    Landmark:"",
  };
  const history=useHistory();
  const dispatch =useDispatch();
  const toast = useToast();
  return (
    <Box
      d="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      h="100vh"
    >
      {/* <img width="120" height="120" src="data:image/png;base64,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" /> */}
      <Text fontSize="2xl" fontWeight={600}>
        SIGN UP
      </Text>
      <Formik
        initialValues={InitialValues}
        onSubmit={(
          values: Values,
          { setSubmitting }: FormikHelpers<Values>
        ) => {
          Axios.post("/signUP", {
            ...values
          })
            .then((res: any) => {
              console.log(res.data);
              dispatch({type:ADD_ID,id:res.data.id})
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
              setTimeout(()=>history.push('/otp',res.data.id),1000)
            })
            .catch((err: any) => {
              if (err.response) {
                console.log("SignIn Post fetch failure");
                swal("Error", String(err), "error");
                console.log(err);
              } else {
                swal("Error", "not connected to internet", "error");
                console.log("not connected to internet");
              }
            })
            .finally(() => console.log("stop loading"));
         
        }}
        validationSchema={Yup.object().shape({
          Name: Yup.string().required("Enter Name").required(),
          PhNo: Yup.string().phone("IN", true).required(),
          AddressLine1: Yup.string().required(),
          Landmark: Yup.string(),
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
                isInvalid={Boolean(errors.Landmark) && Boolean(touched.Landmark)}
              >
                <FormLabel></FormLabel>
                <Input
                  type="string"
                  id="Landmark"
                  value={values.Landmark}
                  placeholder="Landmark (Not Required)"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  aria-describedby="email-helper-text"
                />
                <FormErrorMessage>{errors.Landmark}</FormErrorMessage>
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
                bg="#CB202D"
                color="#fff"
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
