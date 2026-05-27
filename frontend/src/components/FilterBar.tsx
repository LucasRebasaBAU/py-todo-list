import { Button } from "@/components/ui/button"
import { ListFilter, List, Circle, CheckCircle2 } from "lucide-react"

export type FilterValue = "all" | "pending" | "completed"

interface FilterBarProps {
  value: FilterValue
  onChange: (value: FilterValue) => void
}

const filters: { label: string; value: FilterValue; icon: React.ReactNode }[] = [
  { label: "All", value: "all", icon: <List className="h-4 w-4" /> },
  { label: "Pending", value: "pending", icon: <Circle className="h-4 w-4" /> },
  { label: "Completed", value: "completed", icon: <CheckCircle2 className="h-4 w-4" /> },
]

export function FilterBar({ value, onChange }: FilterBarProps) {
  return (
    <div className="flex items-center gap-2">
      <ListFilter className="h-4 w-4 text-muted-foreground" />
      {filters.map((filter) => (
        <Button
          key={filter.value}
          variant={value === filter.value ? "default" : "outline"}
          size="sm"
          onClick={() => onChange(filter.value)}
          className="gap-1.5"
        >
          {filter.icon}
          {filter.label}
        </Button>
      ))}
    </div>
  )
}
