import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-normal text-center rounded-md text-sm font-medium leading-tight transition duration-150 ease-out disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-sea-bright focus-visible:ring-sea-bright/30 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        default:
          "bg-oxide text-white hover:bg-oxide-hover hover:text-white",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90 focus-visible:ring-destructive/30 dark:bg-destructive/60",
        outline:
          "border border-hairline bg-transparent text-foreground hover:border-sea/40 hover:bg-paper-soft hover:text-foreground dark:text-ink dark:hover:bg-surface-elevated/70 dark:hover:text-ink",
        secondary:
          "border border-hairline bg-surface text-ink hover:bg-surface-elevated hover:text-ink",
        ghost:
          "text-foreground hover:bg-paper-soft hover:text-foreground dark:text-ink dark:hover:bg-surface-elevated/70 dark:hover:text-ink",
        link: "text-sea-bright underline-offset-4 hover:text-oxide hover:underline dark:text-sea-bright",
      },
      size: {
        default: "h-9 px-4 py-2 has-[>svg]:px-3",
        sm: "h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5",
        lg: "h-10 rounded-md px-6 has-[>svg]:px-4",
        icon: "size-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot : "button"

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
