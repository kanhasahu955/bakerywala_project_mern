import { FC, ReactElement } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { IoLogIn } from "react-icons/io5";
import Logo from "@/assets/logo.jpg";
import SearchBox from "@/components/custom/SearchBox";

const Topbar: FC<any> = (): ReactElement => {
  return (
    <div className="flex justify-between items-center h-16 fixed w-full z-20 bg-white px-5 border-b">
      <div>
        logo
        {/* <img src={Logo} alt="logo" className="object-contain" /> */}
      </div>
      <div className="w-[500px]">
        <SearchBox />
      </div>
      <div>
        <Button asChild>
          <Link to="/" className="rounded-full">
            <IoLogIn />
            Sign In
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default Topbar;
