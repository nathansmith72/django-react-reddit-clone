import React from "react";
import {
    Button,
    TextField,
    Grid,
    Paper,
    Typography,
} from "@material-ui/core";
import AuthService from "../services/auth/authService";

class LoginForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = { username: "", password:"", authflag:1 };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({ username: event.state.username, password: event.state.password });
    }

    handleSubmit(event) {
        event.preventDefault();
        AuthService.login(this.state.username, this.state.password).then(() => {
            this.props.handleCloseModal()
        })
    }

    render() {
        return (
            <Paper
                variant="elevation"
                elevation={2}
                className="login-background"
                style={{paddingTop: 40, paddingBottom: 40}}
            >
                <Grid container spacing={0} justify="center" direction="row">
                    <Grid item>
                        <Grid
                            container
                            direction="column"
                            justify="center"
                            spacing={2}
                            className="login-form"
                        >

                            <Grid item>
                                <Typography component="h1" variant="h5">
                                    Sign in
                                </Typography>
                            </Grid>
                            <Grid item>
                                <form onSubmit={this.handleSubmit}>
                                    <Grid container direction="column" spacing={2}>
                                        <Grid item>
                                            <TextField
                                                type="username"
                                                placeholder="Username"
                                                fullWidth
                                                name="username"
                                                variant="outlined"
                                                value={this.state.username}
                                                onChange={(event) =>
                                                    this.setState({
                                                        [event.target.name]: event.target.value,
                                                    })
                                                }
                                                required
                                                autoFocus
                                            />
                                        </Grid>
                                        <Grid item>
                                            <TextField
                                                type="password"
                                                placeholder="Password"
                                                fullWidth
                                                name="password"
                                                variant="outlined"
                                                value={this.state.password}
                                                onChange={(event) =>
                                                    this.setState({
                                                        [event.target.name]: event.target.value,
                                                    })
                                                }
                                                required
                                            />
                                        </Grid>
                                        <Grid item>
                                            <Button
                                                variant="contained"
                                                color="primary"
                                                type="submit"
                                                className="button-block"
                                            >
                                                Submit
                                            </Button>
                                        </Grid>
                                    </Grid>
                                </form>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Paper>
        );
    }
}
export default LoginForm;