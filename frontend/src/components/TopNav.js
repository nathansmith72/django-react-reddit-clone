import React from 'react';
import Toolbar from "@material-ui/core/Toolbar";
import AppBar from "@material-ui/core/AppBar";
import withStyles from "@material-ui/core/styles/withStyles";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import RedditIcon from '@material-ui/icons/Reddit';
import {Link} from "react-router-dom";

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
        textAlign: "center"
    }
});

class TopNav extends React.Component {
    render() {
        const { classes } = this.props;
        return(
            <AppBar className={ classes.appBar } position="static">
                <Toolbar variant="dense">
                    <Grid container
                          direction="row"
                          justify="space-between"
                    >
                        <Link to="/" style={{textDecoration: "none"}}>
                            <Grid item style={{ display: "flex", flexDirection: 'row'}}>

                                    <div className={classes.redditIconHolder}>
                                        <RedditIcon style={{ color: "white", marginTop: 4 }} />
                                    </div>
                                    <div style={{ marginTop: 7, marginLeft: 10, color: "black" }}>Reddit</div>
                            </Grid>
                        </Link>
                        <Grid item>search</Grid>
                        <Grid item>
                            <Button variant="contained" color="primary" className={classes.logInButton}>LOG IN</Button>
                            <Button variant="contained" color="primary" className={classes.signUpButton}>SIGN UP</Button>
                        </Grid>
                    </Grid>
                </Toolbar>
            </AppBar>
        )
    }
}

export default withStyles(useStyles, {withTheme: true})(TopNav);