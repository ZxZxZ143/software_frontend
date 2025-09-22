import {FC} from "react";

interface Props {
    title: string;
    description: string;
    price: number;
}

const Card:FC<Props> = ({price, description, title}) => {
    return (
        <div className="pt-3 pb-5 px-10 flex flex-col items-center justify-center gap-5 bg-card rounded-xl">
            <h2 className="text-4xl text-card-title font-extrabold">{title}</h2>
            <p className="text-xl">{description}</p>
            <p className="text-2xl font-extrabold text-price">{price} {" "} $</p>
            <button className="bg-price text-xl text-background rounded-md py-1.5 px-4">Details</button>
        </div>
    );
};

export default Card;
