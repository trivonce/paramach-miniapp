import AddButton from "@/components/add-button"

const ProductCard = () => {
    return <div className="dark:bg-gray-900 bg-white rounded-xl flex gap-4 overflow-hidden">
        <img className="w-[120px]" src="https://placehold.co/600x400" />

        <div>
            <h1>Product name</h1>
            <AddButton />
        </div>
    </div>
}

export default ProductCard