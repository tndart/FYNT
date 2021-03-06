import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ImagePicker } from '../index';
import * as ArtistActions from '../../../actions/artists.actions'
import { Link } from 'react-router-dom'
import util from '../../../util/componentExtender'

/* UI component only , used for style a basic container in app  */
class ArtistPicker extends Component {
    constructor(props) {
        super(props);

        this.state = {
        };

        this.clickHandler = this.clickHandler.bind(this);
    }

    clickHandler(e, props) {
        const { dispatch } = this.props
        const newCheckedState = props.isChecked ? false : true;
        dispatch(ArtistActions.checkingToggle(props._id, newCheckedState));

        if (this.props.onClick) {
            this.props.onClick(e);
        }
    }

    render() {
        const showed = () => {
            if (this.props.list && this.props.list.length > 0) {
                return ( <ImagePicker array={this.props.list} onClick={this.clickHandler}></ImagePicker> )
            }
            else {
                return ( <div> Please pick some genres at <Link to='/genres'> Genre page </Link> </div> )
            }
        }

        return (
            <div>
                { this.props.list && this.props.list.length }
                { showed() }
            </div>
        )
    }
}

function mapStateToProps(state) {
    const artists = state.artists.list
    const tagsChecked = state.tags.topTags.filter(tag => tag.isChecked === true).map(el => el.name)
    const list = artists.filter(artist => {
        return artist.tags.some(artistTag => tagsChecked.includes(artistTag.name))
    })
    
    return {
        list
    }
}

export default connect(mapStateToProps)(ArtistPicker);