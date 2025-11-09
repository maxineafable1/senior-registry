'use client'

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { systemAdminRegister } from '@/lib/actions/auth-action'
import { systemAdminSchema, SystemAdminSchemaType } from '@/lib/zod/auth-schema'
import { zodResolver } from '@hookform/resolvers/zod'
import Image from 'next/image'
import { useForm } from 'react-hook-form'
import { Button } from '../ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '../ui/form'
import { Input } from '../ui/input'

export default function SystemAdminForm({
  role,
}: {
  role: string | undefined
}) {
  const form = useForm<SystemAdminSchemaType>({
    resolver: zodResolver(systemAdminSchema),
    defaultValues: {
      password: '',
      username: '',
      role: '',
    }
  })

  async function onSubmit(values: SystemAdminSchemaType) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values)
    const register = await systemAdminRegister(values)

    if (register?.error) {
      console.log(register.error)
      form.setError('root', { message: register.error })
    }
    // else
    // await login(values.username, values.password)
  }

  return (
    <div className="min-h-dvh flex flex-col max-w-sm mx-auto justify-center">
      <Image src={'/gen-tinio.png'} className='mx-auto mb-8' alt='' width='200' height='200' />
      <div className="text-4xl font-bold uppercase text-center mb-8">System Admin</div>
      {form.formState.errors.root && (
        <div className="mb-4 shadow bg-red-400 text-sm text-neutral-100 rounded p-1.5">
          {form.formState.errors.root.message}
        </div>
      )}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    type='password'
                    {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='role'
            render={({ field }) => (
              <FormItem>
                <Select
                  onValueChange={field.onChange}
                  value={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="w-[180px] mx-auto">
                      <SelectValue placeholder="Role selection" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Role</SelectLabel>
                      {role === "admin" && <>
                        <SelectItem value="admin">Admin</SelectItem>
                        <SelectItem value="staff">Staff</SelectItem>
                      </>}
                      <SelectItem value="user">User</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
                <FormMessage className='mx-auto' />
              </FormItem>
            )}
          />
          <Button
            disabled={form.formState.isSubmitting}
            type="submit" className='w-full'>
            {form.formState.isSubmitting ? 'Loading...' : 'Register'}
          </Button>
        </form>
      </Form>
    </div>
  )
}
