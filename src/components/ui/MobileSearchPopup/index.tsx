import { MagnifyingGlass, X } from '@phosphor-icons/react';
import React from 'react';

interface IProps {
    isOpen: boolean;
    setIsOpen: (state: boolean) => void;
}

const SearchPopup = ({ isOpen, setIsOpen }: IProps): JSX.Element => {

    const handleSearch = (e: React.FormEvent<HTMLElement>): void => {
        e.preventDefault();
        setIsOpen(false);
    }

    return (
        <>
            {isOpen && (
                <div className="md:hidden fixed inset-0 bg-black bg-opacity-50 flex justify-center z-50">
                    <div className="bg-white p-8 rounded-lg w-11/12 max-w-lg h-[100px] mt-20 relative">
                        <button
                            onClick={() => { setIsOpen(false); }}
                            className="absolute top-2 right-2 text-gray-600 hover:text-gray-900"
                        >
                            <X size={20} />
                        </button>

                        <div className='relative'>
                            <form onSubmit={handleSearch}>
                                <input placeholder="Search by title..." className="w-full rounded-full border border-zinc-400 outline-none h-10 px-5" />
                                <button type="submit" className="absolute right-1 px-2 border border-zinc-400 border-r-0 border-t-0 border-b-0 h-full outline-none">
                                    <MagnifyingGlass size={20} />
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
export default SearchPopup;