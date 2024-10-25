const EmptyListSkeleton = (): JSX.Element => {
    const skeletonArray = Array(8).fill(0);
    return (
        <section className="mt-10 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 place-items-center">
            {skeletonArray?.map((_, index) => {
                return (
                    <div key={index} className="rounded-md shadow-lg max-w-[300px] w-full h-[530px] dark:bg-bgDark dark:shadow-none">
                        <div className="rounded-md rounded-b-none animate-pulse bg-[#F0F0F1] dark:bg-[#F0F0F1]/10 max-w-[300px] w-full h-[450px]"></div>
                        <div className="p-4 space-y-2">
                            <div className="max-w-[150px] w-full h-4 rounded-full bg-[#F0F0F1] dark:bg-[#F0F0F1]/10 animate-pulse"></div>
                            <div className="max-w-[250px] w-full h-4 rounded-full bg-[#F0F0F1] dark:bg-[#F0F0F1]/10 animate-pulse"></div>
                        </div>
                    </div>
                )
            })}
        </section>
    )
}

export default EmptyListSkeleton