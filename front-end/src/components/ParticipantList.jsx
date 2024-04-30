import { List, ListItem, ListItemText, Paper, Typography } from '@mui/material';

function ParticipantList() {
  const participants = [
    { id: 1, name: "John Doe" },
    { id: 2, name: "Jane Smith" },
    { id: 3, name: "Alice Johnson" }
  ];

  return (
    <Paper style={{ padding: '16px', margin: '16px', marginTop: '32px' }}>
      <Typography variant="h6" gutterBottom>
        Participants
      </Typography>
      <List>
        {participants.map(participant => (
          <ListItem key={participant.id}>
            <ListItemText primary={participant.name} />
          </ListItem>
        ))}
      </List>
    </Paper>
  );
}

export default ParticipantList;