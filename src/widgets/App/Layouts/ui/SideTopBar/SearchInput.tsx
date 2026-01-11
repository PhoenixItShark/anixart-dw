import { Search } from "lucide-react";

const SearchInput = () => {
  return (
    <div className='relative flex w-full  h-full min-w-75 group'>
      <div className='absolute inset-y-0 left-[0.5%] flex items-center pr-4 pointer-events-none'>
        <Search className="text-text-primary group-hover:text-text-secondary transition" />
      </div>
      <input
        type='text'
        placeholder='Search...'
        className='group-hover:placeholder:text-red pl-8 p-1 bg-color-primary border-2 border-text-primary w-full rounded-md text-secondary focus-visible:outline-none transition duration-150 group-hover:border-text-secondary'
      ></input>
    </div>
  );
};

export default SearchInput;
