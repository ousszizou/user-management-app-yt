import {
  Box,
  Button,
  Flex,
  FormLabel,
  Input,
  Stack,
  Text,
} from "@chakra-ui/react";

import { useAuth } from "@lib/contexts/auth";

const Profile = () => {
  const { user } = useAuth();

  console.log("user ", user);
  return (
    <Flex
      direction={"column"}
      alignItems={"center"}
      py={8}
      px={{ base: 6, md: 20, lg: 60 }}
      bg="gray.900"
      h="100vh"
      color="white"
    >
      <Box maxW="2xl">
        <Box p={6} w="full">
          <FormLabel fontSize={"2xl"} fontWeight={900} htmlFor="email">
            Email Address
          </FormLabel>
          <Text mb={2}>
            To make sure you have access to this email address, we will send An
            email to this account with a confirmation link.
          </Text>
          <Flex align={"center"} justify="space-between">
            <Input
              p={4}
              borderRadius={10}
              bg={"whiteAlpha.50"}
              border={0}
              _focus={{
                bg: "whiteAlpha.100",
              }}
              _disabled={{
                bg: "whiteAlpha.50",
              }}
              autoComplete="off"
              type="email"
              id="email"
              name="email"
              size="lg"
              // onChange={}
              // value={}
            />
            <Stack direction={"row"} spacing={2}>
              <Button
                // onClick={}
                ms={2}
                borderRadius={10}
                colorScheme={"orange"}
                _focus={{
                  outline: "none",
                }}
                _focusWithin={{
                  outline: "none",
                }}
              >
                save
              </Button>
              <Button
                // onClick={}
                borderRadius={10}
                bg="white"
                color="gray.800"
                _hover={{
                  background: "gray.200",
                }}
                _focus={{
                  outline: "none",
                }}
                _focusWithin={{
                  outline: "none",
                }}
              >
                Cancel
              </Button>
            </Stack>
          </Flex>
        </Box>
        <Box p={6}>
          <Button colorScheme="red" mb="16">
            Logout
          </Button>
        </Box>
      </Box>
    </Flex>
  );
};

export default Profile;
