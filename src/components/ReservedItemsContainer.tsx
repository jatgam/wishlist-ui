import React, { PureComponent } from 'react';
import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';
import { connect } from 'react-redux';
import ReservedItemsComponent from '../components/ReservedItemsComponent';
import {getReservedItemsAction, ReservedItems, unReserveItemAction} from '../actions/itemAction';

interface ReservedItemsContainerProps {
    loading: boolean,
    loggedIn: boolean,
    reservedItems: ReservedItems[],
    getReservedItems: () => void,
    unReserveItem: (itemid: string) => void,
};

class ReservedItemsContainer extends PureComponent<ReservedItemsContainerProps> {
    componentDidMount(): void {
        if (this.props.reservedItems.length === 0) {
            this.props.getReservedItems();
        }
    }

    render() {
        const {reservedItems, loading, loggedIn, unReserveItem} = this.props;
        return (
            <ReservedItemsComponent unReserveItem={unReserveItem} loggedIn={loggedIn} loading={loading} items={reservedItems}></ReservedItemsComponent>
        );
    };
}

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AnyAction>) => ({
    getReservedItems: () => dispatch(getReservedItemsAction()),
    unReserveItem: (itemid: string) => dispatch(unReserveItemAction(itemid))
});

const mapStateToProps = (state: any) => ({
    loading: state.items.loading,
    reservedItems: state.items.reservedItems
});
export default connect(mapStateToProps, mapDispatchToProps)(ReservedItemsContainer);
