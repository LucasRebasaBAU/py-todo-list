import { Button } from "@/components/ui/button"
import { ListFilter, List, Circle, CheckCircle2, ChevronUp, Minus, ChevronDown } from "lucide-react"

export type FilterValue = "all" | "pending" | "completed"
export type PriorityFilterValue = "all" | "ALTA" | "MEDIA" | "BAJA"

interface FilterBarProps {
  value: FilterValue
  onChange: (value: FilterValue) => void
  priorityValue: PriorityFilterValue
  onPriorityChange: (value: PriorityFilterValue) => void
}

const filters: { label: string; value: FilterValue; icon: React.ReactNode }[] = [
  { label: "All", value: "all", icon: <List className="h-4 w-4" /> },
  { label: "Pending", value: "pending", icon: <Circle className="h-4 w-4" /> },
  { label: "Completed", value: "completed", icon: <CheckCircle2 className="h-4 w-4" /> },
]

const priorityFilters: { label: string; value: PriorityFilterValue; icon: React.ReactNode }[] = [
  { label: "All", value: "all", icon: <List className="h-4 w-4" /> },
  { label: "Alta", value: "ALTA", icon: <ChevronUp className="h-4 w-4 text-red-500" /> },
  { label: "Media", value: "MEDIA", icon: <Minus className="h-4 w-4 text-yellow-500" /> },
  { label: "Baja", value: "BAJA", icon: <ChevronDown className="h-4 w-4 text-green-500" /> },
]

export function FilterBar({ value, onChange, priorityValue, onPriorityChange }: FilterBarProps) {
  return (
    <div className="flex flex-col gap-2">
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
      <div className="flex items-center gap-2">
        <ListFilter className="h-4 w-4 text-muted-foreground" />
        {priorityFilters.map((filter) => (
          <Button
            key={filter.value}
            variant={priorityValue === filter.value ? "default" : "outline"}
            size="sm"
            onClick={() => onPriorityChange(filter.value)}
            className="gap-1.5"
          >
            {filter.icon}
            {filter.label}
          </Button>
        ))}
      </div>
    </div>
  )
}
