import SearchComponent from '@/components/ui/SearchComponent';
import { X } from '@phosphor-icons/react';

interface IProps {
    isOpen: boolean;
    setIsOpen: (state: boolean) => void;
}

const SearchPopup = ({ isOpen, setIsOpen }: IProps): JSX.Element => {

    return (
        <>
            {isOpen && (
                <div className="md:hidden fixed inset-0 bg-black bg-opacity-50 flex justify-center z-50">
                    <div className="bg-white dark:text-black p-8 rounded-lg w-11/12 max-w-lg h-[100px] mt-20 relative">
                        <button
                            onClick={() => { setIsOpen(false); }}
                            className="absolute top-2 right-2 text-gray-600 hover:text-gray-900"
                        >
                            <X size={20} />
                        </button>

                        <div className='relative'>
                            <SearchComponent onSearchComplete={() => { setIsOpen(false); }} />
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
export default SearchPopup;