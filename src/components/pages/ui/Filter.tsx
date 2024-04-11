import { Input, Text, useMediaQuery } from "@chakra-ui/react";
export interface FilterProp {
  type: string;
  placeholder: string;
  onChange: (value: string) => void;
  mobile?: boolean;
  defaultValue?: string;
}
const Filter = ({
  type = "text",
  placeholder = "",
  onChange,
  defaultValue,
}: FilterProp) => {
  const [isLessThan400] = useMediaQuery("(max-width: 400px)");

  return (
    <>
      {isLessThan400 && type !== "text" && <Text>{placeholder}</Text>}
      <Input
        // border={"none"}
        backgroundColor={"white"}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        size='lg'
        defaultValue={defaultValue}
        my={2}
        type={type}
      />
    </>
  );
};

export default Filter;
