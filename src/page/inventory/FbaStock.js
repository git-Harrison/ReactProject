import React, {useMemo, useState, useEffect, useContext} from 'react';
import axios from 'axios';
import {MessageContext} from "../../contexts/MessageContext";
import BasicTable from "../../components/table/BasicTable";
import LoadingMsg from "../../components/LoadingMsg";
import NoDataMsg from "../../components/NoDataMsg";
import {useParams} from "react-router-dom";
import SearchBar from "../../containers/order/SearchBar";

export const FabStock = () => {
    const {setExplanation} = useContext(MessageContext);

    const columns = useMemo(
        () => [
            {
                Header: 'SKU',
                accessor: 'SKU',
            },
            {
                Header: 'FNSKU',
                accessor: 'FNSKU',
            },
            {
                Header: 'Fulfillable',
                accessor: 'Fulfillable',
            },
            {
                Header: 'Warehouse Processing',
                id: 'warehouseProcessing',
                accessor: (row) => row.ReservedQuantityBreakdown.WarehouseProcessing,
            },
            {
                Header: 'Pending Customer Order',
                id: 'pendingCustomerOrder',
                accessor: (row) => row.ReservedQuantityBreakdown.PendingCustomerOrder,
            },
            {
                Header: 'Warehouse Transfer',
                id: 'warehouseTransfer',
                accessor: (row) => row.ReservedQuantityBreakdown.WarehouseTransfer,
            },
            {
                Header: 'Inbound Working',
                id: 'inboundWorking',
                accessor: (row) => row.InboundQuantityBreakdown.Working,
            },
            {
                Header: 'Inbound Shipped',
                id: 'inboundShipped',
                accessor: (row) => row.InboundQuantityBreakdown.Shipped,
            },
            {
                Header: 'Inbound Receiving',
                id: 'inboundReceiving',
                accessor: (row) => row.InboundQuantityBreakdown.Receiving,
            },
            {
                Header: 'Researching',
                accessor: 'Researching',
            },
        ],
        []
    );

    let {sku} = useParams();
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [search, setSearch] = useState(sku || "");

    const noticeMsg = "* MarketplaceId 값이 ATVPDKIKX0DER 인 데이터만 표시됩니다.";

    useEffect(() => {
        setExplanation(noticeMsg);
    }, []);

    const handleSearch = (event) => {
        setSearch(event.target.value);
    };

    const fetchSearchResults = async () => {
        setLoading(true);
        try {
            const url = search
                ? `https://gux4unhdo4.execute-api.us-east-1.amazonaws.com/US-Amazon-FBA-Inventory-Search?SKU=${search}`
                : `https://i2imab3r05.execute-api.us-east-1.amazonaws.com/US-Amazon-FBA-Inventory-DDB?SellerId=AH4IMZW6MJ69C`;

            const response = await axios.get(url, {
                headers: {
                    'authorization': process.env.REACT_APP_AUTHORIZATION_KEY
                }
            });

            if (response.data && response.data.items && response.data.items.length > 0) {
                const filteredData = response.data.items.filter(item => item.MarketplaceId === 'ATVPDKIKX0DER');
                setData(filteredData);
            } else {
                setData([]);
            }
        } catch (error) {
            console.error(error);
            setData([]);
        } finally {
            setLoading(false);
        }
    };

    const handleFetchClick = () => {
        fetchSearchResults();
    };

    useEffect(() => {
        fetchSearchResults();
    }, []);

    return (
        <>
            <SearchBar
                search={search}
                handleSearch={handleSearch}
                handleFetchClick={handleFetchClick}
                fetchSearchResults={fetchSearchResults}
                loading={loading}
                label="Search by SKU"
                placeholder="SKU"
            />
            {loading
                ? <LoadingMsg className="table"/>
                : data.length > 0
                    ? <BasicTable columns={columns} data={data} defaultPageSize={null}/>
                    : <NoDataMsg className="table" msg="No data found"/>
            }
        </>
    );
}

export default FabStock;