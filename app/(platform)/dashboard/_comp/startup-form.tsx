"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { startups } from "@/lib/db/schema"
import { createStartup, updateStartup } from "@/app/(platform)/startups/actions"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Startup name must be at least 2 characters.",
  }),
  description: z.string().min(10, {
    message: "Description must be at least 10 characters.",
  }),
  problem: z.string().min(10, {
    message: "Problem description must be at least 10 characters.",
  }),
  solution: z.string().min(10, {
    message: "Solution description must be at least 10 characters.",
  }),
  teamSize: z.coerce.number().min(1, {
    message: "Team size must be at least 1.",
  }),
  patent: z.string().min(1, {
    message: "Patent information is required.",
  }),
  funding: z.coerce.number().min(0, {
    message: "Funding amount must be a positive number.",
  }),
})

type StartupFormValues = z.infer<typeof formSchema>

interface StartupFormProps {
  initialData?: typeof startups.$inferSelect
  mode?: "create" | "edit"
}

export function StartupForm({ initialData, mode = "create" }: StartupFormProps) {
  const router = useRouter()
  const form = useForm<StartupFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      name: "",
      description: "",
      problem: "",
      solution: "",
      teamSize: 1,
      patent: "",
      funding: 0,
    },
  })

  async function onSubmit(data: StartupFormValues) {
    try {
      if (mode === "create") {
        await createStartup(data)
        toast.success("Startup created successfully!")
      } else if (initialData) {
        // Only pass the fields that can be updated
        const updateData = {
          ...data,
          id: initialData.id,
          founderId: initialData.founderId,
          created_at: initialData.created_at,
        }
        await updateStartup(initialData.id, updateData)
        toast.success("Startup updated successfully!")
      }
      router.refresh()
      router.push("/dashboard")
    } catch (error) {
      toast.error("Something went wrong. Please try again.")
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Startup Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter your startup name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Input
                  placeholder="Describe your startup"
                  className="min-h-[100px]"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="problem"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Problem</FormLabel>
              <FormControl>
                <Input
                  placeholder="What problem does your startup solve?"
                  className="min-h-[100px]"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="solution"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Solution</FormLabel>
              <FormControl>
                <Input
                  placeholder="How does your startup solve this problem?"
                  className="min-h-[100px]"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="teamSize"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Team Size</FormLabel>
                <FormControl>
                  <Input type="number" min={1} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="funding"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Funding ($)</FormLabel>
                <FormControl>
                  <Input type="number" min={0} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="patent"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Patent Information</FormLabel>
              <FormControl>
                <Input placeholder="Enter patent details" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full">
          {mode === "create" ? "Create Startup" : "Update Startup"}
        </Button>
      </form>
    </Form>
  )
}
