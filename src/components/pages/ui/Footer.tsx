import { Box, Button, Divider, Flex, Input, Text } from "@chakra-ui/react";

const Footer = () => {
  return (
    <Box
      backgroundColor={"brand.bg"}
      minH={"30vh"}
      as='footer'
      display={"flex"}
      gap={10}
      paddingY={[5, 10]}
      paddingX={[5, 10]}
      flexDirection={"column"}
      justifyContent={"center"}
      alignItems={"center"}
    >
      <Text
        fontWeight={"bolder"}
        textAlign={"center"}
        fontSize={[18, 25, 35]}
        letterSpacing={5}
        color={"white"}
      >
        Subscribe to our Newsletter
      </Text>
      <Flex gap={2} justifyContent={"space-between"} alignItems={"center"}>
        <Input
          backgroundColor={"white"}
          onChange={(e) => console.log(e)}
          type='email'
          placeholder='Enter Your Email Address...'
        />
        <Button
          padding={6}
          size={"lg"}
          color={"white"}
          backgroundColor={"brand.button"}
        >
          Subscribe
        </Button>
      </Flex>
      <Divider orientation={"horizontal"} width={"95%"} />
      <Text color={"white"}>
        &copy; {new Date().getFullYear()}, All rights reserved
      </Text>
    </Box>
  );
};

export default Footer;
