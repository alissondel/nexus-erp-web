import * as React from 'react'

import { cn } from '@/lib/utils'

import InputMask from 'react-input-mask'
import { Eye, EyeOff } from 'lucide-react'

export type InputProps = React.InputHTMLAttributes<HTMLInputElement>

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          'flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
          className,
        )}
        ref={ref}
        {...props}
      />
    )
  },
)
Input.displayName = 'Input'

const InputPhone = React.forwardRef<InputMask, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <InputMask
        type={type}
        mask="(99) 99999-9999"
        className={cn(
          'flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
          className,
        )}
        ref={ref}
        {...props}
      />
    )
  },
)
InputPhone.displayName = 'InputPhone'

const InputPassword = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, ...props }, ref) => {
    const [showPassword, SetShowPassword] = React.useState<boolean>(false)

    function togglePasswordVisibility() {
      SetShowPassword((prevShowPassword) => !prevShowPassword)
    }

    return (
      <div className="relative">
        <input
          type={showPassword ? 'text' : 'password'}
          className={cn(
            'flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
            className,
          )}
          ref={ref}
          {...props}
        />
        <button
          type="button"
          onClick={togglePasswordVisibility}
          className="absolute right-4 top-1/2 -translate-y-1/2 transform"
        >
          {showPassword ? (
            <Eye className="h-6 w-6 text-gray-500" />
          ) : (
            <EyeOff className="h-6 w-6 text-gray-500" />
          )}
        </button>
      </div>
    )
  },
)
InputPassword.displayName = 'InputPassword'

export { Input, InputPhone, InputPassword }
