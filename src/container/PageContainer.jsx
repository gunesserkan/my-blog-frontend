import React from 'react'
import Container from '@mui/material/Container';
function PageContainer({ children }) {
    return (
        <Container maxWidth='lg' style={{ minHeight: '500px' }}>{children}</Container>
    )
}

export default PageContainer