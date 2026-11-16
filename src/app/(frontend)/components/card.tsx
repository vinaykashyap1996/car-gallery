'use client'
import { Car } from '@/payload-types'
import Avatar from '@mui/material/Avatar'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardHeader from '@mui/material/CardHeader'
import CardMedia from '@mui/material/CardMedia'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import Image from 'next/image'
import React from 'react'
import { red } from '@mui/material/colors'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import CardActions from '@mui/material/CardActions'
import FavoriteIcon from '@mui/icons-material/Favorite'
import ShareIcon from '@mui/icons-material/Share'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import Box from '@mui/material/Box'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
interface CardProps {
  car: Car
  imageUrl: string
  onDelete: (id: string) => void
}
const CustomCard = ({ car, imageUrl, onDelete }: CardProps) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)
  const manufacturer =
    typeof car.manufacturer === 'object' && car.manufacturer !== null ? car.manufacturer : null
  const logo = manufacturer?.logo && typeof manufacturer.logo === 'object' ? manufacturer.logo : null
  const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleDelete = async (id: string) => {
    if (!id) {
      console.error('Car ID is required for deletion')
      return
    }
    const response = await fetch('/api/cars', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id: car.id }),
    })

    if (response.ok) {
      // Handle successful deletion, e.g., show a success message or refresh the list
      console.log('Car deleted successfully')
    } else {
      // Handle error case
      console.error('Failed to delete car')
    }
    onDelete(car.id)
    handleClose()
  }

  return (
    <Card sx={{ maxWidth: 400, maxHeight: 400 }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            {logo?.url ? (
              <Image
                src={logo.url}
                alt="Car Icon"
                width={40}
                height={40}
                style={{ borderRadius: '50%' }}
              />
            ) : null}
          </Avatar>
        }
        action={
          <>
            <IconButton aria-label="settings" onClick={handleMenuClick}>
              <MoreVertIcon />
            </IconButton>
            <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
              <MenuItem
                onClick={() => {
                  handleClose() /* handle edit */
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <EditIcon />
                  <Typography>Edit</Typography>
                </Box>
              </MenuItem>
              <MenuItem
                onClick={() => {
                  handleDelete(car.id)
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <DeleteIcon />
                  <Typography>Delete</Typography>
                </Box>
              </MenuItem>
            </Menu>
          </>
        }
        title={car.title}
        subheader={car.year}
      />
      <CardMedia
        component="img"
        height="194"
        image={'/api/media/file/Ferrari-Suv.avif'}
        alt="Car image"
      />
      <CardContent>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          {car.description?.root?.children?.map((child: any) => child.text).join(' ')}
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          Price: {car.price}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
      </CardActions>
    </Card>
  )
}

export default CustomCard
