"use client";
import { Button } from "@/components/ui/button";
import { useUser } from "../context/UserContext";
import { Logo } from "./Logo";

const Header = () => {
  const { logout } = useUser();
  const handleLogout = () => {
    logout();
  };
  return (
    <div className="py-2 px-4 h-[56px] flex w-full max-w-[1280px] m-auto justify-between">
      <Logo color={"black"} />
      <Button
        variant={"outline"}
        onClick={handleLogout}
        className="cursor-pointer"
      >
        Log out
      </Button>
    </div>
  );
};
export default Header;
