import ProductCard from "./product-card"

const CartProducts = () => {
    return <div className="pb-20 pt-3">
        <h1 className="font-semibold text-2xl font-baloo text-tp-main mb-4">🛒 Savatcha</h1>
       <div className="flex flex-col gap-2">
        {Array.from({length: 10}).map((_, index) => <ProductCard key={index} />)}
       </div>
    </div>
}

export default CartProducts