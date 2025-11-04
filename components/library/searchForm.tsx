import { Search } from "lucide-react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

export function SearchForm({ initialQuery = '' }: { initialQuery?: string }) {
    return (
        <form className="flex items-center gap-2 w-full max-w-2xl mx-auto">
            <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                    name="q"
                    placeholder="Search books by title or author..."
                    aria-label="Search books"
                    className="pl-10 pr-4 py-2 rounded-full w-full"
                    defaultValue={initialQuery}
                />
            </div>
            <Button type="submit" className="rounded-full px-6">
                Search
            </Button>
        </form>
    );
}