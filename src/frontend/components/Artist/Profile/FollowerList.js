import React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import ListItemText from '@mui/material/ListItemText';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const Follower = ({followName}) => (
  <ListItem>
    <ListItemAvatar>
      <Avatar>
        <AccountCircleIcon />
      </Avatar>
    </ListItemAvatar>
    <ListItemText primary={followName} />
  </ListItem>
);

const FollowList = ({ list }) => (
  <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
    <div>
      {list.map((follow) => (
        <Follower
          key={follow.id}
          followName={follow.username}
        />
      ))}
    </div>
  </List>
);

export default FollowList;
