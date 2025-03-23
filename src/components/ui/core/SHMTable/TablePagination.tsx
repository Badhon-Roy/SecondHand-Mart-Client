import { ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "../../button";
import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";

const TablePagination = ({ totalPage }: { totalPage: number }) => {
    const [currentPage, setCurrentPage] = useState(1)
    const router = useRouter();
    const pathname = usePathname();
    const handlePrev = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1)
            router.push(`${pathname}?page=${currentPage - 1}`)
        }
    }
    const handleNext = () => {
        if (totalPage > currentPage) {
            setCurrentPage(currentPage + 1)
            router.push(`${pathname}?page=${currentPage + 1}`)
        }
    }
    return (
        <div className="flex items-center gap-2 my-8 justify-center">
            <Button
                disabled={currentPage === 1}
                onClick={handlePrev}
                className="cursor-pointer">
                <ArrowLeft />
            </Button>
            {
                [...Array(totalPage)].map((_, index) => (
                    <Button key={index}
                        className="cursor-pointer"
                        onClick={() => {
                            setCurrentPage(index + 1)
                            router.push(`${pathname}?page=${index + 1}`)
                        }}
                        variant={currentPage === index + 1 ? "default" : 'outline'}>
                        {index + 1}
                    </Button>
                ))
            }
            <Button
                onClick={handleNext}
                disabled={currentPage === totalPage}
                className="cursor-pointer">
                <ArrowRight />
            </Button>
        </div>
    );
};

export default TablePagination;