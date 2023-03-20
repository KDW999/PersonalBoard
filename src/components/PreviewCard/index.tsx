import { Box } from '@mui/material'
import React from 'react'
import { IPreviewItem } from 'src/interfaces'

interface Props{
    previewItem : IPreviewItem
}

export default function PreviewCard( {previewItem} : Props) {
  return (
    <Box>PreviewCard</Box>
  )
}
