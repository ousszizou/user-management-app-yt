import {
  Avatar,
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Text,
  useBoolean,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";

import { supabase } from "@lib/supabase";
import { useAuth } from "@lib/contexts/auth";
import { useToast } from "@chakra-ui/react";

const Profile = () => {
  const { user, signOut } = useAuth();
  const toast = useToast();

  const [email, setEmail] = useState<string>("");
  const [isWantUpdateEmail, setIswantUpdateEmail] = useState<boolean>(false);
  const [isUpdatingEmail, setIsUpdatingEmail] = useBoolean();
  const [uploading, setUploading] = useState<boolean>(false);
  const [avatarUrl, setAvatarUrl] = useState<string | undefined>(undefined);

  const updateEmail = async () => {
    setIsUpdatingEmail.on();
    const { error } = await supabase.auth.update({
      email,
    });
    if (error) {
      toast({
        title: "Error",
        description: error.message,
        status: "error",
        duration: 9000,
        isClosable: true,
      });
      setIsUpdatingEmail.off();
    }
    toast({
      title: "Email updated",
      description: "We are sending you an email to confirm your new email",
      status: "success",
      duration: 9000,
      isClosable: true,
    });
    setIsUpdatingEmail.off();
    setIswantUpdateEmail(false);
  };

  const [fullName, setFullName] = useState<string>("");
  const [isWantUpdateFullName, setIswantUpdateFullName] =
    useState<boolean>(false);
  const [isUpdatingFullName, setIsUpdatingFullName] = useBoolean();

  const getProfileInfo = async () => {
    if (user) {
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .single();
      if (error) {
        console.log(error);
        return;
      }
      if (data) {
        setFullName(data.full_name);
      }
    }
  };

  const updateFullName = async () => {
    setIsUpdatingFullName.on();
    const { error } = await supabase
      .from("profiles")
      .update({ full_name: fullName })
      .eq("id", user?.id);
    if (error) {
      toast({
        title: "Error",
        description: error.message,
        status: "error",
        duration: 9000,
        isClosable: true,
      });
      setIsUpdatingFullName.off();
    }
    toast({
      title: "Full name updated",
      status: "success",
      duration: 9000,
      isClosable: true,
    });
    setIsUpdatingFullName.off();
    setIswantUpdateFullName(false);
  };

  useEffect(() => {
    if (!user) return;
    setEmail(user.email!);
    getProfileInfo();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

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
        <Box p="6" display="inline-block">
          <Avatar rounded={"md"} size={"2xl"} src={avatarUrl} name={fullName} />
          <FormControl mt={2}>
            <FormLabel
              htmlFor="avatar"
              w="full"
              bg="green.500"
              rounded="md"
              textAlign="center"
              py={2}
              _hover={{ bg: "green.600", cursor: "pointer" }}
              _focus={{ outline: "none" }}
            >
              {uploading ? "Uploading ..." : "Upload"}
            </FormLabel>
            <Input
              visibility="hidden"
              position="absolute"
              type="file"
              id="avatar"
              accept="image/*"
              disabled={uploading}
            />
          </FormControl>
        </Box>
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
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
            <Stack direction={"row"} spacing={2}>
              {!isWantUpdateEmail && (
                <Button
                  onClick={(e) => setIswantUpdateEmail(true)}
                  ms={2}
                  borderRadius={10}
                  colorScheme={"blue"}
                  _focus={{
                    outline: "none",
                  }}
                  _focusWithin={{
                    outline: "none",
                  }}
                >
                  update
                </Button>
              )}
              {isWantUpdateEmail && (
                <>
                  <Button
                    onClick={updateEmail}
                    isLoading={isUpdatingEmail}
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
                    onClick={(e) => setIswantUpdateEmail(false)}
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
                </>
              )}
            </Stack>
          </Flex>
        </Box>
        <Box p={6} w="full">
          <FormLabel fontSize={"2xl"} fontWeight={900} htmlFor="fullName">
            Full Name
          </FormLabel>
          <Flex align={"center"} justify="space-between">
            <Input
              isDisabled={!isWantUpdateFullName}
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
              type="text"
              id="fullName"
              name="fullName"
              size="lg"
              onChange={(e) => setFullName(e.target.value)}
              value={fullName}
            />
            <Stack direction={"row"} spacing={2}>
              {!isWantUpdateFullName && (
                <Button
                  onClick={(e) => setIswantUpdateFullName(true)}
                  ms={2}
                  borderRadius={10}
                  colorScheme={"blue"}
                  _focus={{
                    outline: "none",
                  }}
                  _focusWithin={{
                    outline: "none",
                  }}
                >
                  update
                </Button>
              )}
              {isWantUpdateFullName && (
                <>
                  <Button
                    onClick={updateFullName}
                    isLoading={isUpdatingFullName}
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
                    onClick={(e) => setIswantUpdateFullName(false)}
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
                </>
              )}
            </Stack>
          </Flex>
        </Box>
        <Box p={6}>
          <Button colorScheme="red" mb="16" onClick={signOut}>
            Logout
          </Button>
        </Box>
      </Box>
    </Flex>
  );
};

export default Profile;
