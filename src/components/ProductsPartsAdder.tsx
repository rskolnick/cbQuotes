'use client';

type Parts = {
    name: string;
    cost: number;
    products: {
        id: string;
    }[];
};

export function ProductPartsTable({ ...props }) {
    const { productId, partsList } = props;

    return (
        <div>
            {partsList.map((part: Parts) => (
                <div key={part.name} className="flex gap-4">
                    {/* {part.products.includes({ id: productId }) ? (
                        <div className="flex gap-4">
                            <p>Checked</p>
                            <p>{part.name}</p>
                        </div>
                    ) : (
                        <div className="flex gap-4">
                            <p>Unchecked</p>
                            <p>{part.name}</p>
                        </div>
                    )} */}

                    {part.products.length > 0 ? (
                        <></>
                    ) : (
                        <div className="flex gap-4 text-slate-400">
                            <p>Unchecked</p>
                            <p>{part.name}</p>
                        </div>
                    )}

                    {part.products.map((product) => (
                        <div key={product.id}>
                            {product.id === productId ? (
                                <div className="flex gap-4">
                                    <p>Checked</p>
                                    <p>{part.name}</p>
                                </div>
                            ) : (
                                <div className="flex gap-4 text-slate-400">
                                    <p>Unchecked</p>
                                    <p>{part.name}</p>
                                </div>
                            )}
                        </div>
                    ))}
                    {/* <p>{part.name}</p> */}
                </div>
            ))}
        </div>
    );
}
