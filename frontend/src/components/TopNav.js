import React from 'react';
import Toolbar from "@material-ui/core/Toolbar";
import AppBar from "@material-ui/core/AppBar";
import withStyles from "@material-ui/core/styles/withStyles";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import RedditIcon from '@material-ui/icons/Reddit';
import {Link} from "react-router-dom";
import AuthService from '../services/auth/authService'
import Modal from "@material-ui/core/Modal";
import Paper from "@material-ui/core/Paper";
import LoginForm from "./LoginForm";
import SearchBar from "./SearchBar";

const useStyles = theme => ({
    appBar: {
        backgroundColor: "white",
        color: 'black'
    },
    navContainer: {
        display: 'flex',
        flexDirection: 'row'
    },
    logInButton: {
        width: 120,
        backgroundColor: "white",
        color: "#0079d3",
        '&:hover': {
            backgroundColor: "white"
        },
    },
    signUpButton: {
        marginLeft: 16,
        marginRight: 16,
        width: 120,
        backgroundColor: "#0079d3"
    },
    redditIconHolder: {
        backgroundColor: "#f54402",
        borderRadius: 50,
        width: 35,
        height: 35,
        textAlign: "center",
        display: "inline-block",
        marginTop: 2
    },
    modal: {
        margin: "auto",
        height: '500px',
        width: '500px',
    }
});

class TopNav extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            modalOpen: false
        }
        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }

    userIsLoggedIn() {
        return AuthService.isLoggedIn()
    }

    openModal() {
        this.setState({
            modalOpen: true
        });
    };

    closeModal() {
        this.setState({
            modalOpen: false
        });
    };

    render() {
        const { classes } = this.props;
        return(
            <AppBar className={ classes.appBar } position="static">
                <Toolbar variant="dense">
                    <Grid container
                          direction="row"
                          justify="space-evenly"
                    >

                        <Grid item style={{ display: "flex", flexDirection: 'row', flexGrow: 1}}>
                            <Link to="/" style={{textDecoration: "none"}}>
                                <div className={classes.redditIconHolder}>
                                    <RedditIcon style={{ color: "white", marginTop: 4 }} />
                                </div>
                                <div style={{ marginLeft: 10, color: "black", display: "inline-block" }}>Reddit</div>
                            </Link>
                        </Grid>

                        <Grid item style={{flexGrow: 1}}><SearchBar/></Grid>
                        {this.userIsLoggedIn() &&
                        <Grid item style={{flexGrow: 1, textAlign: "right"}}>test</Grid>
                        }
                        {!this.userIsLoggedIn() &&
                        <Grid item style={{flexGrow: 1}}>
                            <Button variant="contained" color="primary" className={classes.logInButton} onClick={this.openModal}>LOG IN</Button>
                            <Button variant="contained" color="primary" className={classes.signUpButton}>SIGN UP</Button>
                            <Modal
                                open={this.state.modalOpen}
                                onClose={this.closeModal}
                                aria-labelledby="simple-modal-title"
                                aria-describedby="simple-modal-description"
                                className={classes.modal}
                            >
                                <LoginForm handleCloseModal={this.closeModal}/>
                            </Modal>
                        </Grid>
                        }
                    </Grid>
                </Toolbar>
            </AppBar>
        )
    }
}

export default withStyles(useStyles, {withTheme: true})(TopNav);