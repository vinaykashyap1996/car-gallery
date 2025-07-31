'use client'

import React, { useState, useEffect } from 'react'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import MenuItem from '@mui/material/MenuItem'
import CircularProgress from '@mui/material/CircularProgress'

export default function AddCarModal({
  open,
  onClose,
  onDone,
}: {
  open: boolean
  onClose: () => void
  onDone: (id: string) => void
}) {
  const [title, setTitle] = useState('')
  const [image, setImage] = useState<File | null>(null)
  const [manufacturer, setManufacturer] = useState('')
  const [manufacturers, setManufacturers] = useState<any[]>([])
  const [year, setYear] = useState('')
  const [price, setPrice] = useState('')
  const [description, setDescription] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  useEffect(() => {
    if (open) {
      fetch('/api/manufacturers')
        .then((res) => res.json())
        .then((data) => setManufacturers(data.docs || []))
        .catch(() => setManufacturers([]))
    }
  }, [open])

  if (!open) return null

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    setSuccess(false)
    console.log(title, image, manufacturer, year, price, description)
    const carData = {
      title,
      manufacturer,
      year,
      price,
      description,
    }

    try {
      const res = await fetch('/api/cars', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(carData),
      })
      if (!res.ok) throw new Error('Failed to add car')
      const newCar = await res.json()
      onDone(newCar.id)
      setSuccess(true)
      setTitle('')
      setImage(null)
      setManufacturer('')
      setYear('')
      setPrice('')
      setDescription('')
      onClose()
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <form onSubmit={handleSubmit}>
        <DialogTitle>Add New Car</DialogTitle>
        <DialogContent dividers>
          <TextField
            label="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            fullWidth
            margin="normal"
          />
          {/* <Button variant="outlined" component="label" sx={{ my: 2 }} fullWidth>
            Upload Image
            <input
              type="file"
              accept="image/*"
              hidden
              onChange={(e) => setImage(e.target.files?.[0] || null)}
            />
          </Button> */}
          <TextField
            select
            label="Manufacturer"
            value={manufacturer}
            onChange={(e) => setManufacturer(e.target.value)}
            fullWidth
            margin="normal"
          >
            <MenuItem value="">Select manufacturer</MenuItem>
            {manufacturers.map((m) => (
              <MenuItem key={m.id} value={m.id}>
                {m.name || m.title || m.id}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            label="Year"
            type="number"
            value={year}
            onChange={(e) => setYear(e.target.value)}
            fullWidth
            margin="normal"
            inputProps={{ min: 1886, max: new Date().getFullYear() + 1 }}
          />
          <TextField
            label="Price"
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            fullWidth
            margin="normal"
            inputProps={{ min: 0, step: 'any' }}
          />
          <TextField
            label="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            fullWidth
            margin="normal"
            multiline
            rows={3}
          />
          {error && <div style={{ color: 'red', marginTop: 8, textAlign: 'center' }}>{error}</div>}
          {success && (
            <div style={{ color: 'green', marginTop: 8, textAlign: 'center' }}>
              Car added successfully!
            </div>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} disabled={loading} color="secondary" variant="outlined">
            Cancel
          </Button>
          <Button type="submit" disabled={loading} variant="contained" color="primary">
            {loading ? <CircularProgress size={24} /> : 'Add'}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  )
}
