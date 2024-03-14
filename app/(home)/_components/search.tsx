import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import { SearchIcon } from "lucide-react";

const Search = () => {
  return (
    <div>
      <Input />
      <Button>
        <SearchIcon />
      </Button>
    </div>
  );
};

export default Search;
