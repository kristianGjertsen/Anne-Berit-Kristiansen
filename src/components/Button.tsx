import type { ButtonHTMLAttributes, ReactNode } from 'react'

type ButtonProps =
  | { href: string; children: ReactNode; className?: string }
  | (ButtonHTMLAttributes<HTMLButtonElement> & { href?: never })

export function Button(props: ButtonProps) {
  const classes = `inline-flex min-h-11 items-center justify-center rounded-sm bg-foreground px-5 py-3 text-sm font-medium text-background hover:underline underline-offset-4 ${props.className ?? ''}`
  if (props.href !== undefined) {
    return (
      <a className={classes} href={props.href}>
        {props.children}
      </a>
    )
  }
  return <button type="button" {...props} className={classes} />
}
