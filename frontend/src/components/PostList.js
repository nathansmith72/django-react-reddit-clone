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
        margin: 5,
        border: "1px solid transparent",
        '&:hover': {
            border: "1px solid #898989"
        }
    },
    votesContainer: {
        display: 'flex',
        flexDirection: 'column',
        marginRight: 10,
        boarderRight: "1px solid black"
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

    getPosts() {
        PostService.getPosts(this.subredditSlug).then(response => {
            this.setState({
                posts: response.results
            })
        })
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
                                <div className={classes.voteCount}>{post.ups - post.downs}</div>
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
        return (
            <Container>
                <Grid container spacing={1}>
                    {this.renderPosts()}
                </Grid>
            </Container>
        )
    }
}

export default withStyles(useStyles, {withTheme: true})(PostList);