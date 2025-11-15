import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Search, X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface TaxonomySearchProps {
  onSearch: (query: string) => void;
  searchQuery: string;
}

export const TaxonomySearch = ({ onSearch, searchQuery }: TaxonomySearchProps) => {
  const [localQuery, setLocalQuery] = useState(searchQuery);

  const handleSearch = (value: string) => {
    setLocalQuery(value);
    onSearch(value);
  };

  const clearSearch = () => {
    setLocalQuery("");
    onSearch("");
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-6 animate-fade-in-up">
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground pointer-events-none" />
        <Input
          type="text"
          placeholder="Search components... (e.g., 'quantum', 'consciousness', 'neural')"
          value={localQuery}
          onChange={(e) => handleSearch(e.target.value)}
          className="pl-12 pr-12 h-14 text-lg font-khand border-2 border-foreground bg-background text-foreground placeholder:text-muted-foreground focus-visible:ring-foreground focus-visible:ring-2 transition-all"
        />
        {localQuery && (
          <Button
            variant="ghost"
            size="icon"
            onClick={clearSearch}
            className="absolute right-2 top-1/2 -translate-y-1/2 hover:bg-accent"
          >
            <X className="w-5 h-5" />
          </Button>
        )}
      </div>
      {localQuery && (
        <p className="mt-3 text-sm text-muted-foreground font-khand text-center">
          Searching for: <span className="font-semibold text-foreground">{localQuery}</span>
        </p>
      )}
    </div>
  );
};
