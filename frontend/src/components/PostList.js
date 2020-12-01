import React from 'react';
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import withStyles from "@material-ui/core/styles/withStyles";
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import PostService from "../services/reddit/PostService";
import withRouter from "react-router-dom/es/withRouter";
import ChatIcon from '@material-ui/icons/Chat';
import LinkIcon from '@material-ui/icons/Link';

const useStyles = theme => ({
    // card layout styles
    paperCard: {
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
    votesContainerCard: {
        display: 'flex',
        flexDirection: 'column',
        marginRight: 10,
        boarderRight: "1px solid black",
        minWidth: 50,
        alignItems: "center"
    },
    voteCountCard: {
        textAlign: 'center',
        padding: 5
    },
    postContainerCard: {
        display: "flex",
        flexDirection: "row"
    },
    subredditContainerCard: {
        '&:hover': {
            cursor: "pointer"
        }
    },

    // compact layout styles
    paperCompact: {
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
    votesContainerCompact: {
        display: 'flex',
        flexDirection: 'column',
        marginRight: 10,
        boarderRight: "1px solid black",
        minWidth: 50,
        alignItems: "center"
    },
    voteCountCompact: {
        textAlign: 'center',
        padding: 5
    },
    postContainerCompact: {
        display: "flex",
        flexDirection: "row"
    },
    subredditContainerCompact: {
        '&:hover': {
            cursor: "pointer"
        }
    }
});

class PostList extends React.Component {

    constructor(props) {
        super(props);
        this.subredditSlug = props.subredditSlug;
        this.state = {
            posts: [],
            redirectTo: ''
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

    navigateToPost(post) {
        this.props.history.push('/p/' + post.id + '/')
    }

    navigateToSubreddit(e, post) {
        e.stopPropagation();
        this.props.history.push('/r/' + post.subreddit.slug + '/')
    }

    cardLayout(post) {
        const { classes } = this.props;
        return (
            <Grid item xs={12} >
                <Paper className={classes.paperCard} onClick={() => this.navigateToPost(post)}>
                    <div className={classes.postContainerCard}>
                        <div className={classes.votesContainerCard}>
                            <ArrowUpwardIcon />
                            <div className={classes.voteCountCard}>{this.getScore(post)}</div>
                            <ArrowDownwardIcon />
                        </div>
                        <div>
                            <div className={classes.postMetaInfoCard}><span className={classes.subredditContainer} onClick={(e) => this.navigateToSubreddit(e, post)}><b>r/{post.subreddit.slug}</b></span> <span>•</span> Posted by {post.user.username}</div>
                            <div><h3>{post.title}</h3></div>
                            {post.image &&
                            <div><img style={{ maxWidth: "100%" }} alt="post image" src={post.image}/></div>
                            }
                        </div>
                    </div>
                </Paper>
            </Grid>
        )
    }

    classicLayout() {

    }

    compactLayout(post) {
        const { classes } = this.props;
        return (
            <Grid item xs={12} >
                <Paper className={classes.paperCompact} onClick={() => this.navigateToPost(post)}>
                    <div className={classes.postContainerCompact}>
                        <div className={classes.votesContainerCompact}>
                            <ArrowUpwardIcon />
                            <div className={classes.voteCountCompact}>{this.getScore(post)}</div>
                            <ArrowDownwardIcon />
                        </div>
                        {post.image &&
                        <div style={{borderRadius: "5px ", marginRight: 10}}><img style={{ width: "75px", flexShrink: 0 }} alt="post image" src={post.image}/></div>
                        }
                        {post.link &&
                        <div style={{width: "75px", flexShrink: 0, borderColor: 'rgb(237, 239, 241)', borderRadius: '4px', backgroundColor: "rgb(247 247 247)", marginRight: 10}}><div style={{marginTop: "25px", textAlign: "center"}}><ChatIcon/></div></div>
                        }
                        {!post.link && !post.image &&
                        <div style={{width: "75px", flexShrink: 0, borderColor: 'rgb(237, 239, 241)', borderRadius: '4px', backgroundColor: "rgb(247 247 247)", marginRight: 10}}><div style={{marginTop: "25px", textAlign: "center"}}><LinkIcon/></div></div>
                        }
                        <div>
                            <div><h3 style={{margin: 0}}>{post.title}</h3></div>
                            <div className={classes.postMetaInfoCompact}><span className={classes.subredditContainer} onClick={(e) => this.navigateToSubreddit(e, post)}><b>r/{post.subreddit.slug}</b></span> <span>•</span> Posted by {post.user.username}</div>
                        </div>
                    </div>
                </Paper>
            </Grid>
        )
    }

    renderPosts() {
        if (this.props.layout === 'card') {
            return this.state.posts.map(post => this.cardLayout(post))
        }
        if (this.props.layout === 'compact') {
            return this.state.posts.map(post => this.compactLayout(post))
        }
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

export default withRouter((withStyles(useStyles)(PostList)));