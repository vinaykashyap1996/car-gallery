'use client'
import React from 'react'
import AddCarModal from './add-modal'
import Button from '@mui/material/Button'
export default function AddCarButton({ onDone }: { onDone: (id: string) => void }) {
  const [isOpen, setIsOpen] = React.useState<boolean>(false)
  return (
    <>
      <Button
        variant="contained"
        color="primary"
        style={{ cursor: 'pointer', marginBottom: '1rem' }}
        onClick={() => {
          setIsOpen(true)
        }}
      >
        Add Car
      </Button>
      <AddCarModal open={isOpen} onClose={() => setIsOpen(false)} onDone={onDone} />
    </>
  )
}
