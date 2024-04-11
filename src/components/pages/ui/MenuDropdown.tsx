import { Menu, MenuButton, Button, MenuList, MenuItem } from "@chakra-ui/react";
import { ChevronDownIcon, ChevronUpIcon } from "@chakra-ui/icons";
import { IoLocationOutline } from "react-icons/io5";

const MenuDropdown = () => {
  return (
    <Menu>
      {({ isOpen }) => (
        <>
          <MenuButton
            backgroundColor={"transparent"}
            isActive={isOpen}
            as={Button}
            rightIcon={
              isOpen ? (
                <ChevronUpIcon boxSize={7} />
              ) : (
                <ChevronDownIcon boxSize={7} />
              )
            }
          >
            <IoLocationOutline size={25} />
          </MenuButton>
          <MenuList>
            <MenuItem>Download</MenuItem>
            <MenuItem onClick={() => alert("Kagebunshin")}>
              Create a Copy
            </MenuItem>
          </MenuList>
        </>
      )}
    </Menu>
  );
};

export default MenuDropdown;
