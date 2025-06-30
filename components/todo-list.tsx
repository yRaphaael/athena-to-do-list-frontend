"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock } from "lucide-react"
import type { Todo } from "@/components/todo-dashboard"

interface TodoListProps {
  todos: Todo[]
  onTodoClick: (todo: Todo) => void
  onToggleComplete: (id: string) => void
}

const priorityConfig = {
  0: { label: "Urgent", color: "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400" },
  1: { label: "High", color: "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400" },
  2: { label: "Medium", color: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400" },
  3: { label: "Low", color: "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400" },
  4: { label: "None", color: "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-400" },
}

export function TodoList({ todos, onTodoClick, onToggleComplete }: TodoListProps) {
  if (todos.length === 0) {
    return (
      <Card>
        <CardContent className="py-12 text-center">
          <div className="text-muted-foreground">
            <Clock className="mx-auto h-12 w-12 mb-4" />
            <p className="text-lg font-medium">No tasks found</p>
            <p className="text-sm">Add a new task to get started!</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-3">
      {todos.map((todo) => (
        <Card
          key={todo.id}
          className={`cursor-pointer transition-all hover:shadow-md ${todo.completed ? "opacity-60" : ""}`}
        >
          <CardContent className="p-4">
            <div className="flex items-start space-x-3">
              <Checkbox checked={todo.completed} onCheckedChange={() => onToggleComplete(todo.id)} className="mt-1" />

              <div className="flex-1 min-w-0" onClick={() => onTodoClick(todo)}>
                <div className="flex items-center justify-between mb-2">
                  <h3 className={`font-medium truncate ${todo.completed ? "line-through text-muted-foreground" : ""}`}>
                    {todo.title}
                  </h3>
                  <Badge variant="secondary" className={priorityConfig[todo.priority].color}>
                    {priorityConfig[todo.priority].label}
                  </Badge>
                </div>

                {todo.description && (
                  <p
                    className={`text-sm text-muted-foreground mb-2 line-clamp-2 ${
                      todo.completed ? "line-through" : ""
                    }`}
                  >
                    {todo.description}
                  </p>
                )}

                <div className="flex items-center text-xs text-muted-foreground">
                  <Calendar className="mr-1 h-3 w-3" />
                  <span>{todo.createdAt.toLocaleDateString()}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
