import { styled } from '@mui/material/styles';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import SettingsIcon from '@mui/icons-material/Settings';
import FeedIcon from '@mui/icons-material/Feed';
import GroupsIcon from '@mui/icons-material/Groups';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import EditIcon from '@mui/icons-material/Edit';
import { useParams, Link } from 'react-router-dom';

const StyledSpeedDial = styled(SpeedDial)(({ theme }) => ({
  position: 'absolute',
  '&.MuiSpeedDial-directionDown': {
    top: theme.spacing(2),
    left: theme.spacing(2),
  }
}));

export default function SpeedDialMenu() {
  const { eventID } = useParams();

  const actions = [
    { icon: <EditIcon />, name: 'Edit Event', url: `/editEvent/${eventID}`},
    { icon: <ManageAccountsIcon />, name: 'Admin Page', url: `/admin/${eventID}`},
    { icon: <GroupsIcon />, name: 'Collaboration Page', url: `/collab/${eventID}`},
    { icon: <FeedIcon />, name: 'Public Event Page', url: `/event/${eventID}`},
  ];
  
  return (
    <div style={{ zIndex: "1000", position: "absolute", top: 0, right: 0, margin:"30px", marginRight:"130px", backgroundColor:"rgba(255, 255, 255, 0.7)", padding:"0"}}>
      <StyledSpeedDial
        ariaLabel="Event Management Menu"
        icon={<SettingsIcon />}
        direction={"down"}
        
      >
        {actions.map((action, index) => (
          <SpeedDialAction
            key={index}
            icon={action.icon}
            tooltipTitle={action.name}
            component={Link}
            to={action.url}
          />
        ))}
      </StyledSpeedDial>  
    </div>
  );
}
