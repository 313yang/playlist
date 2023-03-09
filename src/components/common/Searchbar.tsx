import { useRouter } from "next/router";
import { useState } from "react";
import { toast } from "react-hot-toast";

export default function Searchbar() {
  const router = useRouter();
  const [keyword, setKeyword] = useState("");
  const handleOnSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (keyword.length < 2) return toast.error("Please enter at least 2 characters.");
    router.push(`/search/${keyword}`);
  };
  return (
    <form onSubmit={handleOnSubmit}>
      <input placeholder="search..." onChange={(e) => setKeyword(e.target.value)} value={keyword} />
    </form>
  );
}
