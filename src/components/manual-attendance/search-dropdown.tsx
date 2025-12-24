import React, { useState, useRef, useEffect } from 'react'
import { Input } from '@/components/ui/input'
import { Check } from 'lucide-react'
import { cn } from '@/lib/utils'
import { EmployeeWithId } from '@/lib/types/employee.types'

interface SearchDropdownProps {
  items: EmployeeWithId[]
  search: string
  setSearch: React.Dispatch<React.SetStateAction<string>>
  isLoading: boolean
  onSelect?: (item: EmployeeWithId) => void
}

export function SearchDropdown({
  items,
  onSelect,
  search,
  setSearch,
  isLoading,
}: SearchDropdownProps) {
  const [open, setOpen] = useState(false)
  const [selected, setSelected] = useState<EmployeeWithId | null>(null)
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleSelect = (item: EmployeeWithId) => {
    setSelected(item)
    setSearch(item.personalInformation.fullName)
    setOpen(false)
    onSelect?.(item)
  }

  return (
    <div ref={dropdownRef} className="relative">
      <Input
        type="text"
        placeholder="Search..."
        value={search}
        onChange={(e) => {
          setSearch(e.target.value)
        }}
        onFocus={() => setOpen(true)}
        className="w-full"
      />

      {open && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-popover border border-border rounded-md shadow-lg z-50">
          {isLoading ? (
            <div className="px-4 py-2 text-muted-foreground text-center">
              Loading...
            </div>
          ) : (
            <>
              {items.length > 0 ? (
                <ul className="max-h-60 overflow-y-auto">
                  {items.map((item) => (
                    <li key={item.id}>
                      <button
                        onClick={() => handleSelect(item)}
                        className={cn(
                          'w-full px-4 py-2 text-left hover:bg-accent transition-colors flex items-center justify-between',
                          selected?.id === item.id && 'bg-accent',
                        )}
                      >
                        <div className="font-medium text-foreground">
                          {item.personalInformation.fullName}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {item.personalInformation.officeEmail}
                        </div>
                        {selected?.id === item.id && (
                          <Check className="w-4 h-4" />
                        )}
                      </button>
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="px-4 py-2 text-muted-foreground text-center">
                  No items available
                </div>
              )}
            </>
          )}
        </div>
      )}
    </div>
  )
}
