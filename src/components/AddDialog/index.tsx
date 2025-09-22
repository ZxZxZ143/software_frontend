'use client'

import {Dialog, DialogContent, DialogHeader, DialogTrigger} from "@/components/ui/dialog";
import {Controller, useForm} from "react-hook-form";
import {AddDialogForm} from "@/components/AddDialog/type";
import {ADD_DIALOG_FORM_INITIAL_VALUES} from "@/components/AddDialog/config";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {addItem} from "@/api/axiosInstance/items";
import {FC, useState} from "react";

interface Props {
    fetchingFunc: () => void;
}

const AddDialog: FC<Props> = ({fetchingFunc}) => {
    const {handleSubmit, control, reset} = useForm<AddDialogForm>({
        defaultValues: ADD_DIALOG_FORM_INITIAL_VALUES
    })
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const toggle = () => setIsOpen(prev => !prev);

    const onSubmit = handleSubmit(async (values) => {
        try {
            const res = await addItem(values);

            await fetchingFunc();
        } catch (error) {
            const message = error instanceof Error ? error.message : "something went wrong";

            console.log(message);
        }
        reset();
        toggle();
    })

    return (
        <Dialog open={isOpen} onOpenChange={toggle}>
            <DialogTrigger className="border-foreground border-1 rounded-md py-2 px-4">Add item</DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    Add item
                </DialogHeader>
                <form onSubmit={onSubmit} className="flex-col flex gap-4">
                    <Controller
                        control={control}
                        render={({field}) => (
                            <Input
                                {...field}
                                placeholder="title"
                            />
                        )}
                        name="title"
                        rules={{
                            required: true
                        }}
                    />
                    <Controller
                        control={control}
                        render={({field}) => (
                            <Input
                                {...field}
                                placeholder="subtitle"
                            />
                        )}
                        name="description"
                        rules={{
                            required: true
                        }}
                    />
                    <Controller
                        control={control}
                        render={({field}) => (
                            <Input
                                {...field}
                                placeholder="1234"
                                type="number"
                            />
                        )}
                        name="price"
                        rules={{
                            required: true
                        }}
                    />
                    <Button type={"submit"} className="w-fit">Submit</Button>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default AddDialog;
