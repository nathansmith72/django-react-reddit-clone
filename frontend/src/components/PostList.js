import React from 'react';
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Container from "@material-ui/core/Container";
import withStyles from "@material-ui/core/styles/withStyles";
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import PostService from "../services/reddit/PostService"
import {Link} from "react-router-dom";

const useStyles = theme => ({
    paper: {
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

class PostList extends React.Component {

    constructor(props) {
        super(props);
        this.subredditSlug = props.subredditSlug;
        this.state = {
            posts: []
        };
    }

    componentDidMount() {
        this.getPosts()
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps !== this.props){
            this.getPosts()
        }
    }

    getPosts() {
        PostService.getPosts(this.subredditSlug, this.props.ordering).then(response => {
            this.setState({
                posts: response.results
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

    renderPosts() {
        const { classes } = this.props;
        return this.state.posts.map(post => {
            return (
                <Grid item xs={12} >
                    <Paper className={classes.paper}>
                        <div className={classes.postContainer}>
                            <div className={classes.votesContainer}>
                                <ArrowUpwardIcon />
                                    <div className={classes.voteCount}>{this.getScore(post)}</div>
                                <ArrowDownwardIcon />
                            </div>
                            <div>
                                <div className={classes.postMetaInfo}><Link to={"/r/" + post.subreddit.slug}>r/{post.subreddit.slug}</Link> <span>•</span> Posted by {post.user.username}</div>
                                <div><h3>{post.title}</h3></div>
                                {post.image &&
                                    <div><img alt="post image" src={post.image}/></div>
                                }

                            </div>
                        </div>
                    </Paper>
                </Grid>
            )
        })
    }

    render () {
        const { classes } = this.props;
        return (
            <Grid container className={classes.paperContainer}>
                {this.renderPosts()}
            </Grid>
        )
    }
}

export default withStyles(useStyles, {withTheme: true})(PostList);