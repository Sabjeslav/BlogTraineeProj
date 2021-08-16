import { Link } from "react-router-dom";
import React from "react";
import style from "./Post.module.sass";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";


export default function Post({ post }) {
  return (
    <Card className={style.postWrapper}>
      <CardActionArea>
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2" className={style.postText}>
            {post.title}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p" className={style.postText}>
            {post.description}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary">
          <Link className={style.detailsBtn} to={`/posts/${post._id}`}>
            View details
          </Link>
        </Button>
      </CardActions>
    </Card>
  );
}
