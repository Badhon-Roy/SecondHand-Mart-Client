import { ICategory } from "@/types";
import { Card, CardHeader } from "../card";
import Image from "next/image";
import Link from "next/link";


const CategoryCard = ({ category }: { category: ICategory }) => {
    const { name, image } = category;
    return (
        <div>
            <Link href={`/category/${name}`}>
                <Card className="p-3 bg-white shadow-lg rounded-lg transition-transform duration-300 hover:scale-105 hover:shadow-xl w-full">
                    <CardHeader className="relative p-0 h-[180px] overflow-hidden">
                        <Image
                            className="rounded-t-lg h-[180px] w-full object-cover transition-transform duration-500 ease-in-out transform hover:scale-105 hover:rounded-lg"
                            src={
                                image ||
                                "https://psediting.websites.co.in/obaju-turquoise/img/product-placeholder.png"
                            }
                            width={500}
                            height={500}
                            alt="product image"

                        />
                    </CardHeader>
                    <h2 className="text-xl font-medium text-center">{name}</h2>

                </Card>
            </Link>
        </div>
    );
};

export default CategoryCard;