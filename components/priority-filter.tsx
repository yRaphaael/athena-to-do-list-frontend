"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface PriorityFilterProps {
  selectedPriority: number | null
  onPriorityChange: (priority: number | null) => void
}

const priorityOptions = [
  { value: null, label: "All", color: "bg-gray-100 dark:bg-gray-800" },
  { value: 0, label: "Urgent", color: "bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-400" },
  { value: 1, label: "High", color: "bg-blue-100 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400" },
  { value: 2, label: "Medium", color: "bg-yellow-100 dark:bg-yellow-900/20 text-yellow-700 dark:text-yellow-400" },
  { value: 3, label: "Low", color: "bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-400" },
  { value: 4, label: "None", color: "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-400" },
]

export function PriorityFilter({ selectedPriority, onPriorityChange }: PriorityFilterProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Filter by Priority</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-2">
          {priorityOptions.map((option) => (
            <Button
              key={option.value}
              variant={selectedPriority === option.value ? "default" : "outline"}
              size="sm"
              onClick={() => onPriorityChange(option.value)}
              className={`${option.color} ${
                selectedPriority === option.value ? "ring-2 ring-primary" : "hover:opacity-80"
              }`}
            >
              {option.label}
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
