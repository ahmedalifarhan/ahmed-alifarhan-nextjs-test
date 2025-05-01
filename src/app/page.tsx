"use client";
import "../styles/globals.css";
import PageTitle from "@/components/ui/PageTitle";
import Breadcrumb from "@/components/ui/Breadcrumb";
import BestSellingDropdown from "@/components/ui/BestSellingDropdown";
import ViewStyleSwitcher from "@/components/ui/ViewStyleSwitcher";
import ProductCard from "@/components/ProductCard";
import useProducts from "@/hooks/useProducts";
import { useState } from "react";
import PaginationSlider from "@/components/PaginationSlider";
import Footer from "@/components/Footer";

type ViewType = 3 | 4 | 5;

export default function Home() {
  const { products, loading } = useProducts();
  const [view, setView] = useState<ViewType>(3);

  return (
    <>
      <PageTitle title="Fashion" />
      <Breadcrumb current="Fashion" />

      <div className="w-full max-w-[1200px] mx-auto px-4 mt-[100px] flex flex-wrap justify-between items-start relative">
        <div className="w-full lg:w-9/12">
          <BestSellingDropdown>
            {loading ? (
              <p className="text-center mt-4">Loading...</p>
            ) : (
              <div
                className="grid gap-6 mt-6"
                style={{
                  gridTemplateColumns: `repeat(${view}, minmax(0, 1fr))`,
                }}
              >
                {products.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
            <PaginationSlider />
            <Footer />
          </BestSellingDropdown>
        </div>

        {/* View Style Switcher positioned correctly on larger screens */}
        <div className="absolute top-[-50px] right-0 lg:relative lg:top-0 lg:right-0 lg:block">
          <ViewStyleSwitcher activeView={view} onChange={setView} />
        </div>
      </div>
    </>
  );
}
