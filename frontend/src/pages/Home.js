import React from 'react';
import TopNav from "../components/TopNav";
import PostList from "../components/PostList";
import withStyles from "@material-ui/core/styles/withStyles";
import OrderBar from "../components/OrderBar";
import Container from "@material-ui/core/Container";

const useStyles = theme => ({
    container: {
        backgroundColor: "#dae0e6",
        minHeight: "100vh"
    }
});

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.onOrderingChange = this.onOrderingChange.bind(this);
        this.state = {
            ordering: "-hotness",
        }
    }

    onOrderingChange(new_order) {
        this.setState({
            ordering: new_order
        })
    }

    render() {
        const { classes } = this.props;
        return (
            <div className={classes.container}>
                <TopNav />
                <Container>
                    <OrderBar ordering={this.state.ordering} onOrderingChange={this.onOrderingChange}/>
                    <PostList ordering={this.state.ordering}/>
                </Container>
            </div>
        )
    }
}

export default withStyles(useStyles, {withTheme: true})(Home);
