import * as React from "react";
import { Formik, Field, Form, FormikHelpers, FormikProps } from "formik";
import * as Yup from "yup";
import {
  Box,
  Input,
  Flex,
  Text,
  Button,
  Link,
  InputGroup,
  InputLeftAddon,
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
} from "@chakra-ui/core";
import "yup-phone";
interface Values {
  Name: string;
  PhNo: string ;
}

const App = () => {
  let InitialValues: Values = {
    Name: "",
    PhNo: "",
  };
  return (
    <Box d="flex" flexDirection="column" justifyContent="center" alignItems="center" h="100vh">
      <Text fontSize="2xl" fontWeight={600}>Signup</Text>
      <Formik
        initialValues={InitialValues}
        onSubmit={(
          values: Values,
          { setSubmitting }: FormikHelpers<Values>
        ) => {
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
            setSubmitting(false);
          }, 500);
        }}
        validationSchema={Yup.object().shape({
          Name: Yup.string().required("Enter Name"),
          PhNo: Yup.string()
            .phone("IN", true),
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
            handleSubmit
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
              <Button
                mt={4}
                w={300}
                variantColor="teal"
                isLoading={isSubmitting}
                style={{alignSelf:"center"}}
                type="submit"
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
