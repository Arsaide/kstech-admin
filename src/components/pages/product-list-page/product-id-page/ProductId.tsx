import { useContext } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import {Context} from "../../../../api/context";


const ProductId = () => {
    const { store } = useContext(Context);
    const { id } = useParams<{ id: string }>();

    const {} = useQuery({
        queryKey: ['product-id', id],
        queryFn: async () => await store.getOneProduct(id),
    });
    return <div></div>;
};

export default ProductId;
