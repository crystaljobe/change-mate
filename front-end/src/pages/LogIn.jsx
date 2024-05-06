import { useState } from "react";
import { useOutletContext, useNavigate } from "react-router-dom";
// import Button from "react-bootstrap/Button";
// import Form from "react-bootstrap/Form";
// import Col from "react-bootstrap/Col";
// import Row from "react-bootstrap/Row";
// import Container from "react-bootstrap/Container";
import { userLogin } from "../utilities/UserUtilities";

//material UI imports
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";

export default function LogIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setUser } = useOutletContext();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    let response = await userLogin(email, password);
    setUser(response);
    navigate("/profile");
  };

  return (
    <>
      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
           
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={handleSubmit}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item>
                <Link href="/signup" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </>
  );
}

//   <>
//     <Container fluid className="mt-5">
//       <Row>
//         <Col sm> </Col>
//         <Col sm style={{ textAlign: "center" }}>
//           {" "}
//           <h2>Login</h2>{" "}
//         </Col>
//         <Col sm> </Col>
//       </Row>
//       <br />
//     </Container>

//     <Form onSubmit={handleSubmit}>
//       <Container fluid>
//         <Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
//           <Col sm={2} />
//           <Form.Label column sm={2} style={{ textAlign: "end" }}>
//             Email:
//           </Form.Label>
//           <Col sm={4}>
//             <Form.Control
//               type="email"
//               placeholder="Enter email"
//               onChange={(e) => setEmail(e.target.value)}
//               value={email}
//             />
//             <Form.Text className="text-muted">
//               We&apos;ll never share your email with anyone else.
//             </Form.Text>
//           </Col>
//           <Col />
//         </Form.Group>

//         <Form.Group
//           as={Row}
//           className="mb-3"
//           controlId="formHorizontalPassword"
//         >
//           <Col sm={2} />
//           <Form.Label column sm={2} style={{ textAlign: "end" }}>
//             Password:
//           </Form.Label>
//           <Col sm={4}>
//             <Form.Control
//               type="password"
//               placeholder="Password"
//               onChange={(e) => setPassword(e.target.value)}
//               value={password}
//             />
//           </Col>
//           <Col sm={4} />
//         </Form.Group>

//         <Row>
//           <Col sm> </Col>
//           <Col sm style={{ textAlign: "center" }}>
//             <Button variant="primary" type="submit">
//               Submit
//             </Button>
//           </Col>
//           <Col sm> </Col>
//         </Row>
//       </Container>
//     </Form>
//   </>;
