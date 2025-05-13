import Lottie from "lottie-react";
import notFoundLottie from '@/assets/lotties/not_found.json'
// import PopularProducts from "@/components/popular-products";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { PackageOpenIcon } from "lucide-react";
import { useTranslation } from 'react-i18next';

const EmptyCart = () => {
    const { t } = useTranslation();

    return <div className="pb-2">
        <Lottie animationData={notFoundLottie} loop={true} />

        <div className="text-center px-5 relative">
            <h1 className="font-semibold text-xl mb-3">{t('basket_empty_title')}</h1>
            <p className="dark:text-gray-300 text-gray-900">{t('basket_empty_desc')}</p>
            <Link to='/'>
                <Button className="mt-4 w-full"> <PackageOpenIcon className="w-4 h-4" /> {t('basket_products')}</Button>
            </Link>
        </div>

        {/* <div className="mt-5">
            <PopularProducts />
        </div> */}
    </div>
}

export default EmptyCart