import { useState } from 'react';
import {
    Typography,
    Box,
    IconButton,
    Tooltip,
} from '@mui/material';
import FeatherIcon from 'feather-icons-react';


const DeletableItem = ({ product }: any) => {
    return (
        <Box
            sx={{
                pl: 0,
            }}
        >
            <Box display="flex" alignItems="center">
                <Box
                    sx={{
                        mb: 2,
                        width: "90%"
                    }}
                >
                    <Typography variant="h5">{product.name}</Typography>
                    <Typography color="textSecondary" variant="h6" fontWeight="400">
                        {product.description}
                    </Typography>
                </Box>
            </Box>
        </Box>
    )
}

const TrashComponent = ({ product, deleteHandler }: any) => {
    return (
        <Box>
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
        </Box>
    )
}

const DeletableItemList = ({ items, deleteItem}: any) => {
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
                <Box>
                    {items.map((item: any) => (
                        <Box key={item.id}
                            sx={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                                borderBottom: "1px solid #4c4c4c",
                                mb: 2
                            }}>
                            <DeletableItem product={item} />
                            <TrashComponent product={item} deleteHandler={deleteItem} />
                        </Box>
                    ))}
                </Box>
            </Box>
        </>
    );
};

export default DeletableItemList;
