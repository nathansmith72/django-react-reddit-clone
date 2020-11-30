import React from 'react';
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import withStyles from "@material-ui/core/styles/withStyles";
import WhatshotIcon from '@material-ui/icons/Whatshot';
import NewReleasesIcon from '@material-ui/icons/NewReleases';

const useStyles = theme => ({
    paper: {
        padding: theme.spacing(1),
        textAlign: 'left',
        color: theme.palette.text.secondary,
        border: "1px solid transparent",
        borderRadius: 0,
        marginBottom: 15,
        marginTop: 15,
        display: "flex",
        flexDirection: "row",
        paddingLeft: 25
    },
    orderIcon: {
    },
    orderText: {
        marginLeft: 5,
        marginRight: 25,
        lineHeight: "24px"
    }
});


class OrderBar extends React.Component {
    render() {
        const { classes } = this.props;
        return (
            <Paper className={classes.paper}>
                <Grid container>
                    <Grid item className={classes.orderIcon}>
                        <WhatshotIcon/>
                    </Grid>
                    <Grid item className={classes.orderText}>
                        Hot
                    </Grid>
                    <Grid item className={classes.orderIcon}>
                        <NewReleasesIcon/>
                    </Grid>
                    <Grid item className={classes.orderText}>
                        New
                    </Grid>
                </Grid>
            </Paper>
        )
    }
}

export default withStyles(useStyles)(OrderBar);