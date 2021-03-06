import { Button } from "@chakra-ui/button";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { Input } from "@chakra-ui/input";
import { Box, Heading } from "@chakra-ui/layout";
import { NumberInput, NumberInputField, Select } from "@chakra-ui/react";
import { AxiosResponse } from "axios";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import axios from "../utils/axios";
import DatePicker from "react-datepicker"
import { useState } from "react";
import formatDate from "../utils/formatDate";
import { errorToast } from "../utils/errorToast";
import { useStoreActions } from "easy-peasy";

interface SignUpFormProps {
  name: string;
  emailId: string;
  password: string;
  address: string;
  designation: string;
  salary: number;
}
export const SignUp: React.FC = () => {
  const loginEmployee:any = useStoreActions((actions:any)=>actions.loginEmployee);
  const { handleSubmit, register } = useForm<SignUpFormProps>();
  const navigate = useNavigate();
  const [dob,setDob] = useState(new Date());

  async function onSubmit(formdata: any) {
    try {
      const { data }: AxiosResponse = await axios.post("/signup?designation=postgres", 
        {
          ...formdata,
          "dob":formatDate(dob),
          "joindate":formatDate(new Date())
        });
      if (data.message === "success") {
        loginEmployee(data);
        navigate(`/${data.designation}`);
      }
    } catch (err) {
      console.log(err);
      errorToast("Please fill fields correctly")
    }
  }

  return (
    <Box mx="auto" my="auto" w="50rem" h="50rem" p="5rem">
      <Heading textAlign="center">Sign Up</Heading>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl id="email-id" isRequired>
          <FormLabel>Name</FormLabel>
          <Input {...register("name")} placeholder="Name" />
        </FormControl>
        <FormControl id="email-id" isRequired>
          <FormLabel>Email ID</FormLabel>
          <Input {...register("emailId")} placeholder="Email Id" />
        </FormControl>
        <FormControl id="" isRequired>
          <FormLabel>Password</FormLabel>
          <Input {...register("password")} placeholder="Password" />
        </FormControl>
        <FormControl id="Address" isRequired>
          <FormLabel>Address</FormLabel>
          <Input {...register("address")} placeholder="Address" />
        </FormControl>
        <FormControl id="designation" isRequired>
          <FormLabel>Designation</FormLabel>
          <Select placeholder="Select option" {...register("designation")}>
            <option value="projectmanager">project manager</option>
            <option value="designer">designer</option>
            <option value="companymanager">company manager</option>
            <option value="accountant">accountant</option>
          </Select>
        </FormControl>
        <FormControl id="salary" isRequired>
          <FormLabel>Salary</FormLabel>
          <NumberInput min={15001} defaultValue={15001}>
            <NumberInputField {...register("salary")} />
          </NumberInput>
        </FormControl>
        <FormControl id="start-date" isRequired>
            <FormLabel>DOB</FormLabel>
            <DatePicker
                selected={dob}
                maxDate={new Date()}
                onChange={(date:Date) => {
                    setDob(date);
                }}
                dateFormat="d/M/yyyy"
            />
        </FormControl>
        <Button my="5" type="submit">
          Submit
        </Button>
      </form>
    </Box>
  );
};
