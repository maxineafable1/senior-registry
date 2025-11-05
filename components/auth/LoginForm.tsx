'use client'

import { useForm } from 'react-hook-form'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '../ui/form'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import SelectionBtn from './SelectionBtn'
import { loginSchema, LoginSchemaType } from '@/lib/zod/auth-schema'
import { login } from '@/lib/actions/session-action'
import Image from 'next/image'

export default function LoginForm() {
  const [chosenRole, setChosenRole] = useState<'staff' | 'admin' | 'user' | null>(null)
  const form = useForm<LoginSchemaType>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      password: '',
      username: '',
    }
  })

  // 2. Define a submit handler.
  async function onSubmit(values: LoginSchemaType) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.

    console.log(values)
    console.log(chosenRole)
    const response = await login(values.username, values.password)

    if (response.error) {
      console.log(response.error)
      form.setError('root', { message: response.error })
    }

  }

  return (
    <div className="max-w-md mx-auto flex flex-col">
      <div className="text-center mb-8">
        <Image src={'/gen-tinio.png'} className='mx-auto mb-8' alt='' width='200' height='200' />
        <div className="text-5xl font-bold uppercase">Senior Registry</div>
        <p className='text-xl'>Rio Chico, General Tinio</p>
      </div>

      {chosenRole ? (
        <>
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
              <Button type="submit" className='w-full'>Log in</Button>
            </form>
          </Form>
        </>
      ) : (
        <div className="mx-auto flex flex-col gap-8">
          <SelectionBtn setChosenRole={setChosenRole} text='user' />
          <SelectionBtn setChosenRole={setChosenRole} text='admin' />
          <SelectionBtn setChosenRole={setChosenRole} text='staff' />
        </div>
      )}

    </div>
  )
}
