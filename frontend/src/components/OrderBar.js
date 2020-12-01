import React from 'react';
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import withStyles from "@material-ui/core/styles/withStyles";
import WhatshotIcon from '@material-ui/icons/Whatshot';
import NewReleasesIcon from '@material-ui/icons/NewReleases';
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import Typography from "@material-ui/core/Typography";
import PriorityHighIcon from '@material-ui/icons/PriorityHigh';
import DraftsIcon from '@material-ui/icons/Drafts';
import ViewAgendaIcon from '@material-ui/icons/ViewAgenda';
import ViewListIcon from '@material-ui/icons/ViewList';
import MenuList from "@material-ui/core/MenuList";

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
    orderChoiceContainer: {
        display: "flex",
        flexDirection: "row",
        "&:hover": {
            cursor: "pointer"
        }
    },
    orderText: {
        marginLeft: 5,
        marginRight: 25,
        lineHeight: "24px"
    },
    layoutContainer: {
        marginLeft: "auto"
    }
});


class OrderBar extends React.Component {

    constructor(props){
        super(props)
        this.state = {
            anchorEl: null
        }
    }

    setAnchorEl(target) {
        this.setState({
            anchorEl: target
        })
    }

    handleClick = (event) => {
        this.setAnchorEl(event.currentTarget);
    };

    setLayout(layout) {
        this.props.onLayoutChange(layout);
        this.closeMenu();
    };

    closeMenu = () => {
        this.setAnchorEl(null);
    };

    render() {
        const { classes } = this.props;
        return (
            <Paper className={classes.paper}>
                <Grid container>
                    <Grid item className={classes.orderChoiceContainer} onClick={() => this.props.onOrderingChange('-hotness')}>
                        <Grid item>
                            <WhatshotIcon/>
                        </Grid>
                        <Grid item className={classes.orderText}>
                            Hot
                        </Grid>
                    </Grid>
                    <Grid item className={classes.orderChoiceContainer} onClick={() => this.props.onOrderingChange('-timestamp')}>
                        <Grid item>
                            <NewReleasesIcon/>
                        </Grid>
                        <Grid item className={classes.orderText}>
                            New
                        </Grid>
                    </Grid>
                    <Grid item className={classes.layoutContainer}>
                        <Button aria-controls="simple-menu" aria-haspopup="true" onClick={this.handleClick}>
                            <ViewListIcon fontSize="small" />
                        </Button>
                        <Menu
                            id="simple-menu"
                            anchorEl={this.state.anchorEl}
                            keepMounted
                            open={Boolean(this.state.anchorEl)}
                            onClose={this.closeMenu}
                        >
                            <MenuList>
                                <MenuItem onClick={() => this.setLayout('card')}>
                                    <ListItemIcon>
                                        <ViewAgendaIcon fontSize="small" />
                                    </ListItemIcon>
                                    <Typography variant="inherit">Card</Typography>
                                </MenuItem>
                                <MenuItem onClick={() => this.setLayout('compact')}>
                                    <ListItemIcon>
                                        <ViewListIcon fontSize="small" />
                                    </ListItemIcon>
                                    <Typography variant="inherit">Compact</Typography>
                                </MenuItem>
                            </MenuList>
                        </Menu>
                    </Grid>
                </Grid>
            </Paper>
        )
    }
}

export default withStyles(useStyles)(OrderBar);