import React from 'react';
import TopNav from "../components/TopNav";
import PostList from "../components/PostList";
import withStyles from "@material-ui/core/styles/withStyles";
import withRouter from "react-router-dom/es/withRouter";

const useStyles = theme => ({
    container: {
        backgroundColor: "#dae0e6",
        minHeight: "100vh"
    }
});

class Home extends React.Component {

    render() {
        const { classes } = this.props;
        return (
            <div className={classes.container}>
                <TopNav />
                <PostList subredditSlug={this.props.match.params.slug}/>
            </div>
        )
    }
}

export default withRouter((withStyles(useStyles)(Home)));