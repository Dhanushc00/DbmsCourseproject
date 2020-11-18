import * as React from "react";
import { Formik, FormikHelpers, FormikProps } from "formik";
import * as Yup from "yup";
import {
  Box,
  Input,
  Text,
  Button,
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  useToast
} from "@chakra-ui/core";
import "yup-phone";
import {v4 as uuidv4} from 'uuid';
import { useHistory,useLocation } from "react-router-dom";
import OtpLogo from '../../assets/otp.svg';
import { Dispatch } from "redux"
import { useDispatch } from "react-redux"

interface Values {
  OTP: string;
}
interface LocationState {
  from: {
    pathname: string;
  };
  state: {CustID:number;};
}
const App:React.FC = () => {
    const location=useLocation<LocationState>();
    const [OTP2,setOTP2]=React.useState<String>(uuidv4().substr(0,6));
    const toast = useToast();
    const history=useHistory();
    const dispatch: Dispatch<any> = useDispatch();
    React.useEffect(() => {
        setTimeout(() => {
            console.log(OTP2);
            alert(JSON.stringify("OTP is: "+OTP2, null, 2));
        }, 100);
    }, []);
  let InitialValues: Values = {
    OTP: "",
  };
  return (
    <Box d="flex" flexDirection="column" justifyContent="center" alignItems="center" h="100vh">
       <img src={OtpLogo} width={250} height={250}/>
      <Box mt={10}></Box>
      <Formik
        initialValues={InitialValues}
        onSubmit={(
          values: Values,
          { setSubmitting }: FormikHelpers<Values>
        ) => {
          setTimeout(() => {
            toast({
                title: "Verification Success !!",
                //description: "We've created your account for you. Enter OTP to complete verification",
                status: "success",
                duration: 9000,
                isClosable: true,
              })
            //alert(JSON.stringify(values, null, 2));
            // const id:number=location.state.CustID;
            // addID({id});
            history.push('./CustApp',location.state);
            setSubmitting(false);
          }, 100);
        }}
        validationSchema={Yup.object().shape({
          OTP: Yup.string().min(6).max(6).test('match', 
          'OTP do not match', 
           (otp1)=> { 
               console.log(otp1+"==="+OTP2)
             return otp1 === OTP2; 
           }).required("Enter OTP"),
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
                isInvalid={Boolean(errors.OTP) && Boolean(touched.OTP)}
              >
                <FormLabel>OTP</FormLabel>
                <Input
                  type="string"
                  id="OTP"
                  value={values.OTP}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  w={300}
                  aria-describedby="email-helper-text"
                />
                <FormErrorMessage>{errors.OTP}</FormErrorMessage>
                <FormHelperText id="email-helper-text">
                  Enter full OTP
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
