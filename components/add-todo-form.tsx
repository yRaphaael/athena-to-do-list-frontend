"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Plus } from "lucide-react"
import type { Todo } from "@/components/todo-dashboard"

interface AddTodoFormProps {
  onAddTodo: (todo: Omit<Todo, "id" | "createdAt">) => void
}

const priorityOptions = [
  { value: 0, label: "Urgent", color: "text-red-600" },
  { value: 1, label: "High", color: "text-blue-600" },
  { value: 2, label: "Medium", color: "text-yellow-600" },
  { value: 3, label: "Low", color: "text-green-600" },
  { value: 4, label: "None", color: "text-gray-600" },
]

export function AddTodoForm({ onAddTodo }: AddTodoFormProps) {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [priority, setPriority] = useState<0 | 1 | 2 | 3 | 4>(4)
  const [isExpanded, setIsExpanded] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (title.trim()) {
      onAddTodo({
        title: title.trim(),
        description: description.trim(),
        priority,
        completed: false,
      })
      setTitle("")
      setDescription("")
      setPriority(4)
      setIsExpanded(false)
    }
  }

  if (!isExpanded) {
    return (
      <Card>
        <CardContent className="pt-6">
          <Button onClick={() => setIsExpanded(true)} className="w-full" variant="outline">
            <Plus className="mr-2 h-4 w-4" />
            Add New Task
          </Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Add New Task</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Input placeholder="Task title" value={title} onChange={(e) => setTitle(e.target.value)} required />
          </div>

          <div>
            <Textarea
              placeholder="Task description (optional)"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
            />
          </div>

          <div>
            <Select
              value={priority.toString()}
              onValueChange={(value) => setPriority(Number.parseInt(value) as 0 | 1 | 2 | 3 | 4)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select priority" />
              </SelectTrigger>
              <SelectContent>
                {priorityOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value.toString()}>
                    <span className={option.color}>{option.label}</span>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex space-x-2">
            <Button type="submit" className="flex-1">
              <Plus className="mr-2 h-4 w-4" />
              Add Task
            </Button>
            <Button type="button" variant="outline" onClick={() => setIsExpanded(false)}>
              Cancel
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
