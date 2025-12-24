"use client";

import { useState, useRef, useEffect } from "react";
import { Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { EmployeeWithId } from "@/lib/types/employee.types";

interface SearchDropdownProps {
  placeholder?: string;
  items: EmployeeWithId[];
  onSelect: (item: EmployeeWithId) => void;
  onSearch?: (value: string) => void;
  className?: string;
}

export function SearchDropdown({
  placeholder = "Search...",
  items,
  onSelect,
  onSearch,
  className,
}: SearchDropdownProps) {
  const [value, setValue] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [filteredItems, setFilteredItems] = useState<EmployeeWithId[]>([]);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Filter items based on search value
  useEffect(() => {
    if(value) setIsOpen(false)
    if (value.trim()) {
      const filtered = items.filter(
        (item) =>
          item.personalInformation.fullName
            .toLowerCase()
            .includes(value.toLowerCase()) ||
          item.personalInformation.officeEmail
            .toLowerCase()
            .includes(value.toLowerCase())
      );
      setFilteredItems(filtered);
      setIsOpen(true);
    } else {
      setFilteredItems([]);
      setIsOpen(false);
    }

    onSearch?.(value);
  }, [value, items, onSearch]);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (item: EmployeeWithId) => {
    onSelect(item);
    setValue(item.personalInformation.fullName);
    setIsOpen(false);
  };

  const handleClear = () => {
    setValue("");
    setIsOpen(false);
  };

  return (
    <div ref={dropdownRef} className={cn("relative w-full", className)}>
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
        <Input
          type="text"
          placeholder={placeholder}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className="pl-10 pr-10"
          onFocus={() => value.trim() && setIsOpen(true)}
        />
        {value && (
          <button
            onClick={handleClear}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Dropdown Menu */}
      {isOpen && filteredItems.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-popover border border-border rounded-md shadow-lg z-50 max-h-64 overflow-y-auto">
          {filteredItems.map((item, index) => (
            <button
              key={item.id}
              onClick={() => handleSelect(item)}
              className={cn(
                "w-full text-left px-4 py-3 hover:bg-muted transition-colors border-b border-border last:border-b-0",
                index === 0 && "rounded-t-md",
                index === filteredItems.length - 1 && "rounded-b-md"
              )}
            >
              <div className="font-medium text-foreground">
                {item.personalInformation.fullName}
              </div>
              <div className="text-sm text-muted-foreground">
                {item.personalInformation.officeEmail}
              </div>
            </button>
          ))}
        </div>
      )}

      {/* No results message */}
      {isOpen && value.trim() && filteredItems.length === 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-popover border border-border rounded-md shadow-lg z-50 px-4 py-3 text-center text-muted-foreground">
          No results found
        </div>
      )}
    </div>
  );
}
