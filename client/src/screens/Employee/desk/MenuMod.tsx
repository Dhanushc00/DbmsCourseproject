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
  Input,
  Divider
} from "@chakra-ui/core";
import CartLogo from "../../../assets/cart2.svg";
import MenuLogo from '../../../assets/menumod.svg';
import MaterialTable from "material-table";
import swal from 'sweetalert';
const Menu = () => {
  interface values {
    id:number,
    name: string;
    Price: number;
    Avl:string,
  }
  type IType =
    | "string"
    | "boolean"
    | "numeric"
    | "date"
    | "datetime"
    | "time"
    | "currency";
  const string: IType = "string";
  //   const [data, setData] = React.useState<values[]>([
  //     { id: "Pizza", name: "Pizza", qty: 0, price: 63 },
  //     {
  //       id: "Burger",
  //       name: "Burger",
  //       qty: 0,
  //       price: 34,
  //     },
  //   ]);
  const [columns, setColumns] = React.useState([
    {
      title: "Name",
      field: "name",
      validate: (rowData: any) => {
        try {
          return rowData.name.length < 2 ? "Atleast 1 Character" : "";
        } catch (e: any) {
          return "";
        }
      },
      //   editComponent: (props: any) => (
      //     <input
      //       type="text"
      //       value={props.value}
      //       onChange={(e) => props.onChange(e.target.value)}
      //     />
      //   ),
      type: string,
    },
    {
      title: "Price in (₹)",
      field: "Price",
      validate: (rowData: any) => {
        try {
          return isNaN(rowData.Price) ? "Must be a number" : "";
        } catch (e: any) {
          return "";
        }
      },
      type: string,
    },
    {
      title: "Availability",
      field: "Avl",
      validate: (rowData: any) => {
        try {
          return !(rowData.Avl=='Y'||rowData.Avl=='N') ? "Must be a Y or N" : "";
        } catch (e: any) {
          return "";
        }
      },
      type: string,
    },
  ]);

  const [data, setData] = React.useState<values[] | any | undefined>([
    {id:101, name: "Pizza", Price: 63 ,Avl:'Y'},
    {id:102,name: "Burger", Price: 34 ,Avl:'N'},
  ]);
  
React.useEffect(()=>{},[]);
  //   const handleChange = (ct: String, id: String): void => {
  //     let tp = Object.values(data).map((q) =>
  //       q.id === id ? { ...q, qty: Number(ct) } : { ...q }
  //     );
  //     setData({ ...tp });
  //     console.log(tp);
  //   };

  return (
    <Box d="flex" justifyContent="center" alignItems="center">
        {/* <Box mt={100} w="40%" d="flex" justifyContent="center" alignItems="center">
        <img width={220} height={220}  src={MenuLogo} />
        </Box>
        <Divider orientation="vertical"/> */}
      <MaterialTable
        style={{width:"60%",marginTop:80,borderWidth:7,borderColor:"#6d56d8"}}
        title="Menu"
        columns={columns}
        data={data}
        options={{ 
            pageSize: 7,
            pageSizeOptions: [7, 10, 20],
          }}
        editable={{
          onRowAdd: (newData) =>
            new Promise((resolve, reject) => {
              setTimeout(() => {
                setData([...data, newData]);

                resolve();
              }, 1000);
            }),
          onRowUpdate: (newData, oldData: any) =>
            new Promise((resolve, reject) => {
              setTimeout(() => {
                const dataUpdate = [...data];
                const index = oldData.tableData.id;
                dataUpdate[index] = newData;
                setData([...dataUpdate]);
                resolve();
              }, 1000);
            }),
          onRowDelete: (oldData: any) =>
            new Promise((resolve, reject) => {
              setTimeout(() => {
                const dataDelete = [...data];
                const index = oldData.tableData.id;
                dataDelete.splice(index, 1);
                setData([...dataDelete]);
                resolve();
              }, 1000);
            }),
        }}
      />
    </Box>
  );
};
export default Menu;
