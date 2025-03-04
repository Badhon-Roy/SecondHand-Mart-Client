"use client"

import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { useState } from "react";
import { ICategory } from "@/types";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";

interface IFilterSidebarProps {
  categories: ICategory[]
}

const FilterSidebar = ({ categories }: IFilterSidebarProps) => {

  const [price, setPrice] = useState([0, 50000]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const handleSearchQuery = (query: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    let updatedCategories: string[] = [];

    // If the query is "price", we only want to set the last price value, not append multiple values
    if (query === 'price') {
      params.set(query, value);  // Set the latest price
    } else {
      const existingValues = params.get(query)?.split(',') || [];

      // If value is already selected, remove it, else add it
      if (existingValues.includes(value)) {
        const updatedValues = existingValues.filter((id) => id !== value);
        if (updatedValues.length > 0) {
          params.set(query, updatedValues.join(','));
        } else {
          params.delete(query);
        }
        updatedCategories = updatedValues; // Store updated categories here
      } else {
        existingValues.push(value);
        params.set(query, existingValues.join(','));
        updatedCategories = existingValues; // Store updated categories here
      }
    }

    router.push(`${pathname}?${params.toString()}`, { scroll: false });

    // Use updatedCategories here for the category update
    if (query === 'category') {
      setSelectedCategories(updatedCategories);
    }
  };

  // Handle price change
  const handlePriceChange = (val: number[]) => {
    setPrice(val);
    handleSearchQuery('price', val[1].toString()); // Only update maxPrice, set the last selected price
  };


  return (
    <div className="md:w-64 bg-white p-4 rounded-xl shadow-md">
      {/* Filter by Price */}
      <div className="mb-6">
        <div className="flex justify-between items-center gap-4 mb-4">
          <h2 className="text-[#ff8e00] md:text-2xl text-xl font-bold">Filter</h2>
          {searchParams.toString().length > 0 &&
            <Button onClick={() => router.push(`${pathname}`, { scroll: false })} className="bg-gradient-to-r from-[#ffbe0c] to-[#ff8e00] px-4 py-2 rounded-[4px] text-white font-semibold text-[18px] shadow-md transform transition-transform duration-300 hover:scale-105 hover:from-[#e9a912] hover:to-[#ff6f00] hover:shadow-lg active:scale-95 focus:outline-none cursor-pointer">
              Clear
            </Button>
          }
        </div>
        <h3 className="text-lg font-semibold mb-2">Filter By Price</h3>
        <div className="flex gap-2">
          <input
            type="number"
            placeholder="Min"
            className="w-1/2 border p-2 rounded"
          />
          <input
            type="number"
            placeholder="Max"
            className="w-1/2 border p-2 rounded"
          />
        </div>
        <Slider
          min={0}
          max={100000}
          step={5000}
          className="mt-3"
          value={price}
          onValueChange={handlePriceChange}
        />
        <p className="text-sm mt-1">${price[0]} - ${price[1]}</p>
      </div>


      {/* <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">Product Category</h3>
        {categories?.map((category: ICategory) => {
          const isChecked = searchParams.get("category")?.split(",").includes(category?._id);

          return (
            <div key={category?._id} className="flex items-center space-x-2 mb-2">
              <Checkbox
                onClick={() => handleSearchQuery("category", category?._id)}
                id={category?.name}
                checked={isChecked}
              />
              <label htmlFor={category?.name} className="cursor-pointer">
                {category?.name}
              </label>
            </div>
          );
        })}
      </div> */}


      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">Product Category</h3>

        {/* Select Dropdown for Small Screens */}
        <div className="sm:hidden">
          <select
            onChange={(e) => handleSearchQuery('category', e.target.value)}
            value={searchParams.get('category') || ''}
            className="w-full border p-2 rounded text-[#ff8e00] focus:outline-none focus:ring-2 focus:ring-[#ff8e00]"
          >
            <option value="">Select Category</option>
            {categories?.map((category: ICategory) => (
              <option key={category?._id} value={category?._id}>
                {category?.name}
              </option>
            ))}
          </select>
        </div>

        {/* Checkboxes for Larger Screens */}
        <div className="hidden sm:block">
          {categories?.map((category: ICategory) => {
            const isChecked = searchParams.get("category")?.split(",").includes(category?._id);

            return (
              <div key={category?._id} className="flex items-center space-x-2 mb-2">
                <Checkbox
                  onClick={() => handleSearchQuery("category", category?._id)}
                  id={category?.name}
                  checked={isChecked}
                />
                <label htmlFor={category?.name} className="cursor-pointer">
                  {category?.name}
                </label>
              </div>
            );
          })}
        </div>
      </div>






      {/* conditions */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">Condition</h3>

        {/* Select Dropdown for Small Screens */}
        <div className="sm:hidden">
          <select
            onChange={(e) => handleSearchQuery('condition', e.target.value)}
            value={searchParams.get('condition') || ''}
            className="w-full border p-2 rounded text-[#ff8e00] focus:outline-none focus:ring-2 focus:ring-[#ff8e00]"
          >
            <option value="">Select Condition</option>
            {['new', 'used', 'refurbished'].map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
        </div>

        {/* Checkboxes for Larger Screens */}
        <div className="hidden sm:block">
          {['new', 'used', 'refurbished'].map((status) => (
            <div key={status} className="flex items-center space-x-2 mb-2">
              <Checkbox
                onClick={() => handleSearchQuery('condition', status)}
                id={status}
              />
              <label htmlFor={status} className="cursor-pointer">
                {status}
              </label>
            </div>
          ))}
        </div>
      </div>


      {/* Availability */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">Availability</h3>

        {/* Select Dropdown for Small Screens */}
        <div className="sm:hidden">
          <select
            onChange={(e) => handleSearchQuery('status', e.target.value)}
            value={searchParams.get('status') || ''}
            className="w-full border p-2 rounded text-[#ff8e00] focus:outline-none focus:ring-2 focus:ring-[#ff8e00]"
          >
            <option value="">Select Availability</option>
            {["available", "sold"].map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
        </div>

        {/* Checkboxes for Larger Screens */}
        <div className="hidden sm:block">
          {["available", "sold"].map((status) => (
            <div key={status} className="flex items-center space-x-2 mb-2">
              <Checkbox
                onClick={() => handleSearchQuery('status', status)}
                id={status}
              />
              <label htmlFor={status} className="cursor-pointer">
                {status}
              </label>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};

export default FilterSidebar;
