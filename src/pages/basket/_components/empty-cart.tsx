import Lottie from "lottie-react";
import notFoundLottie from '@/assets/lotties/not_found.json'
import PopularProducts from "@/components/popular-products";

const EmptyCart = () => {
    return <div className="pb-20">
        <Lottie animationData={notFoundLottie} loop={true} />

        <div className="text-center px-5 relative">
            <h1 className="font-semibold text-xl mb-3">Savatcha bo'sh! 😢</h1>
            <p className="dark:text-gray-300 text-gray-900">Mazali paramachlarga nima deysiz? 👀</p>
        
        </div>

        <div className="mt-5">
            <PopularProducts />
        </div>
    </div>
}

export default EmptyCart