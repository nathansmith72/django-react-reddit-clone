import React from 'react';
import TopNav from "../components/TopNav";
import Container from "@material-ui/core/Container";
import OrderBar from "../components/OrderBar";
import PostList from "../components/PostList";
import withStyles from "@material-ui/core/styles/withStyles";
import Paper from "@material-ui/core/Paper";
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";
import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward";
import {Link} from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import PostService from "../services/reddit/PostService";
import withRouter from "react-router-dom/es/withRouter";

const useStyles = theme => ({
    container: {
        backgroundColor: "#dae0e6",
        minHeight: "100vh"
    },
    paper: {
        marginTop: 30,
        padding: theme.spacing(1),
        textAlign: 'left',
        color: theme.palette.text.secondary,
        border: "1px solid transparent",
        borderBottom: "1px solid black",
        borderRadius: 0,
        '&:hover': {
            border: "1px solid #898989"
        }
    },
    votesContainer: {
        display: 'flex',
        flexDirection: 'column',
        marginRight: 10,
        boarderRight: "1px solid black",
        minWidth: 50,
        alignItems: "center"
    },
    voteCount: {
        textAlign: 'center',
        padding: 5
    },
    postContainer: {
        display: "flex",
        flexDirection: "row"
    },
    postMetaInfo: {

    },
    paperContainer: {

    }
});

class Post extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            post: null
        }
    }

    getPost() {
        PostService.getPost(this.props.match.params.id).then(response => {
            this.setState({
                post: response
            })
        })
    }

    getScore(post) {
        const raw_score = post.score;
        if (raw_score > 1000) {
            return Math.round((raw_score / 1000) * 10) / 10 + "k"
        }
        return raw_score
    }

    componentDidMount() {
        this.getPost()
    }

    render() {
        const { classes } = this.props;
        return (
            <div className={classes.container}>
                <TopNav />
                <Container>
                    <Grid item xs={12} >
                        <Paper className={classes.paper}>
                            {this.state.post &&
                                <div className={classes.postContainer} >
                                    <div className={classes.votesContainer}>
                                        <ArrowUpwardIcon />
                                        <div className={classes.voteCount}>{this.getScore(this.state.post)}</div>
                                        <ArrowDownwardIcon />
                                    </div>
                                    <div>
                                        <div className={classes.postMetaInfo}><Link to={"/r/" + this.state.post.subreddit.slug}>r/{this.state.post.subreddit.slug}</Link> <span>•</span> Posted by {this.state.post.user.username}</div>
                                        <div><h3>{this.state.post.title}</h3></div>
                                        {this.state.post.image &&
                                        <div><img alt="post image" src={this.state.post.image}/></div>
                                        }

                                    </div>
                                </div>
                            }
                        </Paper>
                    </Grid>
                </Container>
            </div>
        )
    }
}

export default withRouter((withStyles(useStyles)(Post)));