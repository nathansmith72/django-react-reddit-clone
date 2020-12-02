import React from "react";
import TextField from "@material-ui/core/TextField";
import Input from "@material-ui/core/Input";
import InputAdornment from "@material-ui/core/InputAdornment";
import SearchIcon from '@material-ui/icons/Search';

class SearchBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            search: ''
        }
    }
    render() {
        return (
            <div>
                <form>
                    <TextField
                        style={{padding: 0}}
                        placeholder="Search"
                        fullWidth
                        name="search"
                        variant="outlined"
                        size="small"
                        value={this.state.search}
                        onChange={(event) =>
                            this.setState({
                                [event.target.name]: event.target.value,
                            })
                        }
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <SearchIcon />
                            </InputAdornment>
                          ),
                        }}
                        required
                        autoFocus
                    >
                    </TextField>
                </form>
            </div>
        )
    }

}

export default SearchBar