import { Alert, Center } from "@chakra-ui/react";

const NoDataFound = ({
  text = "No data found ",
  colorScheme,
}: {
  text?: string;
  colorScheme?: string;
}) => {
  return (
    <Center my={5}>
      <Alert
        boxShadow='dark-lg'
        rounded={5}
        display={"inline"}
        colorScheme={colorScheme}
        w={"90%"}
        fontWeight={"bold"}
        margin={"auto"}
        textAlign={"center"}
      >
        {text} 🔍
      </Alert>
    </Center>
  );
};

export default NoDataFound;
