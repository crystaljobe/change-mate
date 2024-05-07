import {useState, Fragment} from 'react';
import Box from '@mui/material/Box';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import MoreHoriz from '@mui/icons-material/MoreHoriz';
import { useNavigate } from "react-router-dom";

export default function DropDownButton({eventID, eventCategory}) {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate(); // Initialize navigate using the useNavigate hook


  return (
    <Fragment>
      <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
        <Tooltip title="Event Management">
          <IconButton
            onClick={handleClick}
            size="large"
            sx={{ ml: 2 }}
            aria-controls={open ? 'account-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
          >
            <MoreHoriz fontSize="large" />
          </IconButton>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            '&::before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        {eventCategory === "userEvents" && (
            <>
            <MenuItem onClick={() => navigate(`/admin/${eventID}`)}>
                Admin Page
            </MenuItem>
            <MenuItem onClick={() => navigate(`/eventCollab/${eventID}`)}>
                Collaboration Page
            </MenuItem>
            </>
        )}
        {eventCategory === "volunteerEvents" && <MenuItem onClick={() => navigate(`/eventCollab/${eventID}`)}>
          Collaboration Page
        </MenuItem>}
      </Menu>
    </Fragment>
  );
}