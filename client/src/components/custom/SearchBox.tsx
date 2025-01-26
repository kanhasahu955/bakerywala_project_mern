import { FC, ReactElement } from "react";
import { Input } from "@/components/ui/input";

const SearchBox: FC<any> = (): ReactElement => {
  return (
    <form action="">
      <Input
        placeholder="Search Here..."
        className="h-9 rounded-full bg-gray-50"
      />
    </form>
  );
};

export default SearchBox;
