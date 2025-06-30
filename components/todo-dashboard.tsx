"use client"

import { useState, useEffect } from "react"
import { Navbar } from "@/components/navbar"
import { TodoList } from "@/components/todo-list"
import { AddTodoForm } from "@/components/add-todo-form"
import { TodoModal } from "@/components/todo-modal"
import { PriorityFilter } from "@/components/priority-filter"

export interface Todo {
  id: string
  title: string
  description: string
  priority: 0 | 1 | 2 | 3 | 4
  completed: boolean
  createdAt: Date
}

interface TodoDashboardProps {
  user: { name: string; email: string }
  onLogout: () => void
}

export function TodoDashboard({ user, onLogout }: TodoDashboardProps) {
  const [todos, setTodos] = useState<Todo[]>([])
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [priorityFilter, setPriorityFilter] = useState<number | null>(null)

  useEffect(() => {
    const savedTodos = localStorage.getItem("todos")
    if (savedTodos) {
      const parsedTodos = JSON.parse(savedTodos).map((todo: any) => ({
        ...todo,
        createdAt: new Date(todo.createdAt),
      }))
      setTodos(parsedTodos)
    }
  }, [])

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos))
  }, [todos])

  const addTodo = (todoData: Omit<Todo, "id" | "createdAt">) => {
    const newTodo: Todo = {
      ...todoData,
      id: Date.now().toString(),
      createdAt: new Date(),
    }
    setTodos([newTodo, ...todos])
  }

  const updateTodo = (updatedTodo: Todo) => {
    setTodos(todos.map((todo) => (todo.id === updatedTodo.id ? updatedTodo : todo)))
    setSelectedTodo(null)
    setIsModalOpen(false)
  }

  const deleteTodo = (id: string) => {
    setTodos(todos.filter((todo) => todo.id !== id))
    setSelectedTodo(null)
    setIsModalOpen(false)
  }

  const toggleComplete = (id: string) => {
    setTodos(todos.map((todo) => (todo.id === id ? { ...todo, completed: !todo.completed } : todo)))
  }

  const openTodoModal = (todo: Todo) => {
    setSelectedTodo(todo)
    setIsModalOpen(true)
  }

  const filteredTodos = priorityFilter !== null ? todos.filter((todo) => todo.priority === priorityFilter) : todos

  return (
    <div className="min-h-screen bg-background">
      <Navbar user={user} onLogout={onLogout} />

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto space-y-6">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight">Welcome back, {user.name}!</h2>
            <p className="text-muted-foreground">Manage your tasks efficiently</p>
          </div>

          <AddTodoForm onAddTodo={addTodo} />

          <PriorityFilter selectedPriority={priorityFilter} onPriorityChange={setPriorityFilter} />

          <TodoList todos={filteredTodos} onTodoClick={openTodoModal} onToggleComplete={toggleComplete} />
        </div>
      </div>

      {selectedTodo && (
        <TodoModal
          todo={selectedTodo}
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false)
            setSelectedTodo(null)
          }}
          onUpdate={updateTodo}
          onDelete={deleteTodo}
        />
      )}
    </div>
  )
}
