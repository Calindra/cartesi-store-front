import { useState } from 'react';
import {
    Typography,
    Box,
    Table,
    TableBody,
    TableRow,
    TableCell,
    IconButton,
    Tooltip,
} from '@mui/material';
import FeatherIcon from 'feather-icons-react';
import DashboardCard from '../base-card/DashboardCard';

const items = [
    {
        id: 1,
        name: 'Axios',
        description: 'Axios is a promise-based HTTP Client for node.js and the browser. It is isomorphic (= it can run in the browser and nodejs with the same codebase). On the server-side it uses the native node.js http module, while on the client (browser) it uses XMLHttpRequests.',
    },
    {
        id: 2,
        name: 'Viem',
        description: 'viem is a TypeScript interface for Ethereum that provides low-level stateless primitives for interacting with Ethereum. viem is focused on developer experience, stability, bundle size, and performance',
    },
    {
        id: 3,
        name: 'Cartesify',
        description: 'Cartesify is a Sunodo template for Typescript Cartesi DApps. It uses node to execute the backend application.',
    },
    {
        id: 4,
        name: 'Express',
        description: 'Express is a minimal and flexible Node.js web application framework that provides a robust set of features for web and mobile applications.',
    }
];

const DependenciesTable = () => {
    const [products, setProducts] = useState(items);

    const deleteHandler = (id: number) => {
        const updateProducts = products.filter((ind) => ind.id !== id);
        setProducts(updateProducts);
    };
    return (
        <>
            <Box
                sx={{
                    overflow: {
                        xs: 'auto',
                        sm: 'unset',
                    },
                    mt: 2,
                }}
            >
                <Table
                    sx={{
                        whiteSpace: {
                            xs: 'nowrap',
                            sm: 'unset',
                        },
                    }}
                >
                    <TableBody>
                        {products.map((product) => (
                            <TableRow key={product.id}>
                                <TableCell
                                    sx={{
                                        pl: 0,
                                    }}
                                >
                                    <Box display="flex" alignItems="center">
                                        <Box
                                            sx={{
                                                ml: 2,
                                            }}
                                        >
                                            <Typography variant="h5">{product.name}</Typography>
                                            <Typography color="textSecondary" variant="h6" fontWeight="400">
                                                {product.description}
                                            </Typography>
                                        </Box>
                                    </Box>
                                </TableCell>
                                <TableCell>
                                    <Tooltip title="Delete" placement="top">
                                        <IconButton onClick={() => deleteHandler(product.id)}>
                                            <FeatherIcon
                                                icon="trash"
                                                width="18"
                                                height="18"
                                                sx={{
                                                    color: (theme: any) => theme.palette.grey.A200,
                                                }}
                                            />
                                        </IconButton>
                                    </Tooltip>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Box>
        </>
    );
};

export default DependenciesTable;
