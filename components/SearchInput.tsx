import { XMarkIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/router";
import React, { FC, useState } from "react";

type Props = {
  closeSearch: () => void;
};

const SearchInput: FC<Props> = ({ closeSearch }) => {
  const router = useRouter();
  const [search, setSearch] = useState<string>("");
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (search) {
      router.push(`/search/${search}`);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto flex w-full max-w-2xl items-center justify-center gap-2"
    >
      <input
        placeholder={"Search..."}
        className={`w-full flex-1 border border-transparent border-b-white bg-transparent py-1.5 text-white ring-0 transition-colors hover:border-b-win-primary focus:border-white focus:outline-none focus:ring-0 sm:text-sm sm:leading-6`}
        type="text"
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
        }}
      />
      <button
        type="button"
        className="rounded-full p-1 transition-colors hover:bg-slate-200/30 "
        onClick={(e) => {
          e.preventDefault();
          closeSearch();
        }}
      >
        <span className="sr-only">Close search</span>
        <XMarkIcon className="h-5 w-5 text-white" aria-hidden="true" />
      </button>
    </form>
  );
};

export default SearchInput;
