import { List, ListItem, ListItemText, ListItemAvatar, Avatar, Paper, TextField, Button, Typography, IconButton, Dialog, DialogTitle, DialogContent, DialogActions, Divider } from '@mui/material';
import React, { useState } from 'react';
import SendIcon from '@mui/icons-material/Send';
import ReplyIcon from '@mui/icons-material/Reply';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import PersonIcon from '@mui/icons-material/Person';

function DiscussionForum() {
    const [posts, setPosts] = useState([
        { id: 1, content: "Looking forward to this event!", timestamp: new Date().toISOString(), replies: [], user: "Alice Johnson" },
        { id: 2, content: "Does anyone know if there's parking available?", timestamp: new Date().toISOString(), replies: [], user: "Bob Smith" }
    ]);
    const [newPost, setNewPost] = useState("");
    const [newReply, setNewReply] = useState("");
    const [replyingTo, setReplyingTo] = useState(null);
    const [openPostDialog, setOpenPostDialog] = useState(false);

    const handlePost = () => {
        if (newPost.trim()) {
            const newPostData = {
                id: posts.length + 1,
                content: newPost,
                timestamp: new Date().toISOString(),
                replies: [],
                user: "Current User"  // Dynamically replace with the actual user's name
            };
            setPosts([...posts, newPostData]);
            setNewPost("");
            setOpenPostDialog(false);
        }
    };

    const handleReply = (postId) => {
        if (newReply.trim()) {
            const updatedPosts = posts.map(post =>
                post.id === postId ? {
                    ...post,
                    replies: [...post.replies, { id: post.replies.length + 1, content: newReply, timestamp: new Date().toISOString(), user: "Current User" }] // Dynamically replace with the actual user's name
                } : post
            );
            setPosts(updatedPosts);
            setNewReply("");
            setReplyingTo(null); // Clear the reply state
        }
    };

    const openNewPostDialog = () => {
        setOpenPostDialog(true);
    };

    const closeNewPostDialog = () => {
        setOpenPostDialog(false);
        setNewPost("");
    };

    return (
        <Paper style={{ padding: '16px', margin: '16px' }}>
            <Typography variant="h6" gutterBottom>
                Discussion Forum
            </Typography>
            <Button variant="outlined" startIcon={<AddCircleOutlineIcon />} onClick={openNewPostDialog}>
                Create Post
            </Button>
            <List>
                {posts.map((post, index) => (
                    <React.Fragment key={post.id}>
                        <ListItem alignItems="flex-start" sx={{ mb: 2 }}>
                            <ListItemAvatar>
                                <Avatar>
                                    <PersonIcon />
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText
                                primary={post.content}
                                secondary={`${post.user} - ${new Date(post.timestamp).toLocaleString()}`}
                            />
                            <IconButton onClick={() => setReplyingTo(post.id === replyingTo ? null : post.id)} edge="end" aria-label="reply">
                                <ReplyIcon />
                            </IconButton>
                        </ListItem>
                        {replyingTo === post.id && (
                            <TextField
                                label="Write a reply..."
                                variant="outlined"
                                fullWidth
                                multiline
                                minRows={1}
                                value={newReply}
                                onChange={(e) => setNewReply(e.target.value)}
                                margin="normal"
                            />
                        )}
                        {replyingTo === post.id && (
                            <Button variant="contained" color="primary" endIcon={<SendIcon />} onClick={() => handleReply(post.id)}>
                                Reply
                            </Button>
                        )}
                        {post.replies.map(reply => (
                            <ListItem sx={{ pl: 4 }} key={reply.id}>
                                <ListItemText
                                    primary={reply.content}
                                    secondary={`${reply.user} - ${new Date(reply.timestamp).toLocaleString()}`}
                                />
                            </ListItem>
                        ))}
                        <Divider variant="inset" component="li" />
                    </React.Fragment>
                ))}
            </List>

            <Dialog open={openPostDialog} onClose={closeNewPostDialog} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">New Post</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="post"
                        label="What's on your mind?"
                        type="text"
                        fullWidth
                        variant="outlined"
                        value={newPost}
                        onChange={(e) => setNewPost(e.target.value)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={closeNewPostDialog} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handlePost} color="primary" endIcon={<SendIcon />}>
                        Post
                    </Button>
                </DialogActions>
            </Dialog>
        </Paper>
    );
}

export default DiscussionForum;
