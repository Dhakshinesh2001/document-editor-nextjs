import React from 'react'
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
  } from "@/components/ui/popover"
  

const Notification = () => {
  return (
    <Popover>
  <PopoverTrigger className='relative flex size-10 items-center justify-center rounded-lg'>Open</PopoverTrigger>
  <PopoverContent>Place content for the popover here.</PopoverContent>
</Popover>

  )
}

export default Notification