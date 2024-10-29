import React from 'react'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import CardActionArea from '@mui/material/CardActionArea';
import CardActions from '@mui/material/CardActions';
import postMedia from '../images/post.jpg'
import Grid from '@mui/material/Grid2';

function Post({ post }) {

    const { id, title, username, content, createdAt } = post

    return (
        <Card sx={{ width: 345, marginTop: 2 }}>
            <CardActionArea>
                <CardMedia
                    component="img"
                    height="140"
                    image={postMedia}
                    alt="green iguana"
                />
                <CardContent>
                    <Typography gutterBottom variant="h4" component="div" align='left'>
                        {title}
                    </Typography>
                    <Typography gutterBottom variant="h6" component="div" align='left'>
                        {username}
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                        {content}
                    </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions>
                <Button size="small" color="primary">
                    Share
                </Button>
            </CardActions>
        </Card>
    )
}

export default Post