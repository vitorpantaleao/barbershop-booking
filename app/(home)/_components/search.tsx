"use client";

import { Button } from "@/app/_components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/app/_components/ui/form";
import { Input } from "@/app/_components/ui/input";
import { SearchIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod"

import { z } from "zod";
import { useRouter } from "next/navigation";

const SearchSchema = z.object({
    search: z.string({
        required_error: "Campo obrigatório",
    }).trim().min(3).max(255, "Campo obrigatório"),
});

interface SearchProps {
    defaultValues?: z.infer<typeof SearchSchema>;
}

const Search = ({defaultValues}: SearchProps) => {
    const router = useRouter();

    const form = useForm<z.infer<typeof SearchSchema>>({
        resolver: zodResolver(SearchSchema),
        defaultValues,
    })

    const handleSubmit = (data: z.infer<typeof SearchSchema>) => {
        router.push(`/barbershops?search=${data.search}`)
    }

    return (
        <div className="flex items-center gap-2">
            <Form {...form}>
                <form className="flex gap-2 w-full" onSubmit={form.handleSubmit(handleSubmit)}>
                    <FormField
                        control={form.control}
                        name="search"
                        render={({field}) => (
                            <FormItem className="w-full">
                                <FormControl>
                                    <Input placeholder="Busque por uma barbearia" className="w-full" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button variant={"default"} className="ml-2" type="submit">
                        <SearchIcon size={18} />
                    </Button>
                </form>
            </Form>
        </div>
    )
}

export default Search;