'use client'

import Card from "@/components/Card";
import Heading from "@/components/Heading";
import {getItems} from "@/api/axiosInstance/items";
import {useEffect, useState} from "react";
import {ICard} from "@/types/cardTypes";
import AddDialog from "@/components/AddDialog";

export default function Home() {
    const [items, setItems] = useState<ICard[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const fetchItems = async () => {
        setLoading(true);

        try {
            const items = await getItems();
            setItems(items);
        } catch (error) {
            if (error instanceof Error) {
                setError(error.message);
            } else {
                setError("Something went wrong");
            }
        }

        setLoading(false);
    }

    useEffect(() => {
        fetchItems().then(() => {});
    }, [])

    const renderItems = () => {
        if (loading) {
            return <div
                className="w-12 h-12 mx-auto mt-[300px] rounded-full border-2 border-t-transparent border-foreground animate-spin"/>
        } else if (error) {
            return (
                <p>{error}</p>
            )
        } else {
            return (
                <div className="grid grid-cols-3 gap-8 w-full mx-auto my-10">
                    {
                        items.map((item) => (
                            <Card key={item.id} title={item.title} description={item.description} price={item.price}/>
                        ))
                    }
                </div>
            )
        }
    }

    return (
        <div className="max-w-[1440px] w-full px-10 mx-auto">
            <Heading className="block w-fit mx-auto mt-8">Electronic shop items</Heading>
            <AddDialog fetchingFunc={fetchItems} />
            {
                renderItems()
            }
        </div>
    )
        ;
}
