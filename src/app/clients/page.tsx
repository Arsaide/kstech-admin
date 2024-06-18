import { Alert } from '@mui/material';

const ClientsPage = () => {
    return (
        <>
            <Alert severity="warning">In developing...</Alert>
            <Alert variant="filled" severity="info">
                Here you are can view list of clients after they send a message
                or place an order via email
            </Alert>
        </>
    );
};

export default ClientsPage;
