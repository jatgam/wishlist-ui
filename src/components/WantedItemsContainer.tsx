import React, { PureComponent } from 'react';
import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';
import { connect } from 'react-redux';
import WantedItemsComponent from '../components/WantedItemsComponent';
import {getWantedItemsAction, WantedItems, reserveItemAction} from '../actions/itemAction';

interface WantedItemsContainerProps {
    loading: boolean,
    loggedIn: boolean,
    wantedItems: WantedItems[],
    getWantedItems: () => void,
    reserveItem: (itemid: string) => void,
};

class WantedItemsContainer extends PureComponent<WantedItemsContainerProps> {
    componentDidMount(): void {
        if (this.props.wantedItems.length == 0) {
            this.props.getWantedItems();
        }
    }

    render() {
        const {wantedItems, loading, loggedIn, reserveItem} = this.props;
        return (
            <WantedItemsComponent reserveItem={reserveItem} loggedIn={loggedIn} loading={loading} items={wantedItems}></WantedItemsComponent>
        );
    };
}

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AnyAction>) => ({
    getWantedItems: () => dispatch(getWantedItemsAction()),
    reserveItem: (itemid: string) => dispatch(reserveItemAction(itemid)),
});

const mapStateToProps = (state: any) => ({
    loading: state.items.loading,
    wantedItems: state.items.wantedItems
});
export default connect(mapStateToProps, mapDispatchToProps)(WantedItemsContainer);
