import { Box, Select } from "@chakra-ui/react";
import { FaUser } from "react-icons/fa";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/Store";
const PeopleCounter = ({ onChange }: { onChange: (value: number) => void }) => {
  const { numberOfGuests } = useSelector((state: RootState) => state.search);
  return (
    <Box>
      <Select
        icon={<FaUser />}
        iconSize={"1.0rem"}
        size={"lg"}
        minW={"220px"}
        width={"100%"}
        defaultValue={numberOfGuests || 0}
        onChange={(e) => onChange(Number(e.target.value))}
        border={"none"}
        placeholder='How many people?'
      >
        <option value='1'>1 person</option>
        <option value='2'>2 people</option>
        <option value='3'>3 people</option>
        <option value='3'>4 people</option>
        <option value='3'>5 people</option>
        <option value='3'>6 people</option>
        <option value='3'>7 people</option>
        <option value='3'>8 people</option>
        <option value='3'>9 people</option>
        <option value='3'>10 people</option>
      </Select>
    </Box>
  );
};

export default PeopleCounter;
