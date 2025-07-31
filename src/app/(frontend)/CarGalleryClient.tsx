'use client'

import React, { useEffect, useState } from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'
import AddCarButton from './components/add-button'
import CustomCard from './components/card'
import { Car } from '@/payload-types'
import Spinner from './components/spinner'

export default function CarGalleryClient() {
  const [cars, setCars] = useState<Car[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchCars = async () => {
    setLoading(true)
    setError(null)
    try {
      const res = await fetch('/api/cars')
      if (!res.ok) throw new Error('Failed to fetch cars')
      const data = await res.json()
      setCars(data.docs || [])
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchCars()
  }, [])

  const handleDelete = async (id: string) => {
    await fetch(`/api/cars/${id}`, { method: 'DELETE' })
    // Re-fetch cars after delete
    fetchCars()
  }

  const handleAddCar = (id: string) => {
    const isExisting = cars.find((car) => car.id === id)
    if (!isExisting) {
      fetchCars()
    }
  }

  if (loading)
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <Spinner />
      </Box>
    )
  if (error) return <div>Error: {error}</div>
  if (!cars.length) return <div>No cars found</div>

  return (
    <Box display="flex" flexDirection="column" alignItems="center" p={2}>
      <Typography variant="h3" component="h1" gutterBottom>
        Car Gallery
      </Typography>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
        <AddCarButton onDone={handleAddCar} />
      </Box>
      <Grid container spacing={3} justifyContent="center" sx={{ width: '100%' }}>
        {cars.map((car: Car) => {
          let imageUrl = '/media/ferrari.jpg'
          if (car.image) {
            if (typeof car.image === 'string') {
              imageUrl = car.image
            } else if (typeof car.image === 'object' && 'url' in car.image) {
              imageUrl = car.image.url || '/media/ferrari.jpg'
            }
          }
          return (
            <Grid key={car.id} item xs={12} sm={6} md={4} lg={3}>
              <CustomCard car={car} imageUrl={imageUrl} onDelete={handleDelete} />
            </Grid>
          )
        })}
      </Grid>
    </Box>
  )
}
