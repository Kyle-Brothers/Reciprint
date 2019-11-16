import React from 'react';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import {red} from '@material-ui/core/colors';

const Item = props => {
  const {result} = props;
  return (
    <div>
      <Card>
        <a
          href={result.recipeUrl}
          rel="noopener noreferrer"
          target="_blank"
          style={{textDecoration: 'none'}}>
          <CardHeader
            avatar={<Avatar aria-label="recipe">♡</Avatar>}
            action={<IconButton aria-label="settings"></IconButton>}
            title={result.recipeTitle}
            subheader={`調理時間目安：${result.recipeIndication}`}
          />
          <img
            src={result.foodImageUrl}
            alt=""
            style={{width: '75%', padding: '10%'}}
          />
        </a>
        <CardContent>
          <Typography variant="body2" color="textSecondary" component="p">
            {result.recipeMaterial.map(a => (
              <li>{a}</li>
            ))}
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
};

export default Item;
