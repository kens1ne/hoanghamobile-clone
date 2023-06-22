import { useState, useEffect } from 'react';
import { IProduct } from '../types/product';
interface IProps {
    products: IProduct[];
    onRemove: (id: string) => void;
}
const ProductsPage = (props: IProps) => {
    const [data, setData] = useState<IProduct[]>([]);
    useEffect(() => {
        setData(props.products);
    }, [props]);
    const removeProduct = (id: string) => {
        props.onRemove(id);
    };
    return (
        <div>
            {data.map((item) => {
                return (
                    <div key={item._id}>
                        <h3>{item.name}</h3>
                        <button onClick={() => removeProduct(item._id)}>Remove</button>
                    </div>
                );
            })}
        </div>
    );
};

export default ProductsPage;
