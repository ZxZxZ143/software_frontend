import {FC, PropsWithChildren} from 'react';
import {clsx} from "clsx";

interface Props extends PropsWithChildren {
    className?: string;
}

const Heading:FC<Props> = ({children, className}) => {
    return (
        <h1 className={clsx("text-3xl font-bold", className)}>
            {children}
        </h1>
    );
};

export default Heading;
