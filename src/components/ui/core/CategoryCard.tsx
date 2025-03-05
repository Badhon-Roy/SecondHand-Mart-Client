import { ICategory } from "@/types";
import Image from "next/image";
import Link from "next/link";


const CategoryCard = ({ category }: { category: ICategory }) => {
    const { _id,name, image } = category;
    return (
        <div>
            <Link href={`/products?category=${_id}`}>
                <div className="md:p-3 p-1 bg-white shadow-lg rounded-lg transition-transform duration-300 hover:scale-105 hover:shadow-xl w-full">
                    <div className="relative p-0 md:h-[180px] overflow-hidden">
                        <Image
                            className="rounded-t-lg md:h-[180px] h-[120px] w-full object-cover transition-transform duration-500 ease-in-out transform hover:scale-105 hover:rounded-lg"
                            src={
                                image ||
                                "https://psediting.websites.co.in/obaju-turquoise/img/product-placeholder.png"
                            }
                            width={500}
                            height={500}
                            alt="product image"

                        />
                    </div>
                    <h2 className="md:text-xl font-medium text-center pt-3 pb-2">{name}</h2>

                </div>
            </Link>
        </div>
    );
};

export default CategoryCard;