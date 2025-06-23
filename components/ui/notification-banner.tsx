"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { X } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

const notificationBannerVariants = cva(
  "relative w-full border-l-4 p-4 [&>svg~*]:pl-7 [&>svg+div]:translate-y-[-3px] [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg]:text-foreground",
  {
    variants: {
      variant: {
        default: "bg-background text-foreground",
        destructive:
          "border-destructive/50 text-destructive dark:border-destructive [&>svg]:text-destructive",
        success:
          "border-green-500/50 text-green-700 dark:border-green-500 [&>svg]:text-green-700",
        warning:
          "border-yellow-500/50 text-yellow-700 dark:border-yellow-500 [&>svg]:text-yellow-700",
        info:
          "border-blue-500/50 text-blue-700 dark:border-blue-500 [&>svg]:text-blue-700",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

const NotificationBanner = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> &
    VariantProps<typeof notificationBannerVariants> & {
      onDismiss?: () => void
    }
>(({ className, variant, onDismiss, children, ...props }, ref) => (
  <div
    ref={ref}
    role="alert"
    className={cn(notificationBannerVariants({ variant }), className)}
    {...props}
  >
    <div className="flex items-start justify-between">
      <div className="flex-1">{children}</div>
      {onDismiss && (
        <Button
          variant="ghost"
          size="sm"
          className="ml-4 h-auto p-1 text-muted-foreground hover:text-foreground"
          onClick={onDismiss}
        >
          <X className="h-4 w-4" />
          <span className="sr-only">Dismiss</span>
        </Button>
      )}
    </div>
  </div>
))
NotificationBanner.displayName = "NotificationBanner"

export { NotificationBanner, notificationBannerVariants } 