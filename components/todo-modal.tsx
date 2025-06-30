"use client"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Trash2, Edit, Save, X } from "lucide-react"
import type { Todo } from "@/components/todo-dashboard"

interface TodoModalProps {
  todo: Todo
  isOpen: boolean
  onClose: () => void
  onUpdate: (todo: Todo) => void
  onDelete: (id: string) => void
}

const priorityOptions = [
  { value: 0, label: "Urgent", color: "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400" },
  { value: 1, label: "High", color: "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400" },
  { value: 2, label: "Medium", color: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400" },
  { value: 3, label: "Low", color: "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400" },
  { value: 4, label: "None", color: "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-400" },
]

export function TodoModal({ todo, isOpen, onClose, onUpdate, onDelete }: TodoModalProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [title, setTitle] = useState(todo.title)
  const [description, setDescription] = useState(todo.description)
  const [priority, setPriority] = useState<0 | 1 | 2 | 3 | 4>(todo.priority)
  const [completed, setCompleted] = useState(todo.completed)

  useEffect(() => {
    setTitle(todo.title)
    setDescription(todo.description)
    setPriority(todo.priority)
    setCompleted(todo.completed)
    setIsEditing(false)
  }, [todo])

  const handleSave = () => {
    if (title.trim()) {
      onUpdate({
        ...todo,
        title: title.trim(),
        description: description.trim(),
        priority,
        completed,
      })
      setIsEditing(false)
    }
  }

  const handleCancel = () => {
    setTitle(todo.title)
    setDescription(todo.description)
    setPriority(todo.priority)
    setCompleted(todo.completed)
    setIsEditing(false)
  }

  const currentPriority = priorityOptions.find((p) => p.value === todo.priority)

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <span>Task Details</span>
            <div className="flex items-center space-x-2">
              {!isEditing && currentPriority && (
                <Badge className={currentPriority.color}>{currentPriority.label}</Badge>
              )}
            </div>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {isEditing ? (
            <>
              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input id="title" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Task title" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Task description"
                  rows={4}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="priority">Priority</Label>
                <Select
                  value={priority.toString()}
                  onValueChange={(value) => setPriority(Number.parseInt(value) as 0 | 1 | 2 | 3 | 4)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {priorityOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value.toString()}>
                        <span className={option.color.replace("bg-", "text-").split(" ")[0]}>{option.label}</span>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="completed"
                  checked={completed}
                  onCheckedChange={(checked) => setCompleted(checked as boolean)}
                />
                <Label htmlFor="completed">Mark as completed</Label>
              </div>
            </>
          ) : (
            <>
              <div>
                <h3 className={`text-lg font-medium ${completed ? "line-through text-muted-foreground" : ""}`}>
                  {todo.title}
                </h3>
                {todo.description && (
                  <p className={`text-muted-foreground mt-2 ${completed ? "line-through" : ""}`}>{todo.description}</p>
                )}
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  checked={completed}
                  onCheckedChange={(checked) => {
                    setCompleted(checked as boolean)
                    onUpdate({ ...todo, completed: checked as boolean })
                  }}
                />
                <Label>Completed</Label>
              </div>

              <div className="text-sm text-muted-foreground">
                <p>
                  Created: {todo.createdAt.toLocaleDateString()} at {todo.createdAt.toLocaleTimeString()}
                </p>
              </div>
            </>
          )}
        </div>

        <DialogFooter className="flex justify-between">
          <Button variant="destructive" onClick={() => onDelete(todo.id)} className="mr-auto">
            <Trash2 className="mr-2 h-4 w-4" />
            Delete
          </Button>

          <div className="flex space-x-2">
            {isEditing ? (
              <>
                <Button variant="outline" onClick={handleCancel}>
                  <X className="mr-2 h-4 w-4" />
                  Cancel
                </Button>
                <Button onClick={handleSave}>
                  <Save className="mr-2 h-4 w-4" />
                  Save
                </Button>
              </>
            ) : (
              <Button onClick={() => setIsEditing(true)}>
                <Edit className="mr-2 h-4 w-4" />
                Edit
              </Button>
            )}
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
