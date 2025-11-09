'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '../ui/form'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { useForm } from 'react-hook-form'
import { seniorRegisterSchema, SeniorRegisterSchemaType } from '@/lib/zod/senior-register-schema'
import { BirthdatePicker } from './BirthdatePicker'
import { registerSenior } from '@/lib/actions/senior-register-action'
import { Checkbox } from '../ui/checkbox'


export default function RegisterForm() {
  const form = useForm<SeniorRegisterSchemaType>({
    resolver: zodResolver(seniorRegisterSchema),
    defaultValues: {
      lastname: '',
      firstname: '',
      middlename: '',
      address: '',
      gender: '',
      guardian: '',
      birthdate: undefined,
      contact: '',
    }
  })

  async function onSubmit(values: SeniorRegisterSchemaType) {
    const files = [
      values.image,
      values.psaCertificate,
      values.pwdId,
      values.seniorId,
      values.philhealthId
    ]

    if (!files.every(file => !file)) {
      const formData = new FormData();

      for (let i = 0; i < files.length; i++) {
        formData.append(`files[]`, files[i] ?? '')
      }

      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      })

      const data = await res.json()

      const uploadedFiles = {
        image: data.urls[0],
        psaCertificate: data.urls[1],
        pwdId: data.urls[2],
        seniorId: data.urls[3],
        philhealthId: data.urls[4],
      }

      console.log(uploadedFiles)

      const newData = {
        ...values,
        contactNumber: values.contact,
        birthdate: values.birthdate.toLocaleDateString(),
        ...uploadedFiles,
      }

      await registerSenior(newData)
      return
    }

    const newData = {
      ...values,
      contactNumber: values.contact,
      birthdate: values.birthdate.toLocaleDateString(),
      image: null,
      psaCertificate: null,
      pwdId: null,
      seniorId: null,
      philhealthId: null,
    }

    await registerSenior(newData)
  }

  return (
    <div className="bg-neutral-50 rounded-lg p-8">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="image"
            render={({ field: { value, onChange, ...fieldProps } }) => (
              <FormItem>
                <FormLabel>Image (Optional)</FormLabel>
                <FormControl>
                  <Input
                    {...fieldProps}
                    onChange={e =>
                      onChange(e.target.files && e.target.files[0])
                    }
                    accept='image/*'
                    type='file' />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex gap-8 items-start *:flex-1">
            <FormField
              control={form.control}
              name="lastname"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Last Name</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="firstname"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>First Name</FormLabel>
                  <FormControl>
                    <Input
                      {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="flex gap-8 items-start *:flex-1">
            <FormField
              control={form.control}
              name="middlename"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Middle Name</FormLabel>
                  <FormControl>
                    <Input
                      {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="birthdate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Date of birth</FormLabel>
                  <FormControl>
                    <BirthdatePicker
                      onValueChange={field.onChange}
                      value={field.value} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="flex gap-8 items-start">
            <FormField
              control={form.control}
              name="gender"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Gender</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    value={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="w-[180px]">
                        <SelectValue />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Gender</SelectLabel>
                        <SelectItem value="male">Male</SelectItem>
                        <SelectItem value="female">Female</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                  <FormMessage className='' />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem className='flex-1'>
                  <FormLabel>Address</FormLabel>
                  <FormControl>
                    <Input
                      {...field} className='' />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

          </div>
          <div className="flex gap-8 items-start *:flex-1">
            <FormField
              control={form.control}
              name="guardian"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Guardian Name</FormLabel>
                  <FormControl>
                    <Input
                      {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="contact"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Contact Number</FormLabel>
                  <FormControl>
                    <Input
                      {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="space-y-4">
            <div className="text-sm font-bold">Credential(s)</div>
            <div className="flex gap-8">
              <FormField
                control={form.control}
                name="psaCertificate"
                render={({ field: { value, onChange, ...fieldProps } }) => (
                  <FormItem>
                    <FormLabel>PSA Certificate</FormLabel>
                    <FormControl>
                      <Input
                        {...fieldProps}
                        onChange={e =>
                          onChange(e.target.files && e.target.files[0])
                        }
                        accept='image/*'
                        type='file' />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="pwdId"
                render={({ field: { value, onChange, ...fieldProps } }) => (
                  <FormItem>
                    <FormLabel>PWD ID</FormLabel>
                    <FormControl>
                      <Input
                        {...fieldProps}
                        onChange={e =>
                          onChange(e.target.files && e.target.files[0])
                        }
                        accept='image/*'
                        type='file' />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex gap-8">
              <FormField
                control={form.control}
                name="seniorId"
                render={({ field: { value, onChange, ...fieldProps } }) => (
                  <FormItem>
                    <FormLabel>Senior ID</FormLabel>
                    <FormControl>
                      <Input
                        {...fieldProps}
                        onChange={e =>
                          onChange(e.target.files && e.target.files[0])
                        }
                        accept='image/*'
                        type='file' />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="philhealthId"
                render={({ field: { value, onChange, ...fieldProps } }) => (
                  <FormItem>
                    <FormLabel>Philhealth ID</FormLabel>
                    <FormControl>
                      <Input
                        {...fieldProps}
                        onChange={e =>
                          onChange(e.target.files && e.target.files[0])
                        }
                        accept='image/*'
                        type='file' />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
          <Button
            disabled={form.formState.isSubmitting}
            type="submit"
            className='w-full cursor-pointer'>
            {form.formState.isSubmitting ? 'Loading...' : 'Confirm Registration'}
          </Button>
        </form>
      </Form>
    </div>
  )
}
